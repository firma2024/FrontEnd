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
  selectedTypeDoc: string = '';
  selectedSpecialization: string = '';
  constructor(private userService: UserService) {}
  opcionesIdentification: { valor: string; texto: string }[] = [
    { valor: '', texto: 'Seleccionar' },
  ];
  opcionesSpecialty: { valor: string; texto: string }[] = [
    { valor: '', texto: 'Seleccionar' },
  ];
  ngOnInit() {
    this.obtaintTypeOfDoc()
    this.obtainLaywersInfo()
  }
  obtaintTypeOfDoc(){
    this.userService.getAllTipoDocumento().subscribe(
      (typeDoc: TipoDocumento[]) => {
        typeDoc.forEach((tipoDocumento) => {
          this.opcionesIdentification.push({
            valor: tipoDocumento.nombre,
            texto: tipoDocumento.nombre,
          });
        });
      },
      (error) => {
        console.error('Error al obtener tipos de documento:', error);
      }
    );
  }
  obtainLaywersInfo(){
    this.userService.getAllTipoAbogado().subscribe(
      (typeDoc: TipoAbogado[]) => {
        typeDoc.forEach((tipoAbogado) => {
          this.opcionesSpecialty.push({
            valor: tipoAbogado.nombre,
            texto: tipoAbogado.nombre,
          });
        });
      },
      (error) => {
        console.error('Error al obtener tipos de documento:', error);
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
      this.selectedTypeDoc,
      [this.selectedSpecialization],
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
  cargarFoto() {}
}
