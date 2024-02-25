import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserProcesess } from '../../shared/model/user/user.procesos';

@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.component.html',
  styleUrls: ['./info-admin.component.css']
})
export class InfoAdminComponent implements OnInit {
  usuario: UserProcesess = {} as UserProcesess;

  constructor(
    private dialogRef: MatDialogRef<InfoAdminComponent>,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Aquí realizamos la llamada al servicio para obtener la información del usuario
    const userName = localStorage.getItem('username'); // Reemplaza 'nombreDeUsuario' con el nombre de usuario real
    
    // Verificamos si userName es null antes de llamar al servicio
    if (userName !== null) {
      this.userService.obtenerInformacionJefe(userName).subscribe(
        (data: UserProcesess) => {
          // Cuando se recibe la información del usuario, la asignamos a la variable 'usuario'
          this.usuario = data;
        },
        error => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    } else {
      console.error('El nombre de usuario es null');
    }
  }
  

  goBack() {
    this.dialogRef.close();
  }
}
