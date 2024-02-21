import { Component } from '@angular/core';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrl: './create-process.component.css'
})
export class CreateProcessComponent {
  nRadicado: string = 'Valor para nRadicado';
  despacho: string = 'Valor para despacho';
  typeProcess: string = 'Valor para typeProcess';
  dateFiling: string = 'Valor para dateFiling';

  listaItems: string[] = [
    'BBVA SEGUROS DE VIDA COLOMBIA S.A.',
    'DIEGO ALFONSO REYES MURCIA',
    'DIEGO ALFONSO REYES MURCIA'
  ];

  opciones: { valor: string, texto: string }[] = [
    { valor: '', texto: 'Seleccionar' },
    { valor: 'opcion1', texto: 'Opción 1' },
    { valor: 'opcion2', texto: 'Opción 2' },
    { valor: 'opcion3', texto: 'Opción 3' },
    { valor: 'opcion4', texto: 'Opción 4' }
  ];


  crearProceso() {
    console.log('Se ha hecho clic en el botón "Crear Proceso"');
  }

}
