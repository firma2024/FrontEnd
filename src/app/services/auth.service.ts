import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../shared/model/auth/aut.req';
import { TokenResponse } from '../shared/model/auth/token';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/model/auth/user';
import { tap } from 'rxjs/operators';
import { TipoDocumento } from '../shared/model/doc.tipo';
import { TipoAbogado } from '../shared/model/user/user.tipo';
import { encrypt } from '../utils/encrypt'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<TokenResponse> {
    password = encrypt(password);
    console.log(password)
    const authReq: AuthenticationRequest = {
      username: username,
      password: password,
    };

    return this.http
      .post<TokenResponse>(`${environment.authURL}/login`, authReq)
      .pipe(
        tap((response: TokenResponse) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('username', username);
        })
      );
  }
  forgotPassword(username: string): Observable<void> {
    return this.http.post<void>(
      `${environment.authURL}/${username}/forgot-password`,
      null
    );
  }
  createAbogado(
    email: string,
    nombreCompleto: string,
    telefono: number,
    identificacion: number,
    tipoDocumento: TipoDocumento,
    especialidades: TipoAbogado[],
    username: string,
    firmaId: number
  ): Observable<any> {
    const user: User = {
      id: null,
      nombres: nombreCompleto,
      correo: email,
      telefono: telefono,
      identificacion: identificacion,
      username: username,
      password: '12345',
      tipoDocumento: tipoDocumento,
      especialidades: especialidades,
      firmaId: firmaId,
    };
    return this.http.post<any>(`${environment.authURL}/abogado`, user);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.authURL}/users/${id}`);
  }
}
