import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UsuarioDTO } from '../models/usuario.dto';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'https://projetoplaylist-ds-fn33.onrender.com/usuario';
 
  constructor(private http: HttpClient) { }

  public findById(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/${id}`);
  }
}
