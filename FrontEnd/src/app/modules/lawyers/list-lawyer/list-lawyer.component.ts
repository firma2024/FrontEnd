import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-list-lawyer',
  templateUrl: './list-lawyer.component.html',
  styleUrls: ['./list-lawyer.component.css']
})
export class ListLawyerComponent {
  dataSource: MatTableDataSource<any>;
  columnNames: string[] = ['Nombre', 'Correo', 'Telefono', 'Especialidad', 'Procesos'];
  displayedColumns: string[] = ['photo', 'Nombre', 'Correo', 'Telefono', 'Especialidad', 'Procesos', 'button'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource([
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', Nombre: 'Texto 1', Correo: 'Texto 2', Telefono: 'Texto 3', Especialidad: 'Texto 4', Procesos: 'paez', buttonText: 'Botón' },
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
  }
}
