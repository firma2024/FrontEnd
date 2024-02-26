import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from '../shared/model/user/user.req';
import { environment } from '../environments/environments';
import { UserProcesess } from '../shared/model/user/user.procesos';
import { UserAbogadoUpdate } from '../shared/model/user/user.abogado.update';
import { UserJefeUpdate } from '../shared/model/user/user.jefe.update';
import { Pageable } from '../shared/model/pageable';
import { TipoDocumento } from '../shared/model/doc.tipo';
import { TipoAbogado } from '../shared/model/user/user.tipo';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  agregarAbogado(
    nombres: string,
    correo: string,
    telefono: number,
    identificacion: number,
    username: string,
    tipoDocumento: string,
    especialidades: string[],
    firmaId?: number
  ): Observable<any> {
    const user: UserRequest = {
      nombres: nombres,
      correo: correo,
      telefono: telefono,
      identificacion: identificacion,
      username: username,
      tipoDocumento: tipoDocumento,
      especialidades: especialidades,
      firmaId: firmaId,
    };
    const url = `${environment.userURL}/add/abogado`;
    return this.http.post(url, user);
  }
  agregarJefe(
    nombres: string,
    correo: string,
    telefono: number,
    identificacion: number,
    username: string,
    tipoDocumento: string,
    especialidades: string[],
    firmaId?: number
  ): Observable<any> {
    const user: UserRequest = {
      nombres: nombres,
      correo: correo,
      telefono: telefono,
      identificacion: identificacion,
      username: username,
      tipoDocumento: tipoDocumento,
      especialidades: especialidades,
      firmaId: firmaId,
    };
    const url = `${environment.userURL}/add/jefe`;
    return this.http.post(url, user);
  }
  agregarAdmin(
    nombres: string,
    correo: string,
    telefono: number,
    identificacion: number,
    username: string,
    tipoDocumento: string,
    especialidades: string[],
    firmaId?: number
  ): Observable<any> {
    const user: UserRequest = {
      nombres: nombres,
      correo: correo,
      telefono: telefono,
      identificacion: identificacion,
      username: username,
      tipoDocumento: tipoDocumento,
      especialidades: especialidades,
      firmaId: firmaId,
    };
    const url = `${environment.userURL}/add/admin`;
    return this.http.post(url, user);
  }
  obtenerInformacionJefe(userName: string): Observable<UserProcesess> {
    const url = `${environment.userURL}/get/info/jefe?userName=${userName}`;
    return this.http.get<UserProcesess>(url);
  }
  actualizarInfoAbogado(userRequest: UserAbogadoUpdate): Observable<any> {
    const url = `${environment.userURL}/update/info/abogado`;
    return this.http.put(url, userRequest);
  }

  actualizarInfoJefe(userRequest: UserJefeUpdate): Observable<any> {
    const url = `${environment.userURL}/update/info/jefe`;
    return this.http.put(url, userRequest);
  }
  deleteUser(id: number): Observable<any> {
    const url = `${environment.userURL}/delete?id=${id}`;
    return this.http.delete(url);
  }

  getLawyerByUsername(name: string): Observable<UserProcesess> {
    const url = `${environment.userURL}/get/name?name=${name}`;
    return this.http.get<UserProcesess>(url);
  }
  getAllAbogadosNames(firmaId: number): Observable<UserProcesess[]> {
    const url = `${environment.userURL}/get/all/names/abogados?firmaId=${firmaId}`;
    return this.http.get<UserProcesess[]>(url);
  }

  /*getAbogadosFilter(
    especialidades: string[] | null,
    firmaId: number,
    numProcesosInicial: number = 0,
    numProcesosFinal: number = 5,
    page: number = 0,
    size: number = 10
  ): Observable<Pageable<UserProcesess>> {
    const url = `${environment.userURL}/jefe/abogados/filter`;
    const params = {
      especialidades: especialidades ? especialidades.join(',') : undefined,
      firmaId: firmaId.toString(),
      numProcesosInicial: numProcesosInicial.toString(),
      numProcesosFinal: numProcesosFinal.toString(),
      page: page.toString(),
      size: size.toString(),
    };
    return this.http.get<Pageable<UserProcesess>>(url, { params });
  }*/
  getAbogado(userName: string): Observable<UserProcesess> {
    const url = `${environment.userURL}/get/abogado?userName=${userName}`;
    return this.http.get<UserProcesess>(url);
  }
  getActiveAbogados(firmaId: number): Observable<number> {
    const url = `${environment.userURL}/get/active/abogados?firmaId=${firmaId}`;
    return this.http.get<number>(url);
  }
  getRoleByUser(username: string): Observable<string> {
    const url = `${environment.userURL}/rol/get/user?username=${username}`;
    return this.http.get<string>(url);
  }
  getAllTipoDocumento(): Observable<TipoDocumento[]> {
    const url = `${environment.userURL}/tipoDocumento/get/all`;
    return this.http.get<TipoDocumento[]>(url);
  }
  getAllTipoAbogado(): Observable<TipoAbogado[]> {
    const url = `${environment.userURL}/tipoAbogado/get/all`;
    return this.http.get<TipoAbogado[]>(url);
  }
}
