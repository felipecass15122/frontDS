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
  selector: 'app-all-playlists',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent],
  templateUrl: './all-playlists.component.html',
  styleUrl: './all-playlists.component.css'
})
export class AllPlaylistsComponent {
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
}
