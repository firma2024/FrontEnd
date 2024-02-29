import { Component } from '@angular/core';
import { ProcessService } from '../../../services/process.service';
import { Proceso } from '../../../shared/model/process/proceso';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router
  ) {}

  searchProceso() {
    Swal.fire({
      title: 'Espere por favor mientras se carga la información de su proceso...',
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
      }
    });

    this.processService.getProcessInfo(this.filingNumberInput).subscribe(
      (proceso: Proceso) => {
        Swal.close();
        
        localStorage.setItem("previewProcess", JSON.stringify(proceso));
        this.router.navigate(['/createprocess']);
      },
      (error) => {
        Swal.close();

        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Proceso no encontrado',
            text: 'No se encontró ningún proceso con el número ingresado.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#AA2535',
            iconColor:'#AA2535'
          });
        } else {
          console.error('Error al consultar el proceso:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al consultar el proceso. Por favor, inténtalo de nuevo.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#AA2535',
            iconColor:'#AA2535'
          });
        }
      }
    );
  }

  filterNonNumericCharacters() {
    this.filingNumberInput = this.filingNumberInput.replace(/[^\d]/g, '').substr(0, 23);
  }
}
