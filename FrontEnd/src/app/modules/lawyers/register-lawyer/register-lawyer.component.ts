import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TipoDocumento } from '../../../shared/model/doc.tipo';
import { TipoAbogado } from '../../../shared/model/user/user.tipo';

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
  imageUrl:string | null = null;


  selectedTypeDoc: TipoDocumento | null = null;
  selectedSpecialization: TipoAbogado | null = null;
  constructor(private userService: UserService) {}

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
  crearAbogado() {
    this.userService.agregarAbogado(
      this.nombreUsuario,
      this.correoElectronico,
      parseInt(this.telefono),
      parseInt(this.identificacion),
      this.nombreUsuario,
      this.selectedTypeDoc!,
      [this.selectedSpecialization!],
      parseInt(localStorage.getItem('firmaId')!)
    ).subscribe(
      (response) => {
        console.log('Abogado agregado correctamente:', response);
      },
      (error) => {
        console.error('Error al agregar el abogado:', error);
      }
    );
  }

  onSpecializationChange($event: any) {}
  onTypeDocChange($event: any) {}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
