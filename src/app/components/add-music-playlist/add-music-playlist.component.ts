import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MusicaService } from '../../services/musica.service';
import { PlaylistService } from '../../services/playlist.service';
import { AuthService } from '../../services/auth.service';
import { MusicaViewDTO } from '../../models/musica.dto';
import { PlaylistDTO } from '../../models/playlist.dto';
import { AddMusicToPlaylistComponent } from '../../popups/add-music-to-playlist/add-music-to-playlist.component';
import { ArtistaService } from '../../services/artista.service'; 
import { ArtistaDTO } from '../../models/artista.dto';




@Component({
  selector: 'app-add-music-playlist',
  standalone: true,
  imports: [NavBarComponent, AddMusicToPlaylistComponent, CommonModule, FormsModule],
  templateUrl: './add-music-playlist.component.html',
  styleUrl: './add-music-playlist.component.css'
})
export class AddMusicPlaylistComponent implements OnInit {
  
  searchTerm: string = '';
  todasAsMusicas: MusicaViewDTO[] = [];
  musicasFiltradas: MusicaViewDTO[] = [];
  playlistsUsuario: PlaylistDTO[] = [];
  
  isModalVisible: boolean = false;
  musicaSelecionada: MusicaViewDTO | null = null;

   constructor(
    private musicaService: MusicaService,
    private playlistService: PlaylistService,
    private authService: AuthService,
    private artistaService: ArtistaService 
  ) {}

  ngOnInit(): void {
    this.loadAllData();
    this.loadUserPlaylists();
  }

  loadAllData(): void {
    
    forkJoin({
      musicas: this.musicaService.findAll(),
      artistas: this.artistaService.findAll()
    }).pipe(
      map(({ musicas, artistas }) => {
        
        const artistMap = new Map<number, ArtistaDTO>();
        artistas.forEach(a => artistMap.set(a.id, a));

        
        return musicas.map(musica => ({
          ...musica,
          artista: artistMap.get(musica.id_artista)
        }));
      })
    ).subscribe(musicasEnriquecidas => {
      this.todasAsMusicas = musicasEnriquecidas;
      this.musicasFiltradas = musicasEnriquecidas;
    });
  }


  loadUserPlaylists(): void {
    const userId = this.authService.getUserId();
    this.playlistService.findAll().subscribe(data => {
      
      this.playlistsUsuario = data.filter(p => p.userID === parseInt(userId!, 10));
    });
  }

  filterMusicas(): void {
    if (!this.searchTerm) {
      this.musicasFiltradas = this.todasAsMusicas;
      return;
    }
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    this.musicasFiltradas = this.todasAsMusicas.filter(m => 
      m.nome.toLowerCase().includes(lowerCaseSearch) ||
      m.artista?.nome.toLowerCase().includes(lowerCaseSearch)
    );
  }


  abrirModal(musica: MusicaViewDTO): void {
    this.musicaSelecionada = musica;
    this.isModalVisible = true;
  }

  

  fecharModal(): void {
    this.isModalVisible = false;
    this.musicaSelecionada = null;
  }
}
