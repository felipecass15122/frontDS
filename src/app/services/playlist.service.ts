import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlaylistCreateDTO, PlaylistDTO } from '../models/playlist.dto';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  
  private readonly apiUrl = 'http://localhost:8080/playlist';

  constructor(private http: HttpClient) { }

  public insert(playlistDTO: PlaylistCreateDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, playlistDTO);
  }

   public findAll(): Observable<PlaylistDTO[]> {
    return this.http.get<PlaylistDTO[]>(this.apiUrl);
  }

  public findById(id: number): Observable<PlaylistDTO> {
    return this.http.get<PlaylistDTO>(`${this.apiUrl}/${id}`);
  }

  public excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
