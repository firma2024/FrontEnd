import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-lawyer',
  templateUrl: './info-lawyer.component.html',
  styleUrl: './info-lawyer.component.css'
})
export class InfoLawyerComponent {
  name: string = 'Valor del nombre';
  mail: string = 'Valor del correo electrónico';
  numberPhone: string = 'Valor del número de teléfono';
  identification: string = 'Valor de la identificación';
  speciality: string = 'Valor de la especialidad';
  
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.changeDetectorRefs.detectChanges();
  }

  // Función para redirigir a otro componente al hacer clic en una fila
  redirectToOtherComponent(row: any) {
    // Implementa la lógica para la redirección aquí
    console.log('Redireccionando a otro componente:', row);
    this.router.navigate(['/infolawyer']);
  }

}
