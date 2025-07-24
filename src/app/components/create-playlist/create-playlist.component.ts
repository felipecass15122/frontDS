import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaylistCreateDTO } from '../../models/playlist.dto';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.css'
})
export class CreatePlaylistComponent {
   playlist: PlaylistCreateDTO = {
    nome: '',
    visibilidade: true, 
    userID: null 
  };

   constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
    private router: Router
  ) { }

   cadastrarPlaylist(): void {
    if (!this.playlist.nome) {
      alert('Por favor, preencha o nome da playlist.');
      return;
    }

    
    const userIdString = this.authService.getUserId();

    if (!userIdString) {
      alert('Você precisa estar logado para criar uma playlist.');
      this.router.navigate(['/login']);
      return;
    }

    this.playlist.userID = parseInt(userIdString, 10);

    console.log('Enviando para a API:', this.playlist);
    this.playlistService.insert(this.playlist).subscribe({
      next: (response) => {
        alert('Playlist criada com sucesso!');
        this.playlist = { nome: '', visibilidade: true, userID: null };
         this.router.navigate(['/minhasPlaylists']);
      },
      error: (err) => {
        console.error('Erro ao criar playlist:', err);
        alert('Ocorreu um erro ao criar a playlist.');
      }
    });
  }
}
