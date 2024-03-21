import { Actuacion } from "../actuaciones/actuacion";
export interface Proceso {
    id: number;
    idProceso: BigInteger;
    numeroRadicado: string;
    despacho: string;
    sujetos: string;
    fechaRadicacion: string;
    actuaciones: Actuacion[];
    tipoProceso: string;
    ubicacionExpediente: string;
    idAbogado: number;
    estadoProceso: string;
}

