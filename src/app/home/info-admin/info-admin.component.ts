import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserProcesess } from '../../shared/model/user/user.procesos';
import { StorageService } from '../../services/storage.service';
import { Speciality } from '../../shared/model/user/speciality';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.component.html',
  styleUrls: ['./info-admin.component.css'],
})
export class InfoAdminComponent implements OnInit {
  usuario: UserProcesess = {} as UserProcesess;
  usuarioName: string = '';
  imageUrl: string = 'assets/defaultProfile.png';
  listaEspecialidades: Speciality[] = [];
  selectedSpecialty: string = '';
  rol: string = '';

  constructor(
    private dialogRef: MatDialogRef<InfoAdminComponent>,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.rol = localStorage.getItem('role') || '';
    this.obtaintUserInfo();
    this.getImageUrlByUserId();
    this.getAllTipoAbogado();
  }

  obtaintUserInfo(){
    const role = localStorage.getItem('role');
    const userName = localStorage.getItem('username')!;
    if (role === 'JEFE' ) {
      this.userService.obtenerInformacionJefe(userName).subscribe(
        (data: UserProcesess) => {
          this.usuario = data;
          this.usuarioName = this.usuario.nombres;
          localStorage.setItem('userId',this.usuario.id.toString());
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    } else {
      this.userService.getAbogado(userName).subscribe(
        (data: UserProcesess) => {
          this.usuario = data;
          this.usuarioName = this.usuario.nombres;
          localStorage.setItem('userId',this.usuario.id.toString());
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }
  }

  updateProfile() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas actualizar tu perfil?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar perfil',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
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
    });
}

getImageUrlByUserId(): void {
  const userId = localStorage.getItem('userId');
  if (userId) {
    const userIdNumber = parseInt(userId);
    this.storageService.descargarFoto(userIdNumber).subscribe((photo: Blob) => {
      this.imageUrl = URL.createObjectURL(photo);
    });
  }
}

getAllTipoAbogado(): void {
  this.userService.getAllTipoAbogado().subscribe((tipos: Speciality[]) => {
    this.listaEspecialidades = tipos;
  });
}

  goBack() {
    this.dialogRef.close();
  }
}
