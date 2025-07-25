import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicaDTO } from '../models/musica.dto';
import { MusicasPlaylistCreateDTO } from '../models/musicaPlaylist.dto';

@Injectable({
  providedIn: 'root'
})
export class MusicaPlaylistService {

  private readonly apiUrl = 'https://projetoplaylist-ds-fn33.onrender.com/musicas-playlist';

  constructor(private http: HttpClient) { }


  public getMusicasFromPlaylist(playlistId: number): Observable<MusicaDTO[]> {
    return this.http.get<MusicaDTO[]>(`${this.apiUrl}/playlist/${playlistId}/musicas`);
  }

  public addMusicaToPlaylist(data: MusicasPlaylistCreateDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, data);
  }

  public excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  } 
}
