import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica.service';
import { MusicaCreateDTO } from '../../models/musica.dto';
import { ArtistaDTO } from '../../models/artista.dto';
import { ArtistaService } from '../../services/artista.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-add-music',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavBarComponent
],
  templateUrl: './add-music.component.html',
  styleUrl: './add-music.component.css'
})
export class AddMusicComponent {
  musica: MusicaCreateDTO = {
    nome: '',
    id_artista: null,
    tags: '',
    url_musica: ''
  };

    artistas: ArtistaDTO[] = [];

  constructor(
    private musicaService: MusicaService,
    private artistaService: ArtistaService 
  ) { }

  ngOnInit(): void {
    this.carregarArtistas();
  }

  carregarArtistas(): void {
    this.artistaService.findAll().subscribe({
      next: (data) => {
        this.artistas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar artistas:', err);
        alert('Não foi possível carregar a lista de artistas. Verifique se você tem permissão.');
      }
    });
  }


  cadastrarMusica(): void {
    if (!this.musica.nome || !this.musica.id_artista || !this.musica.tags || !this.musica.url_musica) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.musicaService.insert(this.musica).subscribe({
      next: (resposta) => {
        alert('Música cadastrada com sucesso!');
        this.musica = { nome: '', id_artista: null , tags: '', url_musica: '' };
      },
      error: (erro) => {
        console.error('Erro no cadastro:', erro);
        alert('Ocorreu um erro ao cadastrar a música.');
      }
    });
  }

}
