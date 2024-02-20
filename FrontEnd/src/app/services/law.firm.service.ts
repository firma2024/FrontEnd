import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Firma } from '../shared/model/lawFirm/firma';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { FirmaRequest } from '../shared/model/lawFirm/firma.req';
@Injectable({
  providedIn: 'root',
})
export class LawFirmService {
  constructor(private http: HttpClient) {}
  // Get firma name by username.
  getFirmaByUser(userName: string): Observable<Firma> {
    return this.http.get<Firma>(
      `${environment.processURL}/firma/get/user?userName=${userName}`
    );
  }
  guardarFirma(nombre: string, direccion: string): Observable<void> {
    const firma: FirmaRequest = {
      nombre:nombre,
      direccion:direccion
    };
    return this.http.post<void>(`${environment.lawFirmURL}/firma/save`, firma);
  }
}
