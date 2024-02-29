import { TipoDocumento } from "../doc.tipo";
import { TipoAbogado } from "./user.tipo";

export interface UserRequest {
  id?: number;
  nombres: string;
  correo: string;
  telefono: number;
  identificacion: number;
  username: string;
  tipoDocumento: TipoDocumento;
  especialidades: TipoAbogado[];
  firmaId?: number;
}
