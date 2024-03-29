import { Component, OnInit } from '@angular/core';
import { LawFirmService } from '../../../services/law.firm.service';
import { Firma } from '../../../shared/model/lawFirm/firma';
import { ProcessService } from '../../../services/process.service';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';

@Component({
  selector: 'app-main-menu-lawyer',
  templateUrl: './main-menu-lawyer.component.html',
  styleUrl: './main-menu-lawyer.component.css'
})
export class MainMenuLawyerComponent {

  nombreEmpresa: string = '';
  direccionEmpresa: string = '';
  activeProcess: string = '';
  favorProcess: string = '';
  againstProcess: string = '';
  username: string = '';
  reconciliedProcess: string = '';

  constructor(private lawFirmService: LawFirmService,private userService: UserService,private processService:ProcessService) {}

  ngOnInit() {

    const storedUsername = localStorage.getItem('username')!;
    const lawyerId = localStorage.getItem("lawyerId")

    if (storedUsername !== null) {
      this.username = storedUsername;
      
      this.lawFirmService.getFirmaByUser(this.username).subscribe(
        (firma: Firma) => {
          console.log('Firma obtenida:', firma);
          this.nombreEmpresa = `${firma.nombre}`;
          this.direccionEmpresa = `${firma.direccion}`;
        },
        (error) => {
          console.error('Error al obtener la firma:', error);
        }
      );
    } 
    this.processService.getNumeroProcesosPorAbogadoYEstado('Activo',this.username).subscribe(
      (response: any) => {
        console.log(response.value)
        this.activeProcess = response.value;
      },
      (error) => {
        console.error('Error al obtener el número de procesos activos:', error);
      }
    );
    this.processService.getNumeroProcesosPorAbogadoYEstado('Finalizado a favor',this.username).subscribe(
      (response: any) => {console.log(response.value)
        this.favorProcess = response.value;
      },
      (error) => {
        console.error('Error al obtener el número de procesos activos:', error);
      }
    );
    this.processService.getNumeroProcesosPorAbogadoYEstado('Finalizado en contra',this.username).subscribe(
      (response: any) => {console.log(response.value)
        this.againstProcess = response.value;
      },
      (error) => {
        console.error('Error al obtener el número de procesos activos:', error);
      }
    );
    this.processService.getNumeroProcesosPorAbogadoYEstado('Conciliado',this.username).subscribe(
      (response: any) => {console.log(response.value)
        this.reconciliedProcess = response.value;
      },
      (error) => {
        console.error('Error al obtener el número de procesos activos:', error);
      }
    );
  }

}

