import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirecionar após o cadastro
import { AuthService } from '../../services/auth.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario: UsuarioDTO = {
      nome: '',
      email: '',
      login: '',
      senha: '',
      nivelAcesso: 'USER' 
    };

  confirmPassword ='';

  constructor(
    private userService: AuthService,
    private router: Router
  ) { }

  registrarUsuario(): void {
    // 1. Validar se as senhas coincidem
    if (this.usuario.senha !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // 2. Chamar o serviço para enviar os dados para a API
    this.userService.register(this.usuario).subscribe({
      next: (response) => {
        alert('Usuário cadastrado com sucesso! Faça o login para continuar.');
        // 3. Redirecionar para a página de login após o sucesso
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
        // Exibe a mensagem de erro que vem do backend, se houver
        alert(err.error.message || 'Ocorreu um erro ao cadastrar.');
      }
    });
  }


}
