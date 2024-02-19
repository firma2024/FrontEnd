import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proceso } from '../shared/model/process/proceso';
import { ProcessBusiness } from '../shared/model/process/process.business';
import { catchError } from 'rxjs/operators';
import { Pageable } from '../shared/model/pageable';
import { ProcessJefeFilter } from '../shared/model/process/proceso.boss.filter';
import { ProcesoLawyerFilter } from '../shared/model/process/process.lawyer.filter';
import { ProcesoUpdate } from '../shared/model/process/proceso.update';
import { ProcesoLawyer } from '../shared/model/process/proceso.lawyer';
import { ProcesoStatus } from '../shared/model/process/proceso.status';
import { ProcesoType } from '../shared/model/process/proceso.type';
import { AudienciaRequest } from '../shared/model/audencia/audencia.req';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  constructor(private http: HttpClient) {}

  // Obtain preview process information.
  getProcessInfo(file_number: string): Observable<Proceso> {
    return this.http.get<Proceso>(
      `${environment.processURL}/get/info/numberProcess=${file_number}`
    );
  }

  //Add process to the database and assig to a lawyer
  addProcess(numeroRadicado: string, idAbogado: number): Observable<any> {
    const process: ProcessBusiness = {
      numeroRadicado: numeroRadicado,
      idAbogado: idAbogado,
    };
    return this.http
      .post<any>(`${environment.processURL}/add/process`, process)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  //Filter process information by boss
  getProcesosByFirmaFilter(
    fechaInicioStr: string,
    firmaId: number,
    fechaFinStr: string,
    estadosProceso: string[],
    tipoProceso: string,
    page: number,
    size: number
  ): Observable<Pageable<ProcessJefeFilter>> {
    let params = new HttpParams()
      .set('firmaId', firmaId.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    if (fechaInicioStr) {
      params = params.set('fechaInicioStr', fechaInicioStr);
    }
    if (fechaFinStr) {
      params = params.set('fechaFinStr', fechaFinStr);
    }
    if (estadosProceso) {
      params = params.set('estadosProceso', estadosProceso.join(','));
    }
    if (tipoProceso) {
      params = params.set('tipoProceso', tipoProceso);
    }

    return this.http.get<Pageable<ProcessJefeFilter>>(
      `${environment.processURL}/get/all/filter`,
      { params }
    );
  }
  //Filter process information by lawyer
  getProcesosByAbogadoFilter(
    abogadoId: number,
    fechaInicioStr: string,
    fechaFinStr: string,
    estadosProceso: string[],
    tipoProceso: string,
    page: number,
    size: number
  ): Observable<Pageable<ProcesoLawyerFilter>> {
    let params = new HttpParams()
      .set('abogadoId', abogadoId.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    if (fechaInicioStr) {
      params = params.set('fechaInicioStr', fechaInicioStr);
    }
    if (fechaFinStr) {
      params = params.set('fechaFinStr', fechaFinStr);
    }
    if (estadosProceso) {
      params = params.set('estadosProceso', estadosProceso.join(','));
    }
    if (tipoProceso) {
      params = params.set('tipoProceso', tipoProceso);
    }

    return this.http.get<Pageable<ProcesoLawyerFilter>>(
      `${environment.processURL}/get/all/abogado/filter`,
      { params }
    );
  }
  //Obtain count of procesess group by type of process and law firm.
  getNumeroProcesosPorFirmaYEstado(
    firmaId: number,
    estado: string
  ): Observable<number> {
    let params = new HttpParams()
      .set('firmaId', firmaId.toString())
      .set('name', estado);

    return this.http.get<number>(
      `${environment.processURL}/get/state/processes/jefe`,
      { params }
    );
  }
  getNumeroProcesosPorAbogadoYEstado(
    estado: string,
    userName: string
  ): Observable<number> {
    let params = new HttpParams().set('name', estado).set('userName', userName);

    return this.http.get<number>(
      `${environment.processURL}/get/state/processes/abogado`,
      { params }
    );
  }
  //idk what this does.
  getProcesoPorIdJefe(processId: number): Observable<ProcessJefeFilter> {
    let params = new HttpParams().set('processId', processId.toString());

    return this.http.get<ProcessJefeFilter>(
      `${environment.processURL}/get/jefe`,
      {
        params,
      }
    );
  }
  //Delete process
  eliminarProceso(processId: number): Observable<string> {
    return this.http.delete<string>(
      `${environment.processURL}/delete?processId=${processId}`
    );
  }
  //Update process
  actualizarProceso(
    id: number,
    idAbogado: number,
    estadoProceso: string
  ): Observable<string> {
    const proceso: ProcesoUpdate = {
      id: id,
      idAbogado: idAbogado,
      estadoProceso: estadoProceso,
    };
    return this.http.put<string>(`${environment.processURL}/update`, proceso);
  }
  //Get process by lawyer id.
  getProcesoPorIdAbogado(processId: number): Observable<ProcesoLawyer> {
    return this.http.get<ProcesoLawyer>(
      `${environment.processURL}/get/abogado?processId=${processId}`
    );
  }
  //Get all status processes.
  getAllEstadoProcesos(): Observable<ProcesoStatus[]> {
    return this.http.get<ProcesoStatus[]>(
      `${environment.processURL}/estadoProceso/get/all`
    );
  }
  // Get all types of processes.
  getAllTipoProcesos(): Observable<ProcesoType[]> {
    return this.http.get<ProcesoType[]>(
      `${environment.processURL}/tipoProceso/get/all`
    );
  }
  actualizarAudiencia(id: number, enlace: string): Observable<string> {
    return this.http.put<string>(
      `${environment.processURL}/audiencia/update?id=${id}&enlace=${enlace}`,
      {}
    );
  }
  agregarAudiencia(
    enlace: string,
    procesoId: number,
    nombre: string
  ): Observable<string> {
    const audenciaReq: AudienciaRequest={
      enlace:enlace,
      procesoId:procesoId,
      nombre:nombre
    }
    return this.http.post<string>(
      `${environment.processURL}/audiencia/add`,
      audenciaReq
    );
  }
}
