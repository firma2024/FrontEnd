import { Component } from '@angular/core';
import { ProcessService } from '../../../services/process.service';
import { Proceso } from '../../../shared/model/process/proceso';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-process',
  templateUrl: './register-process.component.html',
  styleUrl: './register-process.component.css',
})
export class RegisterProcessComponent {
  filingNumberInput: string = '';

  constructor(
    private fb: FormBuilder,
    private processService: ProcessService,
    private router: Router
  ) {}
  searchProceso() {
    this.processService.getProcessInfo(this.filingNumberInput).subscribe(
      (proceso: Proceso) => {
        localStorage.setItem("previewProcess", JSON.stringify(proceso));
        this.router.navigate(['/createprocess']);
      },
      (error) => {
        if (error.status === 400) {
          alert('Proceso no encontrado');
        } else {
          console.error('Error al consultar el proceso:', error);
        }
      }
    );
  }
}
