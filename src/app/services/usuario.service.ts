import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UsuarioDTO } from '../models/usuario.dto';
import { LoginDTO, LoginResponseDTO } from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'http://localhost:8080/usuario';
 
  constructor(private http: HttpClient) { }

  public findById(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiUrl}/${id}`);
  }
}
