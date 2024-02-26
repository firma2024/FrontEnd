import { Audiencia } from "../audencia/audiencia";

export interface ProcesoLawyer {
  id: number;
  numeroRadicado: string;
  despacho: string;
  sujetos: string;
  tipoProceso: string;
  fechaRadicacion: string;
  estado: string;
  audiencias: Audiencia[];
}

