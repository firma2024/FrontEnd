import { Component } from '@angular/core';
import { Proceso } from '../../../shared/model/process/proceso';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { ProcessService } from '../../../services/process.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrl: './create-process.component.css',
})
export class CreateProcessComponent {
  nRadicado: string = 'Valor para nRadicado';
  despacho: string = 'Valor para despacho';
  typeProcess: string = 'Valor para typeProcess';
  dateFiling: string = 'Valor para dateFiling';

  listaItems: string[] = [];
  selectedLawyer: number | null = null;
  opciones: { valor: number; texto: string }[] = [];

  constructor(
    private userService: UserService,
    private processService: ProcessService
  ) {}
  onSelectedLawyer($event:any){}
  crearProceso() {
    this.processService
      .addProcess(this.nRadicado, this.selectedLawyer!)
      .subscribe(
        (data) => {
          console.log('Proceso creado:', data);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            Swal.fire({
              icon: 'error',
              iconColor: '#AA2535',
              title: 'Error',
              confirmButtonColor: '#AA2535',
              confirmButtonText: 'Okay',
              text: 'El proceso ya se encuentra registrado en la plataforma.',
            });
          }
        }
      );
  }
  ngOnInit() {
    const previewProcess: Proceso = JSON.parse(
      localStorage.getItem('previewProcess')!
    );

    this.nRadicado = previewProcess.numeroRadicado;
    this.despacho = previewProcess.despacho;
    this.typeProcess = previewProcess.tipoProceso;
    this.dateFiling = new Date(previewProcess.fechaRadicacion)
      .toISOString()
      .split('T')[0];
    this.listaItems = previewProcess.sujetos.split('|');
    this.loadLawyers();
  }
  loadLawyers() {
    this.userService
      .getAllAbogadosNames(parseInt(localStorage.getItem('firmaId')!))
      .subscribe((lawyers: UserProcesess[]) => {
        lawyers.forEach((lawyer: UserProcesess) => {
          this.opciones.push({
            valor: lawyer.id,
            texto: lawyer.nombres,
          });
        });
      });
  }
  ngOnDestroy() {
    localStorage.removeItem('previewProcess');
  }
}
