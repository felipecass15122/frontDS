import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginDTO } from '../../models/auth.dto';
import { AuthService } from '../../services/auth.service'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
   credentials: LoginDTO = {
     login: '',
     senha: ''
   };

  constructor(
   
    private authService: AuthService,
    private router: Router
  ) {}

  fazerLogin(): void {
    if (!this.credentials.login || !this.credentials.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Login ou senha inválidos. Tente novamente.');
      }
    });
  }
}
