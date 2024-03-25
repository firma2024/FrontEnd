import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
  getActuacion(id: string): Observable<ActuacionResponse> {
    const url = `${environment.actionsURL}/get?id=${id}`;
    return this.http.get<ActuacionResponse>(url);
  }
  //Get actions filtered by boss.
  getActuacionesFilter(
    params = new HttpParams()
  ): Observable<Pageable<ActuacionJefeFilter>> {
    return this.http.get<Pageable<ActuacionJefeFilter>>(
      `${environment.actionsURL}/jefe/get/all/filter`,
      {
        params,
      }
    );
  }

  getAllActuacionesByProcesoAbogado(
    params = new HttpParams()
  ): Observable<Pageable<ActuacionResponse>> {
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
