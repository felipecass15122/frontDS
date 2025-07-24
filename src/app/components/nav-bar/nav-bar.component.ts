import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
   constructor(
      private authService: AuthService,
      private usuarioService: UsuarioService,
     
    ) { }

    currentUser: UsuarioDTO | null = null;

  
  ngOnInit(): void {
      this.loadUserData();
  }
  loadUserData(): void {
    const userIdString = this.authService.getUserId();
    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      this.usuarioService.findById(userId).subscribe({
        next: (userData) => {
          this.currentUser = userData;  
          console.log(this.currentUser)        
        },
        error: (err) => {
          console.error('Erro ao buscar dados do usuário', err);
          
        }
      });
    } else {
      console.error('Erro ao buscar dados do usuário');
      
    }
  }


}
