export interface UserRequest {
  id?: number;
  nombres: string;
  correo: string;
  telefono: number;
  identificacion: number;
  username: string;
  tipoDocumento: string;
  especialidades: string[];
  firmaId?: number;
}
