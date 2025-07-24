export interface LoginDTO {
  login: string;
  senha: string;
}

export interface LoginResponseDTO {
  accessToken: string; 
  tokenType: string;
  userId: number;
}