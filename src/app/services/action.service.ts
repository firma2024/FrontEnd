import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  getActuacionesFilter(
    procesoId: number,
    page: number,
    size: number,
    fechaInicioStr?: string,
    fechaFinStr?: string,
    estadoActuacion?: string
  ): Observable<Pageable<ActuacionJefeFilter>> {
    let params = new HttpParams().set('procesoId', procesoId.toString());

    if (fechaInicioStr) {
      params = params.set('fechaInicioStr', fechaInicioStr);
    }
    if (fechaFinStr) {
      params = params.set('fechaFinStr', fechaFinStr);
    }
    if (estadoActuacion) {
      params = params.set('estadoActuacion', estadoActuacion);
    }
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (size !== undefined) {
      params = params.set('size', size.toString());
    }

    return this.http.get<Pageable<ActuacionJefeFilter>>(
      `${environment.actionsURL}/jefe/get/all/filter`,
      {
        params,
      }
    );
  }

  getAllActuacionesByProcesoAbogado(
    procesoId: number,
    fechaInicioStr?: string,
    fechaFinStr?: string,
    existeDoc?: boolean,
    page: number = 0,
    size: number = 5
  ): Observable<Pageable<ActuacionResponse>> {
    let params = new HttpParams().set('procesoId', procesoId.toString());

    if (fechaInicioStr) {
      params = params.set('fechaInicioStr', fechaInicioStr);
    }

    if (fechaFinStr) {
      params = params.set('fechaFinStr', fechaFinStr);
    }

    if (existeDoc != null) {
      params = params.set('existeDoc', existeDoc.toString());
    }

    params = params.set('page', page.toString()).set('size', size.toString());

    return this.http.get<Pageable<ActuacionResponse>>(
      `${environment.actionsURL}/get/all/abogado/filter`,
      { params }
    );
  }
  //Update state of visualization
  actualizarEstadoVisualizacionActuacion(actionId: number): Observable<any> {
    const url = `${environment.actionsURL}/update/state?actionId=${actionId}`;
    return this.http.put(url, {});
  }
}
