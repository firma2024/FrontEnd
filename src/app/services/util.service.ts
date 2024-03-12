import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}
  
  raiseInvalidFields(dict: { [clave: string]: string }) {
    let mensaje = '';
    for (let key in dict) {
      mensaje = mensaje + `<strong>${key}</strong>: ${dict[key]}\n`;
    }
    Swal.fire({
      title: 'Error en los campos registrados',
      html: `<ul style="text-align: left;">${mensaje
        .split('\n')
        .filter(Boolean)
        .map((line) => `<li>${line}</li>`)
        .join('')}</ul>`,
      confirmButtonColor: '#AA2535',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
  }
}
