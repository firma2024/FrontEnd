import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-info-process-lawyer',
  templateUrl: './info-process-lawyer.component.html',
  styleUrl: './info-process-lawyer.component.css'
})
export class InfoProcessLawyerComponent {
  despacho: string = 'Valor del despacho';
  date: string = 'Valor de la fecha';
  nRadicado: string = 'Valor del radicado';
  typeProcess: string = 'Valor del tipo de proceso';

  id: string | null = null; // Inicializa id como string o null

  ngOnInit(): void {
  
  }

  listaItems: string[] = [
    'BBVA SEGUROS DE VIDA COLOMBIA S.A.',
    'DIEGO ALFONSO REYES MURCIA',
    'DIEGO ALFONSO REYES MURCIA'
  ];
  listAudience: string[] = [
    'Primera audiencia',
    'Segunda audiencia'
  ];
  dataSource = new MatTableDataSource<any>(); // Puedes reemplazar 'any' con el tipo de datos adecuado
  totalItems: number = 0;
  pageSize: number = 10; // Puedes ajustar el tamaño de página según tus necesidades

  documentImageUrl: string = 'url_de_la_imagen'; // Debes proporcionar la URL correcta aquí

  constructor() {
    // Aquí debes cargar los datos en dataSource, por ejemplo:
    this.loadData();
  }

  loadData() {
    // Lógica para cargar los datos en la tabla, por ejemplo, desde una API
    // Aquí podrías hacer algo como:
    // this.myDataService.getData().subscribe(data => this.dataSource.data = data);
  }

  onPageChange(event: any) {
    // Lógica para manejar el cambio de página, por ejemplo, cargar datos para la página seleccionada
  }
}
