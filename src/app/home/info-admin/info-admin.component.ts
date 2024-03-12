import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserProcesess } from '../../shared/model/user/user.procesos';
import { StorageService } from '../../services/storage.service';
import { Speciality } from '../../shared/model/user/speciality';
import Swal from 'sweetalert2';
import { UtilService } from '../../services/util.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.component.html',
  styleUrls: ['./info-admin.component.css'],
})
export class InfoAdminComponent implements OnInit {
  usuario: UserProcesess = {} as UserProcesess;
  usuarioName: string = '';
  imageUrl: string = '';
  listaEspecialidades: Speciality[] = [];
  selectedSpecialty: string = '';
  rol: string = '';
  userId: string= '';

  constructor(
    private dialogRef: MatDialogRef<InfoAdminComponent>,
    private userService: UserService,
    private storageService: StorageService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rol = localStorage.getItem('role') || '';
    const userId = localStorage.getItem('userId');
    this.obtaintUserInfo();
    this.getAllTipoAbogado();
  }
  

  obtaintUserInfo() {
    const userName = localStorage.getItem('username')!;
    this.userService.obtenerInformacionJefe(userName).subscribe(
      (data: UserProcesess) => {
        this.usuario = data;
        this.usuarioName = this.usuario.nombres;
        console.log(this.usuario.telefono);
        localStorage.setItem('userId', this.usuario.id.toString());
        this.getImageUrlByUserId(this.userId);
      },
      (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
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
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.areCorrectFields()){
          this.updateUser();
        }
      }
    });
  }
  updateUser() {
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
          Swal.fire({
            icon: 'success',
            iconColor: '#AA2535',
            title: 'Usuario actualizado',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#AA2535',
            didClose: () => {
              window.location.reload();
            },
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar la información usuario',
            text: 'No se pudo actualizar la información, por favor intente más tarde',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#AA2535',
          })
        }
      );
  }
  areCorrectFields(): boolean {
    let dict: { [key: string]: string } = {};
    //Name validation
    if (this.usuario.nombres === '') {
      dict['Nombre'] = 'El nombre no puede estar vacío';
    }
    //Email validation
    if (this.usuario.correo === '') {
      dict['Correo'] = 'El correo es requerido';
    }
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!expression.test(this.usuario.correo)) {
      dict['Correo electronico'] = 'No es un correo valido';
    }
    //Phone validation
    if (this.usuario.telefono.toString() === '') {
      dict['Teléfono'] = 'El teléfono es requerido';
    }
    if (!/^\d+$/.test(this.usuario.telefono.toString())) {
      dict['Telefono'] = 'Solo debe contener numeros';
    }
    if (this.usuario.identificacion.toString() === '') {
      dict['Identificación'] = 'La identificación es requerida';
    }

    if (Object.keys(dict).length !== 0) {
      this.utilService.raiseInvalidFields(dict);
      return false;
    } else {
      return true;
    }
  }

  getImageUrlByUserId(userId: string | null): void {
    if (userId) {
      const userIdNumber = parseInt(userId);
      this.storageService
        .descargarFoto(userIdNumber)
        .subscribe((photo: Blob) => {
          if (photo.size > 0) {
            this.imageUrl = URL.createObjectURL(photo);
          } else {
            // Si la foto está vacía, asignar la imagen por defecto
            this.imageUrl = 'assets/defaultProfile.png';
          }
        });
    } else {
      // Si no hay userId, asignar la imagen por defecto
      this.imageUrl = 'assets/defaultProfile.png';
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
