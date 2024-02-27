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

  constructor(private lawFirmService: LawFirmService,private userService: UserService,private processService:ProcessService) {}

  ngOnInit() {

    const storedUsername = localStorage.getItem('username')!;
    
    this.getProcesses(storedUsername)

    if (storedUsername !== null) {
      this.username = storedUsername;
      this.userService.getLawyerByUsername(this.username).subscribe(
        (user: UserProcesess) => {
          localStorage.setItem("lawyerId",user.id.toString())
        },
        (error) => {
          // Manejar errores aquí
          console.error(error);
        }
      );
      this.lawFirmService.getFirmaByUser(this.username).subscribe(
        (firma: Firma) => {
          console.log('Firma obtenida:', firma);
          this.nombreEmpresa = `${firma.nombre}`;
          this.direccionEmpresa = `${firma.direccion}`;
          localStorage.setItem("firmaId", firma.id.toString());
        },
        (error) => {
          console.error('Error al obtener la firma:', error);
        }
      );
    } else {
      console.error('No se encontró un nombre de usuario en el localStorage');
    }
    this.processService.getNumeroProcesosPorAbogadoYEstado(this.username, 'Activo').subscribe(
      (response: any) => {
        console.log(response.value)
        this.activeProcess = response.value;
      },
      (error) => {
        console.error('Error al obtener el número de procesos activos:', error);
      }
    );
    this.processService.getNumeroProcesosPorAbogadoYEstado(this.username, 'Finalizado a favor').subscribe(
      (response: any) => {console.log(response.value)
        this.favorProcess = response.value;
      },
      (error) => {
        console.error('Error al obtener el número de procesos activos:', error);
      }
    );
    this.processService.getNumeroProcesosPorAbogadoYEstado(this.username, 'Finalizado en contra').subscribe(
      (response: any) => {console.log(response.value)
        this.againstProcess = response.value;
      },
      (error) => {
        console.error('Error al obtener el número de procesos activos:', error);
      }
    );
  }
  getProcesses(username: string) {
    
  }
}

