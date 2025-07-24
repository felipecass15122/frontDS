import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicaApiResponseDTO, MusicaCreateDTO, MusicaDTO } from '../models/musica.dto';


@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private readonly apiUrl = 'http://localhost:8080/musica';
  constructor(private http: HttpClient) { }

  public insert(musicaDTO: MusicaCreateDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, musicaDTO);
  }

  public findById(id: number): Observable<MusicaApiResponseDTO>{
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  public findAll(): Observable<MusicaDTO[]> {
    return this.http.get<MusicaDTO[]>(this.apiUrl);
  }
}
