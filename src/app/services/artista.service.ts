import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArtistaDTO, ArtistaCreateDTO } from '../models/artista.dto'; 


@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private readonly apiUrl = 'http://localhost:8080/artista';

  constructor(private http: HttpClient) { }

  public insert(artistaDTO: ArtistaCreateDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, artistaDTO);
  }

  public findAll(): Observable<ArtistaDTO[]> {
    return this.http.get<ArtistaDTO[]>(this.apiUrl);
  }

  public findById(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  
}
