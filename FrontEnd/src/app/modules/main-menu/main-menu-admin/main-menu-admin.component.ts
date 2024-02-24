import { Component, OnInit } from '@angular/core';
import { LawFirmService } from '../../../services/law.firm.service';
import { Firma } from '../../../shared/model/lawFirm/firma';

@Component({
  selector: 'app-main-menu-admin',
  templateUrl: './main-menu-admin.component.html',
  styleUrl: './main-menu-admin.component.css'
})
export class MainMenuAdminComponent {
  nombreEmpresa: string = '';
  direccionEmpresa: string = '';
  activeProcess: string = '';
  lawyersRegister: string = '';
  favorProcess: string = '';
  againstProcess: string = '';
  username: string = '';

  constructor(private lawFirmService: LawFirmService) {}

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername !== null) {
      this.username = storedUsername;

      this.lawFirmService.getFirmaByUser(this.username).subscribe(
        (firma: Firma) => {
          this.nombreEmpresa = `${firma.nombre}`;
          this.direccionEmpresa = `${firma.direccion}`;
          localStorage.setItem("firmaId",firma.id.toString())
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
