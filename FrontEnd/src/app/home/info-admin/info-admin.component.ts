import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserProcesess } from '../../shared/model/user/user.procesos';

@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.component.html',
  styleUrls: ['./info-admin.component.css'],
})
export class InfoAdminComponent implements OnInit {
  usuario: UserProcesess = {} as UserProcesess;
  usuarioName: string = '';
  constructor(
    private dialogRef: MatDialogRef<InfoAdminComponent>,
    private userService: UserService
  ) {}

  ngOnInit() {
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('username')!;
    if (role === 'ADMIN') {
      this.userService.obtenerInformacionJefe(userName).subscribe(
        (data: UserProcesess) => {
          this.usuario = data;
          this.usuarioName = this.usuario.nombres;
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    } else {
      this.userService.getLawyerByUsername(userName).subscribe(
        (data: UserProcesess) => {
          //ESTE NO SIRVE POR QUE TOCA ESPERAR QUE EL PATO DE DANIEL PONGA QUE RETORNE TODO EN VEZ DE SOLO EL ID Y NOMBRE
          this.usuario = data;
          console.log(data)
          this.usuarioName = this.usuario.nombres;
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }
  }

  actualizarPerfil() {
    console.log(this.usuario.nombres);
    this.userService
      .actualizarInfoJefe(
        this.usuario.id,
        this.usuario.nombres,
        this.usuario.correo,
        this.usuario.telefono.toString(),
        this.usuario.identificacion.toString()
      )
      .subscribe(
        () => {
          console.log('Información actualizada exitosamente');
        },
        (error) => {
          console.error('Error al actualizar la información:', error);
        }
      );
  }
  goBack() {
    this.dialogRef.close();
  }
}
