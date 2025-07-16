export interface MusicaCreateDTO {
  nome: string;
  artista: { id: number | null };
  tags: string;
  urlMusica: string;
}
