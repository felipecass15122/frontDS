import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { UsuarioDTO } from '../models/usuario.dto'; 
import { LoginDTO, LoginResponseDTO } from '../models/auth.dto';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://projetoplaylist-ds-fn33.onrender.com';

  constructor(private http: HttpClient) { }

 
  public register(usuarioDTO: UsuarioDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario`, usuarioDTO);
  }

 public login(credentials: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/auth`, credentials).pipe(
      tap(response => {
        
        if (response && response.accessToken && response.userId) {
          localStorage.setItem('authToken', response.accessToken);
          localStorage.setItem('userId', response.userId.toString());
        } else {
          console.error("A resposta da API de login não continha 'accessToken' ou 'userId'.");
        }
      
      }),
      catchError(error => {
        console.error('Erro na requisição de login no serviço:', error);
        return throwError(() => error);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId'); 
  }
  
  public getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}