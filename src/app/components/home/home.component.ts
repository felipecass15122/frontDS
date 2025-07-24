import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { UsuarioDTO } from '../../models/usuario.dto'; 
import { UsuarioService } from '../../services/usuario.service';

import { PlaylistService } from '../../services/playlist.service';
import { ArtistaService } from '../../services/artista.service';




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
    private playlistService: PlaylistService, 
    private artistaService: ArtistaService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.loadUserData();
    this.loadPlaylists(); 
    this.loadArtistas();  
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
      
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  loadPlaylists(): void {
    this.playlistService.findAll().subscribe({
      next: (data) => {
        // Mapeia a resposta da API para o formato que o HTML espera
        this.playlists = data.map(playlist => ({
          id: playlist.id,
          name: playlist.nome,
          imageUrl: `https://placehold.co/300x300/2a2a2a/F2F2F2?text=${playlist.nome.charAt(0)}`
        }));
      },
      error: (err) => console.error('Erro ao buscar playlists', err)
    });
  }

  loadArtistas(): void {
    this.artistaService.findAll().subscribe({
      next: (data) => {
        this.artistas = data.map(artista => ({
          id: artista.id,
          name: artista.nome,
          imageUrl: `https://placehold.co/300x300/F66600/1E1E1E?text=${artista.nome.charAt(0)}`
        }));
      },
      error: (err) => console.error('Erro ao buscar artistas', err)
    });
  }

 loadMockData(): void {
    this.musicasRecentes = [ { id: 1, name: 'Take care of you', artist: 'Admina Thembi', streams: '114k streams', imageUrl: 'https://placehold.co/150x150/7d4b80/ffffff?text=Take+Care' } ];
  }
  

  logout(): void {
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
