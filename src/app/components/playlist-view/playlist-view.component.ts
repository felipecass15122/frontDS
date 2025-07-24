import { Component, OnInit} from '@angular/core';
import { Location, CommonModule } from '@angular/common'; 

import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { PlaylistService } from '../../services/playlist.service';
import { MusicaPlaylistService } from '../../services/musica-playlist.service';
import { ArtistaService } from '../../services/artista.service';
import { PlaylistCreateDTO, PlaylistDTO } from '../../models/playlist.dto';
import { MusicaViewDTO } from '../../models/musica.dto';
import { ArtistaDTO } from '../../models/artista.dto';
import { MusicasPlaylistCreateDTO } from '../../models/musicaPlaylist.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-playlist-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.css'
})
export class PlaylistViewComponent {

  playlist: PlaylistDTO | null = null;
  musicas: MusicaViewDTO[] = [];
  isLoading: boolean = true;

  constructor(  
    private route: ActivatedRoute,
    private location: Location,
    private playlistService: PlaylistService,
    private musicaPlaylistService: MusicaPlaylistService,
    private artistaService: ArtistaService,
    private authService: AuthService,
    private router: Router,
  ){}

    ngOnInit(): void {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (!playlistId) return;

    const id = parseInt(playlistId, 10);

    
    this.playlistService.findById(id).pipe(
      // O switchMap permite encadear requisições de forma limpa
      switchMap(playlistDetails => {
        this.playlist = {
          ...playlistDetails,
          imageUrl: `https://placehold.co/400x400/2a2a2a/F2F2F2?text=${playlistDetails.nome.charAt(0)}`
        };
   
        return this.musicaPlaylistService.getMusicasFromPlaylist(id);
      }),
      switchMap(musicasDaPlaylist => {
        
        if (musicasDaPlaylist.length === 0) {
          return of([]);
        }
        
       
        const artistIds = [...new Set(musicasDaPlaylist.map(m => m.id_artista))];
        
       
        const artistRequests = artistIds.map(artistId => this.artistaService.findById(artistId));

      
        return forkJoin(artistRequests).pipe(
          
          map(artistas => {
           
            const artistMap = new Map<number, ArtistaDTO>();
            artistas.forEach(a => artistMap.set(a.id, a));
            
          
            return musicasDaPlaylist.map(musica => ({
              ...musica,
              artista: artistMap.get(musica.id_artista),
              imageUrl: `https://placehold.co/150x150/2a2a2a/ffffff?text=${musica.nome.charAt(0)}`
            }));
          })
        );
      })
    ).subscribe({
      next: (musicasEnriquecidas) => {
        this.musicas = musicasEnriquecidas;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar dados da playlist', err);
        this.isLoading = false;
      }
    });
  }

  replicarPlaylist(): void {
    const userIdString = this.authService.getUserId();

    if (!this.playlist || !userIdString) {
      alert('Não é possível replicar a playlist. Dados insuficientes.');
      return;
    }

   
    const novaPlaylistData: PlaylistCreateDTO = {
      nome: `Cópia de ${this.playlist.nome}`,
      visibilidade: this.playlist.visibilidade, 
      userID: parseInt(userIdString, 10)
    };

    
    this.playlistService.insert(novaPlaylistData).pipe(
      switchMap(novaPlaylistCriada => {
        
        if (this.musicas.length === 0) {
          return of(novaPlaylistCriada); 
        }

        
        const addMusicasRequests = this.musicas.map(musica => {
          const data: MusicasPlaylistCreateDTO = {
            id_playlist: novaPlaylistCriada.id,
            id_musica: musica.id
          };
          return this.musicaPlaylistService.addMusicaToPlaylist(data);
        });

       
        return forkJoin(addMusicasRequests).pipe(
          map(() => novaPlaylistCriada) 
        );
      })
    ).subscribe({
      next: (novaPlaylistFinal) => {
        alert(`Playlist "${novaPlaylistFinal.nome}" criada com sucesso!`);
        
        this.router.navigate(['/playlist', novaPlaylistFinal.id]);
      },
      error: (err) => {
        console.error('Erro ao replicar a playlist', err);
        alert('Ocorreu um erro ao replicar a playlist.');
      }
    });
  }


  navigateBack(): void {
    this.location.back();
  }

  playMusic(musica: MusicaViewDTO): void {
    if (musica && musica.url_musica) {
      console.log('redirecionando para: ' + musica.url_musica);
      window.open(musica.url_musica, '_blank');
    } else {
      console.warn('Esta música não possui um link válido.' + musica.url_musica);
    }
  }

  deletarMusicaDaPlaylist(musicaId: number): void {
    if (!confirm('Você tem certeza que deseja excluir essa música da playlist?')) {
      return;
    }

    this.musicaPlaylistService.excluir(musicaId).pipe(
      switchMap(() => {
        // Atualizar a lista local de músicas após a exclusão
        this.musicas = this.musicas.filter(musica => musica.id !== musicaId);
        return of(null);
      })
    ).subscribe({
      next: () => {
        alert('Música removida da playlist com sucesso!');
      },
      error: (err) => {
        // Exibir erro em caso de falha
        console.error('Erro ao remover música', err);
        alert('Ocorreu um erro ao remover a música.');
      }
    });
  }
}
