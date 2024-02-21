import { Component } from '@angular/core';

@Component({
  selector: 'app-register-lawyer',
  templateUrl: './register-lawyer.component.html',
  styleUrl: './register-lawyer.component.css'
})
export class RegisterLawyerComponent {
  nombreUsuario: string = '';
  nombreCompleto: string = '';
  correoElectronico: string = '';
  identificacion: string = '';
  telefono: string = '';

  opcionesIdentification: { valor: string, texto: string }[] = [
    { valor: '', texto: 'Seleccionar' },
    { valor: 'opcion1', texto: 'Opción 1' },
    { valor: 'opcion2', texto: 'Opción 2' },
    { valor: 'opcion3', texto: 'Opción 3' },
    { valor: 'opcion4', texto: 'Opción 4' }
  ];
  opcionesSpecialty: { valor: string, texto: string }[] = [
    { valor: '', texto: 'Seleccionar' },
    { valor: 'opcion1', texto: 'Opción 1' },
    { valor: 'opcion2', texto: 'Opción 2' },
    { valor: 'opcion3', texto: 'Opción 3' },
    { valor: 'opcion4', texto: 'Opción 4' }
  ];

  crearAbogado(){

  }
  cargarFoto(){
    
  }

}
