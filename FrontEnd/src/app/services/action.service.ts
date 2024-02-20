import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { ActuacionResponse } from '../shared/model/actuaciones/actuacion.req';
import { Pageable } from '../shared/model/pageable';
import { ActuacionJefeFilter } from '../shared/model/actuaciones/actuacion.jefe.filter';
@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private http: HttpClient) {}
  //Get action by id
  getActuacion(id: number): Observable<ActuacionResponse> {
    const url = `${environment.actionsURL}/get?id=${id}`;
    return this.http.get<ActuacionResponse>(url);
  }
  //Get actions filtered by boss.
  getActuacionesFiltradas(
    procesoId: number,
    fechaInicioStr: string,
    fechaFinStr: string,
    estadoActuacion: string,
    page: number,
    size: number
  ): Observable<Pageable<ActuacionJefeFilter>> {
    const url = `${environment.actionsURL}/jefe/get/all/filter?procesoId=${procesoId}&fechaInicioStr=${fechaInicioStr}&fechaFinStr=${fechaFinStr}&estadoActuacion=${estadoActuacion}&page=${page}&size=${size}`;
    return this.http.get<Pageable<ActuacionJefeFilter>>(url);
  }
  //Get actions filtered by lawyer.
  getAllActuacionesByProcesoAbogado(
    procesoId: number,
    fechaInicioStr: string,
    fechaFinStr: string,
    existeDoc: boolean,
    page: number,
    size: number
  ): Observable<Pageable<ActuacionResponse>> {
    const url = `${environment.actionsURL}/get/all/abogado/filter?procesoId=${procesoId}&fechaInicioStr=${fechaInicioStr}&fechaFinStr=${fechaFinStr}&existeDoc=${existeDoc}&page=${page}&size=${size}`;
    return this.http.get<Pageable<ActuacionResponse>>(url);
  }
  //Update state of visualization
  actualizarEstadoVisualizacionActuacion(actionId: number): Observable<any> {
    const url = `${environment.actionsURL}/update/state?actionId=${actionId}`;
    return this.http.put(url, {});
  }
}
