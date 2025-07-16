export interface PlaylistCreateDTO {
  nome: string;
  visibilidade: boolean;
  usuario: { id: number | null };
}