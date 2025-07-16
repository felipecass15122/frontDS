import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaylistCreateDTO } from '../../models/playlist.dto';
import { PlaylistService } from '../../services/playlist.service';
import { CommonModule } from '@angular/common';

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
    usuario: { id: null }
  };

  constructor(private playlistService: PlaylistService) { }

   cadastrarPlaylist(): void {
    if (!this.playlist.nome) {
      alert('Por favor, preencha o nome da playlist.');
      return;
    }

    
    // valor incial de testes, alterar para valor de auth
    const usuarioLogadoId = 1; 
    this.playlist.usuario.id = usuarioLogadoId;

    this.playlistService.insert(this.playlist).subscribe({
      next: (response) => {
        alert('Playlist criada com sucesso!');
        this.playlist = { nome: '', visibilidade: true, usuario: { id: null } };
      },
      error: (err) => {
        console.error('Erro ao criar playlist:', err);
        alert('Ocorreu um erro ao criar a playlist.');
      }
    });
  }
}
