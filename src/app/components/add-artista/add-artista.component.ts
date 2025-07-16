import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistaService } from '../../services/artista.service';
import { ArtistaDTO } from '../../models/artista.dto';

@Component({
  selector: 'app-add-artista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-artista.component.html',
  styleUrl: './add-artista.component.css'
})
export class AddArtistaComponent {
  artista: ArtistaDTO = {
    nome: '',
    descricao: ''
  };

  constructor(private artistaService: ArtistaService) { }

  cadastrarArtista(): void {
    if (!this.artista.nome || !this.artista.descricao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.artistaService.insert(this.artista).subscribe({
      next: (response) => {
        alert('Artista cadastrado com sucesso!');
        this.artista = { nome: '', descricao: '' }; 
      },
      error: (err) => {
        console.error('Erro ao cadastrar artista:', err);
        alert('Ocorreu um erro ao cadastrar o artista.');
      }
    });
  }

}
