
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicaDTO } from '../../models/musica.dto';
import { PlaylistDTO } from '../../models/playlist.dto';
import { MusicaPlaylistService } from '../../services/musica-playlist.service';
import { MusicasPlaylistCreateDTO } from '../../models/musicaPlaylist.dto'; 


@Component({
  selector: 'app-add-music-to-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-music-to-playlist.component.html',
  styleUrl: './add-music-to-playlist.component.css'
})
export class AddMusicToPlaylistComponent {
  isModalVisible: boolean = false;

  @Input() musicaParaAdicionar: MusicaDTO | null = null;
  @Input() playlists: PlaylistDTO[] = [];
  @Output() closeRequest = new EventEmitter<void>();

  playlistSelecionadaId: number | null = null;

  constructor(private musicaPlaylistService: MusicaPlaylistService) {}

  onClose(): void {
    this.closeRequest.emit();
  }

  onConfirm(): void {
    if (!this.playlistSelecionadaId || !this.musicaParaAdicionar) {
      alert('Seleção inválida.');
      return;
    }

    const data: MusicasPlaylistCreateDTO = {
      id_playlist: this.playlistSelecionadaId,
      id_musica: this.musicaParaAdicionar.id
    };

    this.musicaPlaylistService.addMusicaToPlaylist(data).subscribe({
      next: () => {
        alert(`'${this.musicaParaAdicionar?.nome}' adicionada com sucesso!`);
        this.onClose();
      },
      error: (err) => {
        console.error('Erro ao adicionar música à playlist', err);
        alert('Ocorreu um erro.');
      }
    });
  }
}
