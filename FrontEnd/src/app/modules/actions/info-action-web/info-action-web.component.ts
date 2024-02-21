import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-action-web',
  templateUrl: './info-action-web.component.html',
  styleUrl: './info-action-web.component.css'
})
export class InfoActionWebComponent  implements OnInit {
  despacho: string = 'Valor del despacho';
  date: string = 'Valor de la fecha';
  annotation: string = 'Valor de la anotación';
  typeProcess: string = 'Valor del tipo de proceso';
  action: string = 'Valor de la acción';
  dateRegister: string = 'Valor de la fecha de registro';
  
  id: string | null = null; // Inicializa id como string o null

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el ID de la ruta
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    // Verificar si el ID está presente
    if (idFromRoute !== null) {
      this.id = idFromRoute; // Asigna el ID si no es null
      console.log('ID recibido en la ruta:', this.id);
    } else {
      console.error('No se encontró el ID en la ruta.');
    }
  }
  listaItems: string[] = [
    'BBVA SEGUROS DE VIDA COLOMBIA S.A.',
    'DIEGO ALFONSO REYES MURCIA',
    'DIEGO ALFONSO REYES MURCIA'
  ];


}
