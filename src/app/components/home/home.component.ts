import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { UsuarioDTO } from '../../models/usuario.dto'; 
import { UsuarioService } from '../../services/usuario.service';


interface PlaylistItem { id: number; name:string; imageUrl: string; }
interface ArtistaItem { id: number; name: string; imageUrl: string; }
interface MusicaItem { id: number; name: string; artist: string; streams: string; imageUrl: string; }


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  currentUser: UsuarioDTO | null = null;
  playlists: PlaylistItem[] = [];
  artistas: ArtistaItem[] = [];
  musicasRecentes: MusicaItem[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadMockData();
  }

  loadUserData(): void {
    const userIdString = this.authService.getUserId();
    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      this.usuarioService.findById(userId).subscribe({
        next: (userData) => {
          this.currentUser = userData;          
        },
        error: (err) => {
          console.error('Erro ao buscar dados do usuário', err);
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      });
    } else {
      // Se não houver ID, desloga e volta para a tela de login
      //this.authService.logout();
      //this.router.navigate(['/login']);
    }
  }

 loadMockData(): void {
    this.playlists = [ { id: 1, name: 'Para treinar', imageUrl: 'https://placehold.co/300x300/2a2a2a/F2F2F2?text=Playlist+1' } ];
    this.artistas = [ { id: 1, name: 'The Weeknd', imageUrl: 'https://placehold.co/300x300/F66600/1E1E1E?text=TW' } ];
    this.musicasRecentes = [ { id: 1, name: 'Take care of you', artist: 'Admina Thembi', streams: '114k streams', imageUrl: 'https://placehold.co/150x150/7d4b80/ffffff?text=Take+Care' } ];
  }
  

  logout(): void {
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
