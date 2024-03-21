import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { UserProcesess } from '../../shared/model/user/user.procesos';
import { StorageService } from '../../services/storage.service';
import { Speciality } from '../../shared/model/user/speciality';
import { TipoAbogado } from '../../shared/model/user/user.tipo';
import Swal from 'sweetalert2';
import { UtilService } from '../../services/util.service';
import { Route, Router } from '@angular/router';
import { UserRequest } from '../../shared/model/user/user.req';
import { UserAbogadoUpdate } from '../../shared/model/user/user.abogado.update';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css'],
})
export class InfoUserComponent implements OnInit {
  usuario: UserProcesess = {} as UserProcesess;
  usuarioName: string = '';
  imageUrl: string = 'assets/defaultProfile.png';
  listaEspecialidades: Speciality[] = [];
  selectedSpecialty: string = '';
  rol: string = '';
  userId: string = '';
  typeSpeciality: {
    valor: TipoAbogado;
    texto: string;
    checked: boolean;
  }[] = [];

  constructor(
    private dialogRef: MatDialogRef<InfoUserComponent>,
    private userService: UserService,
    private storageService: StorageService,
    private utilService: UtilService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rol = localStorage.getItem('role') || '';
    const userId = localStorage.getItem('userId');
    this.obtainLaywersInfo();
    this.obtaintUserInfo();
    this.getImageUrlByUserId(userId);
    this.getAllTipoAbogado();
    
  }

  obtaintUserInfo() {
    const userName = localStorage.getItem('username')!;
    this.userService.getAbogado(userName).subscribe(
      (data: UserProcesess) => {
        this.usuario = data;
        const palabras = this.usuario.nombres.split(' ');
        if (palabras.length > 2) {
          this.usuarioName = palabras.slice(0, 2).join(' ');
        } else {
          this.usuarioName = this.usuario.nombres;
        }
        console.log(this.usuario.telefono);
        localStorage.setItem('userId', this.usuario.id.toString());
        this.usuario.especialidades.forEach((especialidad) => {
          this.typeSpeciality.forEach((speciality) => {
            if (speciality.valor.nombre === especialidad.nombre) {
              speciality.checked = true;
            }
          });
        });
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }
  obtainLaywersInfo() {
    this.userService.getAllTipoAbogado().subscribe(
      (typeDoc: TipoAbogado[]) => {
        typeDoc.forEach((tipoAbogado) => {
          this.typeSpeciality.push({
            valor: tipoAbogado,
            texto: tipoAbogado.nombre,
            checked: false,
          });
        });
      },
      (error) => {
        console.error('Error al obtener tipos de abogado:', error);
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
        if (this.areCorrectFields()) {
          this.updateUser();
        }
      }
    });
  }
  updateUser() {
    let userReq: UserAbogadoUpdate = {
      id: this.usuario.id,
      nombres: this.usuario.nombres,
      correo: this.usuario.correo,
      telefono: this.usuario.telefono.toString(),
      identificacion: this.usuario.identificacion.toString(),
      especialidades: [],
    };
    this.typeSpeciality.forEach((filter) => {
      if (filter.checked) {
        userReq.especialidades.push(filter.valor);
      }
    });
    console.log(userReq);
    this.userService.actualizarInfoAbogado(userReq).subscribe(
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
        });
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
    if (userId !== null) {
      this.storageService
        .descargarFoto(parseInt(userId))
        .subscribe((photo: Blob) => {
          this.imageUrl = URL.createObjectURL(photo);
        });
    }
  }
  onCheckboxChange(
    opcion: { valor: any; texto: string; checked: boolean },
    filterType: string
  ): void {
    opcion.checked = !opcion.checked;
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
