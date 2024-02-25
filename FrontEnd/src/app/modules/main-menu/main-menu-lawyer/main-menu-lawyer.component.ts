import { Component, OnInit } from '@angular/core';
import { LawFirmService } from '../../../services/law.firm.service';
import { Firma } from '../../../shared/model/lawFirm/firma';
import { ProcessService } from '../../../services/process.service';

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

  constructor(private lawFirmService: LawFirmService) {}

  ngOnInit() {
    // Obtener el valor del localStorage
    const storedUsername = localStorage.getItem('username');

    // Verificar si storedUsername es null antes de asignarlo a username
    if (storedUsername !== null) {
      this.username = storedUsername;

      // Llamar a la función getFirmaByUser solo si se encontró un nombre de usuario
      this.lawFirmService.getFirmaByUser(this.username).subscribe(
        (firma: Firma) => {
          // Haces lo que necesites con la firma obtenida
          console.log('Firma obtenida:', firma);
          this.nombreEmpresa = `${firma.nombre}`;
          this.direccionEmpresa = `${firma.direccion}`;
        },
        (error) => {
          console.error('Error al obtener la firma:', error);
        }
      );
    } else {
      console.error('No se encontró un nombre de usuario en el localStorage');
    }
  }
}

