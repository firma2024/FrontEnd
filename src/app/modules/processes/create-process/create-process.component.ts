import { Component } from '@angular/core';
import { Proceso } from '../../../shared/model/process/proceso';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { ProcessService } from '../../../services/process.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UtilService } from '../../../services/util.service';

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
  router: any;

  constructor(
    private userService: UserService,
    private processService: ProcessService,
    private utilService: UtilService
  ) {}
  onSelectedLawyer($event: any) {}
  areCorrectFields(): boolean {
    let dict: { [key: string]: string } = {};
    console.log(this.selectedLawyer)
    if(this.selectedLawyer === null){
      dict['Abogado asignado'] = 'Debe seleccionar un abogado';
    }
    if (Object.keys(dict).length !== 0) {
      this.utilService.raiseInvalidFields(dict);
      return false;
    } else {
      return true;
    }
  }
  crearProceso() {
    if (this.areCorrectFields()) {
      Swal.fire({
        title: 'Espere mientras se guarda el proceso....',
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
      this.processService
        .addProcess(this.nRadicado, this.selectedLawyer!)
        .subscribe(
          (data) => {
            Swal.close();
            Swal.fire({
              icon: 'success',
              iconColor: '#AA2535',
              title: 'Proceso creado',
              confirmButtonText: 'Okay',
              confirmButtonColor: '#AA2535',
              didClose: () => {
                this.router.navigate(['/listprocessadmin']);
              },
            });
          },
          (error: HttpErrorResponse) => {
            Swal.close();
            if (error.status === 409) {
              Swal.fire({
                icon: 'error',
                iconColor: '#AA2535',
                title: 'Error',
                confirmButtonColor: '#AA2535',
                confirmButtonText: 'Okay',
                text: 'El proceso ya se encuentra registrado en la plataforma.',
              });
            } else if (error.status === 500) {
              Swal.fire({
                icon: 'error',
                iconColor: '#AA2535',
                title: 'Error',
                confirmButtonColor: '#AA2535',
                confirmButtonText: 'Okay',
                text: 'El proceso es privado',
              });
            }
          }
        );
    }
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
