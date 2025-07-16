import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica.service';
import { MusicaCreateDTO } from '../../models/musica.dto';


@Component({
  selector: 'app-add-music',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './add-music.component.html',
  styleUrl: './add-music.component.css'
})
export class AddMusicComponent {
  musica: MusicaCreateDTO = {
    nome: '',
    artista: { id: null },
    tags: '',
    urlMusica: ''
  };

  artistas: any[] = [];

   constructor(private musicaService: MusicaService) { }

  ngOnInit(): void {
    this.carregarArtistas();
  }

  carregarArtistas(): void {
    this.artistas = [
      { id: 1, nome: 'Artista de Teste 1' },
      { id: 2, nome: 'Artista de Teste 2' },
    ];
  }

  cadastrarMusica(): void {
    if (!this.musica.nome || !this.musica.artista.id || !this.musica.tags || !this.musica.urlMusica) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.musicaService.insert(this.musica).subscribe({
      next: (resposta) => {
        alert('Música cadastrada com sucesso!');
        this.musica = { nome: '', artista: { id: null }, tags: '', urlMusica: '' };
      },
      error: (erro) => {
        console.error('Erro no cadastro:', erro);
        alert('Ocorreu um erro ao cadastrar a música.');
      }
    });
  }

}
