import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TipoDocumento } from '../../../shared/model/doc.tipo';
import { TipoAbogado } from '../../../shared/model/user/user.tipo';
import { HttpErrorResponse } from '@angular/common/http';
import { MensajeResponse } from '../../../shared/model/message';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { last } from 'rxjs';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-lawyer',
  templateUrl: './register-lawyer.component.html',
  styleUrl: './register-lawyer.component.css',
})
export class RegisterLawyerComponent {
  nombreUsuario: string = '';
  nombreCompleto: string = '';
  correoElectronico: string = '';
  identificacion: string = '';
  telefono: string = '';
  imageUrlPresentation: File | null = null;
  selectedImage: File | null = null;
  selectedTypeDoc: TipoDocumento | null = null;
  selectedSpecialization: TipoAbogado | null = null;

  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  opcionesIdentification: { valor: TipoDocumento | null; texto: string }[] = [];
  opcionesSpecialty: { valor: TipoAbogado | null; texto: string }[] = [];

  ngOnInit() {
    this.obtaintTypeOfDoc();
    this.obtainLaywersInfo();
  }
  obtaintTypeOfDoc() {
    this.userService.getAllTipoDocumento().subscribe(
      (typeDoc: TipoDocumento[]) => {
        this.opcionesIdentification.push({ valor: null, texto: 'Seleccionar' });
        typeDoc.forEach((tipoDocumento) => {
          this.opcionesIdentification.push({
            valor: tipoDocumento,
            texto: tipoDocumento.nombre,
          });
        });
        console.log(this.opcionesIdentification);
      },
      (error) => {
        console.error('Error al obtener tipos de documento:', error);
      }
    );
  }
  obtainLaywersInfo() {
    this.userService.getAllTipoAbogado().subscribe(
      (typeDoc: TipoAbogado[]) => {
        this.opcionesSpecialty.push({ valor: null, texto: 'Seleccionar' });
        typeDoc.forEach((tipoAbogado) => {
          this.opcionesSpecialty.push({
            valor: tipoAbogado,
            texto: tipoAbogado.nombre,
          });
        });
      },
      (error) => {
        console.error('Error al obtener tipos de abogado:', error);
      }
    );
  }
  uploadLawyerPhoto(lawyerId: number) {
    this.storageService.subirFoto(lawyerId, this.selectedImage!).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          iconColor: '#AA2535',
          title: 'Error',
          confirmButtonColor: '#AA2535',
          confirmButtonText: 'Okay',
          text: 'Hubo un error al cargar la imagen del abogado.',
        });
      }
    );
  }
  crearAbogadoBusiness() {
    this.userService
      .agregarAbogado(
        this.nombreCompleto,
        this.correoElectronico,
        parseInt(this.telefono),
        parseInt(this.identificacion),
        this.nombreUsuario,
        this.selectedTypeDoc!,
        [this.selectedSpecialization!],
        parseInt(localStorage.getItem('firmaId')!)
      )
      .subscribe(
        (response: MensajeResponse) => {
          if (this.selectedImage !== null) {
            this.uploadLawyerPhoto(response.value);
          }
          Swal.close();
          Swal.fire({
            icon: 'success',
            iconColor: '#AA2535',
            title: 'Abogado creado',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#AA2535',
            didClose: () => {
              this.router.navigate(['/listlawyer']);
            }
          
          });
        },
        (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            iconColor: '#AA2535',
            title: 'Error',
            confirmButtonColor: '#AA2535',
            confirmButtonText: 'Okay',
            text: 'Hubo un error en la creación del abogado.',
          });
        }
      );
  }
  crearAbogadoAuth() {
    this.authService
      .createAbogado(
        this.correoElectronico,
        this.nombreCompleto,
        parseInt(this.telefono),
        parseInt(this.identificacion),
        this.selectedTypeDoc!,
        [this.selectedSpecialization!],
        this.nombreUsuario,
        parseInt(localStorage.getItem('firmaId')!)
      )
      .subscribe(
        (data) => {
          this.crearAbogadoBusiness();
        },
        (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            iconColor: '#AA2535',
            title: 'Error',
            confirmButtonColor: '#AA2535',
            confirmButtonText: 'Okay',
            text: 'Hubo un error en la creación del abogado.',
          });
        }
      );
  }
  crearAbogado() {
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas crear este abogado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear abogado',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .validarAgregarAbogado(
            this.nombreUsuario,
            this.correoElectronico,
            parseInt(this.telefono),
            parseInt(this.identificacion),
            this.nombreUsuario,
            this.selectedTypeDoc!,
            [this.selectedSpecialization!],
            parseInt(localStorage.getItem('firmaId')!)
          )
          .subscribe(
            (response: MensajeResponse) => {
               Swal.fire({
                title: 'Cargando información del abogado..',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                  const container = Swal.getHtmlContainer();
                  if (container) {
                    const loader = container.querySelector('.swal2-loader');
                    if (loader instanceof HTMLElement) {
                      loader.style.color = '#AA2535'; 
                    }
                  }
                }
              });
              this.crearAbogadoAuth();
              
            },
            (error: HttpErrorResponse) => {
              if (error.status === 409) {
                Swal.fire({
                  icon: 'error',
                  iconColor: '#AA2535',
                  title: 'Error',
                  confirmButtonColor: '#AA2535',
                  confirmButtonText: 'Okay',
                  text: 'El abogado no puede ser ingresado porque la identificación, el nombre de usuario o el correo ya se encuentra registrado con otro abogado.',
                });
              }
            }
          );
      }
    });
  }
  onSpecializationChange($event: any) {}
  onTypeDocChange($event: any) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
       this.imageUrlPresentation = e.target.result;
      };
      this.selectedImage = file;
      reader.readAsDataURL(file);
      
    }
  }
}
