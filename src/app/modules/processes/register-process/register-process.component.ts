import { Component } from '@angular/core';
import { ProcessService } from '../../../services/process.service';
import { Proceso } from '../../../shared/model/process/proceso';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-register-process',
  templateUrl: './register-process.component.html',
  styleUrls: ['./register-process.component.css'],
})
export class RegisterProcessComponent {
  filingNumberInput: string = '';

  constructor(
    private fb: FormBuilder,
    private processService: ProcessService,
    private router: Router,
    private utilService: UtilService
  ) {}

  searchProceso() {
    if (this.validFields()) {
      Swal.fire({
        title:
          'Espere mientras se obtiene la información de Consulta Nacional de Procesos Unificada...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          const container = Swal.getHtmlContainer();
          if (container) {
            const loader = container.querySelector('.swal2-loader');
            if (loader instanceof HTMLElement) {
              loader.style.color = '#AA2535';
            }
          }
        },
      });

      this.processService.getProcessInfo(this.filingNumberInput).subscribe(
        (proceso: Proceso) => {
          Swal.close();

          localStorage.setItem('previewProcess', JSON.stringify(proceso));
          this.router.navigate(['/createprocess']);
        },
        (error) => {
          Swal.close();

          if (error.status === 404) {
            Swal.fire({
              icon: 'error',
              title: 'Proceso no encontrado',
              text: 'No se encontró ningún proceso con el número ingresado, valide el numero ingresado.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#AA2535',
              iconColor: '#AA2535',
            });
          } else if (error.status == 400){
            Swal.fire({
              icon: 'error',
              iconColor: '#AA2535',
              title: 'Error',
              confirmButtonColor: '#AA2535',
              confirmButtonText: 'Okay',
              text: 'El proceso es privado',
            });
          }
          else if (error.status == 503){
            Swal.fire({
              icon: 'error',
              iconColor: '#AA2535',
              title: 'Error',
              confirmButtonColor: '#AA2535',
              confirmButtonText: 'Okay',
              text: 'Error de conexion con Consulta Nacional de Procesos Unificada. Intente mas tarde',
            });
          }
          else {
            console.error('Error al consultar el proceso:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al consultar el proceso. Por favor, inténtalo de nuevo.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#AA2535',
              iconColor: '#AA2535',
            });
          }
        }
      );
    }
  }
  validFields(): boolean {
    let dict: { [key: string]: string } = {};

    if (this.filingNumberInput.length !== 23) {
      dict['Numero radicado'] = 'Debe tener exactamente 23 digitos';
    }
    for (const campo of this.filingNumberInput) {
      if (!/^\d+$/.test(campo)) {
        dict['Numero radicado'] = 'Solo debe contener digitos';
      }
    }
    if (Object.keys(dict).length !== 0) {
      this.filingNumberInput = this.filingNumberInput.replace(/\s/g, '');
      this.utilService.raiseInvalidFields(dict);

      return false;
    } else {
      return true;
    }
  }
}
