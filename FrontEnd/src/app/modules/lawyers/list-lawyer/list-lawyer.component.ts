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
  displayedColumns: string[] = ['photo', 'text1', 'text2', 'text3', 'text4', 'button'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource([
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
      { photo: '/assets/jpaez.jpg', text1: 'Texto 1', text2: 'Texto 2', text3: 'Texto 3', text4: 'Texto 4', buttonText: 'Botón' },
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
