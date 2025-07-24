import { ArtistaDTO } from "./artista.dto";

export interface MusicaCreateDTO {
  nome: string;
  id_artista: number | null ;
  tags: string;
  url_musica: string;
}

export interface MusicaDTO {
  id: number;
  nome: string;
  id_artista: number;
  tags: string;
  url_musica: string;
  imageUrl?: string; 
}

export interface MusicaApiResponseDTO {
  id: number;
  nome: string;
  id_artista: number; 
  url_musica: string;
  tags: string;
}


export interface MusicaViewDTO extends MusicaApiResponseDTO {
  artista?: ArtistaDTO; 
  imageUrl?: string;
}