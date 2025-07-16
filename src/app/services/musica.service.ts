import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicaCreateDTO } from '../models/musica.dto';


@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private readonly apiUrl = 'http://localhost:8080/musica';
  constructor(private http: HttpClient) { }

  public insert(musicaDTO: MusicaCreateDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, musicaDTO);
  }
}
