import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from '../shared/model/user/user.req';
import { environment } from '../../environments/environment';
import { UserProcesess } from '../shared/model/user/user.procesos';
import { UserAbogadoUpdate } from '../shared/model/user/user.abogado.update';
import { UserJefeUpdate } from '../shared/model/user/user.jefe.update';
import { Pageable } from '../shared/model/pageable';
import { TipoDocumento } from '../shared/model/doc.tipo';
import { TipoAbogado } from '../shared/model/user/user.tipo';
import { MensajeResponse } from '../shared/model/message';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  validarAgregarAbogado(
    nombres: string,
    correo: string,
    telefono: number,
    identificacion: number,
    username: string,
    tipoDocumento: TipoDocumento,
    especialidades: TipoAbogado[],
    firmaId?: number
  ): Observable<MensajeResponse> {
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
    const url = `${environment.userURL}/check/insert`;
    return this.http.post<MensajeResponse>(url, user);
  }
  agregarAbogado(
    nombres: string,
    correo: string,
    telefono: number,
    identificacion: number,
    username: string,
    tipoDocumento: TipoDocumento,
    especialidades: TipoAbogado[],
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
    tipoDocumento: TipoDocumento,
    especialidades: TipoAbogado[],
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
    tipoDocumento: TipoDocumento,
    especialidades: TipoAbogado[],
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

  actualizarInfoJefe(
    id: number,
    nombres: string,
    correo: string,
    telefono: string,
    identificacion: string
  ): Observable<any> {
    const url = `${environment.userURL}/update/info/jefe`;
    const body = { id, nombres, correo, telefono, identificacion };
    return this.http.put(url, body);
  }

  deleteUser(id: number): Observable<string> {
    const url = `${environment.userURL}/delete?id=${id}`;
    return this.http.delete<string>(url);
  }

  getLawyerByUsername(name: string): Observable<UserProcesess> {
    const url = `${environment.userURL}/get/name?name=${name}`;
    return this.http.get<UserProcesess>(url);
  }
  getAllAbogadosNames(firmaId: number): Observable<UserProcesess[]> {
    const url = `${environment.userURL}/get/all/names/abogados?firmaId=${firmaId}`;
    return this.http.get<UserProcesess[]>(url);
  }

  getAbogadosFilter(
    params = new HttpParams()
  ): Observable<Pageable<UserProcesess>> {
    return this.http.get<Pageable<UserProcesess>>(
      `${environment.userURL}/jefe/abogados/filter`,
      { params: params }
    );
  }
  getAbogado(userName: string): Observable<UserProcesess> {
    const url = `${environment.userURL}/get/info/abogado?userName=${userName}`;
    return this.http.get<UserProcesess>(url);
  }
  getAbogadoById(id: number): Observable<UserProcesess> {
    return this.http.get<UserProcesess>(
      `${environment.userURL}/get/abogado?id=${id}`
    );
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
