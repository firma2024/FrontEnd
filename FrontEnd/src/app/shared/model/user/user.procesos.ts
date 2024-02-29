import { Speciality } from "./speciality";

export interface UserProcesess {
    photo:Blob,
    id: number;
    nombres: string;
    correo: string;
    telefono: number;
    identificacion: number;
    especialidades: Speciality[];
    numeroProcesosAsignados: number;
}