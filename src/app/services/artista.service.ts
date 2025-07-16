import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtistaDTO } from '../models/artista.dto'; 


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

   private readonly apiUrl = 'http://localhost:8080/artista';

  constructor(private http: HttpClient) { }

  public insert(artistaDTO: ArtistaDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, artistaDTO);
  }
}
