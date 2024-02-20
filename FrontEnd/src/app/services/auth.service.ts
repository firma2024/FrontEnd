import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../shared/model/auth/aut.req';
import { TokenResponse } from '../shared/model/auth/token';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/model/auth/user';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<TokenResponse> {
    const authReq: AuthenticationRequest = {
      username: username,
      password: password,
    };
    return this.http.post<TokenResponse>(
      `${environment.authURL}/login`,
      authReq
    ).pipe(
      tap((response: TokenResponse) => {
        localStorage.setItem('token', response.acces_token);
        localStorage.setItem('role', response.role);
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
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string,
    telefono: string,
    identificacion: string,
    tipoDocumento: string,
    especialidades: string[],
    firmaId: number
  ): Observable<any> {
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: password,
      telefono: telefono,
      identificacion: identificacion,
      tipoDocumento: tipoDocumento,
      especialidades: especialidades,
      firmaId: firmaId,
    };
    return this.http.post<any>(`${environment.authURL}/admin`, user);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.authURL}/users/${id}`);
  }
}
