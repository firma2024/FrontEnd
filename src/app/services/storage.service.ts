import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}
  subirFoto(usuarioId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('usuarioId', usuarioId.toString());
    const url = `${environment.storageURL}/upload/photo`;
    return this.http.post(url, formData);
  }
  descargarFoto(usuarioId: number): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'image/jpeg');
    const url = `${environment.storageURL}/download/photo?usuarioId=${usuarioId}`;
    return this.http.get(url, { responseType: 'blob', headers });
  }
  subirDocumento(actuacionId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('document', file, file.name);

    const url = `${environment.storageURL}/upload/document?actuacionId=${actuacionId}`;
    return this.http.post(url, formData);
  }
  descargarDocumento(actuacionId: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/pdf');
    const url = `${environment.storageURL}/download/document?actuacionId=${actuacionId}`;
    return this.http.get(url, { responseType: 'blob', headers });
  }
  descargarTodosLosDocumentos(
    procesoId: string
  ): Observable<{ fileName: string; blob: Blob }> {
    const headers = new HttpHeaders().set('Accept', 'application/zip');
    const url = `${environment.storageURL}/download/alldocuments?procesoId=${procesoId}`;

    return this.http
      .get(url, { responseType: 'blob', headers, observe: 'response' })
      .pipe(
        map((response) => {
          const fileName = response.headers.get('Content-Disposition')!;
          console.log(fileName);
          const blob: Blob = response.body as Blob;
          return { fileName, blob };
        })
      );
  }
}
