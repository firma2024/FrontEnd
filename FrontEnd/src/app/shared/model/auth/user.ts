import { TipoDocumento } from "../doc.tipo";
import { TipoAbogado } from "../user/user.tipo";

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    telefono: string;
    identificacion: string;
    tipoDocumento: TipoDocumento,
    especialidades: TipoAbogado[],
    firmaId: number;
  }
  