import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-process-admin',
  templateUrl: './list-process-admin.component.html',
  styleUrl: './list-process-admin.component.css'
})
export class ListProcessAdminComponent {
  dataSource: MatTableDataSource<any>;
  columnNames: string[] = ['Radicado', 'Abogado', 'Despacho', 'Tipo', 'Fecha', 'Estado'];
  displayedColumns: string[] = ['Radicado', 'Abogado', 'Despacho', 'Tipo', 'Fecha' , 'Estado'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router) {
    this.dataSource = new MatTableDataSource([
      {Radicado: 'Texto 1', Abogado: 'Texto 2', Despacho: 'Texto 3', Tipo: 'Texto 4', Fecha: 'paez', Estado: 'actuaciones si revisar' },
      {Radicado: 'Texto 1', Abogado: 'Texto 2', Despacho: 'Texto 3', Tipo: 'Texto 4', Fecha: 'paez', Estado: 'actuaciones si revisar' },
      {Radicado: 'Texto 1', Abogado: 'Texto 2', Despacho: 'Texto 3', Tipo: 'Texto 4', Fecha: 'paez', Estado: 'actuaciones si revisar' },
      {Radicado: 'Texto 1', Abogado: 'Texto 2', Despacho: 'Texto 3', Tipo: 'Texto 4', Fecha: 'paez', Estado: 'actuaciones si revisar' },
      {Radicado: 'Texto 1', Abogado: 'Texto 2', Despacho: 'Texto 3', Tipo: 'Texto 4', Fecha: 'paez', Estado: 'actuaciones si revisar' },
      {Radicado: 'Texto 1', Abogado: 'Texto 2', Despacho: 'Texto 3', Tipo: 'Texto 4', Fecha: 'paez', Estado: 'actuaciones si revisar' },
      {Radicado: 'Texto 1', Abogado: 'Texto 2', Despacho: 'Texto 3', Tipo: 'Texto 4', Fecha: 'paez', Estado: 'actuaciones si revisar' },
      

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
    this.router.navigate(['/infoprocessadmin']);
  }

}
