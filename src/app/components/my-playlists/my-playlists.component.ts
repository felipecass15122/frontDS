import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { PlaylistService } from '../../services/playlist.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


interface PlaylistViewItem {
  id: number;
  nome: string;
  imageUrl: string;
}

@Component({
  selector: 'app-my-playlists',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent],
  templateUrl: './my-playlists.component.html',
  styleUrl: './my-playlists.component.css'
})
export class MyPlaylistsComponent {
  playlists: PlaylistViewItem[] = [];
  isLoading: boolean = true;

   constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarPlaylists();
  }


  carregarPlaylists(): void {
    this.isLoading = true;
    const userId = this.authService.getUserId();

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

   
    this.playlistService.findAll().subscribe({
      next: (todasAsPlaylists) => {
        
        this.playlists = todasAsPlaylists  
          .filter(p => p.userID === parseInt(userId, 10))       
          .map(p => ({
            id: p.id,
            nome: p.nome,
            imageUrl: `https://placehold.co/400x400/2a2a2a/F2F2F2?text=${p.nome.charAt(0)}`
          }));
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar playlists', err);
        this.isLoading = false;
      }
    });
  }

  verPlaylist(id: number): void {
    
    this.router.navigate(['/playlist', id]);
  }

    deletarPlaylist(id: number): void {
    if (!confirm('Tem certeza que deseja excluir esta playlist?')) {
      return;
    }

    this.playlistService.excluir(id).subscribe({
      next: () => {
        alert('Playlist excluída com sucesso!');
        // Atualiza a lista de playlists após a exclusão
        this.playlists = this.playlists.filter(p => p.id !== id);
      },
      error: (err) => {
        console.error('Erro ao excluir playlist', err);
        alert('Ocorreu um erro ao excluir a playlist.');
      }
    });
  }
}
