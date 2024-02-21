import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-process-admin',
  templateUrl: './info-process-admin.component.html',
  styleUrl: './info-process-admin.component.css'
})
export class InfoProcessAdminComponent {
  nRadicado: string = 'Valor para nRadicado';
  
  dataSource: MatTableDataSource<any>;
  columnNames: string[] = ['Radicado', 'Despacho','Tipo', 'Fecha'];
  displayedColumns: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router) {
    this.dataSource = new MatTableDataSource([
      {Radicado: 'Texto 1', Despacho: 'Texto 2', Tipo: 'Texto 3', Fecha: 'Texto 4'},
      {Radicado: 'Texto 1', Despacho: 'Texto 2', Tipo: 'Texto 3', Fecha: 'Texto 4'},
      {Radicado: 'Texto 1', Despacho: 'Texto 2', Tipo: 'Texto 3', Fecha: 'Texto 4'},
      {Radicado: 'Texto 1', Despacho: 'Texto 2', Tipo: 'Texto 3', Fecha: 'Texto 4'},
      {Radicado: 'Texto 1', Despacho: 'Texto 2', Tipo: 'Texto 3', Fecha: 'Texto 4'},
      {Radicado: 'Texto 1', Despacho: 'Texto 2', Tipo: 'Texto 3', Fecha: 'Texto 4'},
      // Agrega más filas según sea necesario
    ]);
  }

  listaItems: string[] = [
    'BBVA SEGUROS DE VIDA COLOMBIA S.A.',
    'DIEGO ALFONSO REYES MURCIA',
    'DIEGO ALFONSO REYES MURCIA'
  ];

  opcionesLawyer: { valor: string, texto: string }[] = [
    { valor: '', texto: 'Seleccionar' },
    { valor: 'opcion1', texto: 'Opción 1' },
    { valor: 'opcion2', texto: 'Opción 2' },
    { valor: 'opcion3', texto: 'Opción 3' },
    { valor: 'opcion4', texto: 'Opción 4' }
  ];
  opcionesState: { valor: string, texto: string }[] = [
    { valor: '', texto: 'Seleccionar' },
    { valor: 'opcion1', texto: 'Opción 1' },
    { valor: 'opcion2', texto: 'Opción 2' },
    { valor: 'opcion3', texto: 'Opción 3' },
    { valor: 'opcion4', texto: 'Opción 4' }
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.changeDetectorRefs.detectChanges();
  }

  redirectToOtherComponent(row: any) {
    console.log('Redireccionando a otro componente:', row);
    this.router.navigate(['/infoaction/:1']);
  }

  crearProceso(){

  }

}

