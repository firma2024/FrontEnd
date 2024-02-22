import { Component, OnInit } from '@angular/core';
import { LawFirmService } from '../../services/law.firm.service';
import { Firma } from '../../shared/model/lawFirm/firma';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'], // El nombre de esta propiedad es styleUrls, no styleUrl
})
export class MainMenuComponent implements OnInit {
  nombreEmpresa: string = '';
  direccionEmpresa: string = '';
  activeProcess: string = '';
  lawyersRegister: string = '';
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
          this.nombreEmpresa = `${firma.nombre} - ${firma.direccion}`;
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
