

export interface PlaylistCreateDTO {
  nome: string;
  visibilidade: boolean;
  userID: number | null;
}

export interface PlaylistDTO {
  userID: number;
  imageUrl: string;
  nome: string;
  visibilidade: boolean;
  usuario: { id: number | null };
  id: number;
  descricao: string;
  

}