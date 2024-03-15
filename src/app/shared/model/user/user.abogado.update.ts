import { TipoAbogado } from "./user.tipo";

export interface UserAbogadoUpdate {
    id: number;
    nombres: string;
    correo: string;
    telefono: string; 
    identificacion: string; 
    especialidades: TipoAbogado[];
}