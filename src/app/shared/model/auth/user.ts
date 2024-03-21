import { TipoDocumento } from "../doc.tipo";
import { TipoAbogado } from "../user/user.tipo";

export interface User {
    id?: string | null;
    nombres: string;
    correo: string;
    telefono: number;
    identificacion: number;
    username: string;
    password: string;
    tipoDocumento: TipoDocumento,
    especialidades: TipoAbogado[],
    firmaId: number;
  }
  