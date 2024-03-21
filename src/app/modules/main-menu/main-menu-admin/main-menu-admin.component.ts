import { Component, OnInit } from '@angular/core';
import { LawFirmService } from '../../../services/law.firm.service';
import { Firma } from '../../../shared/model/lawFirm/firma';
import { ProcessService } from '../../../services/process.service'; // Asegúrate de importar el servicio ProcessService
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-main-menu-admin',
  templateUrl: './main-menu-admin.component.html',
  styleUrls: ['./main-menu-admin.component.css'],
})
export class MainMenuAdminComponent implements OnInit {
  nombreEmpresa: string = '';
  direccionEmpresa: string = '';
  activeProcess: number = 0; // Assuming activeProcess is a number
  lawyersRegister: number = 0;
  favorProcess: number = 0;
  againstProcess: number = 0;
  reconciliedProcess: number = 0;
  username: string = '';

  constructor(
    private lawFirmService: LawFirmService,
    private processService: ProcessService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername !== null) {
      this.username = storedUsername;

      this.lawFirmService.getFirmaByUser(this.username).subscribe(
        (firma: Firma) => {
          this.nombreEmpresa = firma.nombre;
          this.direccionEmpresa = firma.direccion;
          localStorage.setItem('firmaId', firma.id.toString());

          this.getProcesses(firma.id);
          this.getRegisteredLawyers(firma.id)
        },
        (error) => {
          console.error('Error al obtener la firma:', error);
        }
      );
    } else {
      console.error('No se encontró un nombre de usuario en el localStorage');
    }
  }
  getRegisteredLawyers(firmaId:number) {
    this.userService.getActiveAbogados(firmaId).subscribe((registeredLawyers: any)=>{
      console.log(registeredLawyers)
      this.lawyersRegister = registeredLawyers.value
    })
  }
  getProcesses(firmaId: number) {
    this.processService
      .getNumeroProcesosPorFirmaYEstado(firmaId, 'Activo')
      .subscribe(
        (response: any) => {
          this.activeProcess = response.value;
        },
        (error) => {
          console.error(
            'Error al obtener el número de procesos activos:',
            error
          );
        }
      );
    this.processService
      .getNumeroProcesosPorFirmaYEstado(firmaId, 'Finalizado a favor')
      .subscribe(
        (response: any) => {
          this.favorProcess = response.value;
        },
        (error) => {
          console.error(
            'Error al obtener el número de procesos finalizados a favor:',
            error
          );
        }
      );
    this.processService
      .getNumeroProcesosPorFirmaYEstado(firmaId, 'Finalizado en contra')
      .subscribe(
        (response: any) => {
          this.againstProcess = response.value;
        },
        (error) => {
          console.error(
            'Error al obtener el número de procesos finializados en contra:',
            error
          );
        }
      );
      this.processService
      .getNumeroProcesosPorFirmaYEstado(firmaId, 'Conciliado')
      .subscribe(
        (response: any) => {
          this.reconciliedProcess = response.value;
        },
        (error) => {
          console.error(
            'Error al obtener el número de procesos conciliados:',
            error
          );
        }
      );
  }
}
