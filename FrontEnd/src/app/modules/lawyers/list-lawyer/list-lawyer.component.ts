import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-lawyer',
  templateUrl: './list-lawyer.component.html',
  styleUrl: './list-lawyer.component.css'
})
export class ListLawyerComponent {
  dataSource = new MatTableDataSource<any>(/* Aquí irían tus datos */);
  columns = ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4', 'Columna 5', 'Columna 6'];
  displayedColumns = ['photo', ...this.columns, 'action'];

  redirectToOtherComponent(element: any) {
    // Lógica para redirigir a otro componente
  }

}
