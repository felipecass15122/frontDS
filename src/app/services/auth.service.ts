import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { UsuarioDTO } from '../models/usuario.dto'; // Supondo que você tenha esta DTO
import { LoginDTO, LoginResponseDTO } from '../models/auth.dto';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Corrigido o tipo do parâmetro para ser consistente
  public register(usuarioDTO: UsuarioDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario`, usuarioDTO);
  }

  public login(credentials: LoginDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/auth`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          const decodedToken: any = jwtDecode(response.token);
          const userId = decodedToken.sub || decodedToken.id || decodedToken.userId;
          
          if (userId) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userId', userId.toString());
          } else {
            console.error("Nenhuma claim com o ID do usuário ('sub', 'id', 'userId') foi encontrada no token JWT.");
          }
        }
      }),
      // Adicionado para dar mais detalhes no console se a requisição falhar
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