import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { Pageable } from '../../../shared/model/pageable';

@Component({
  selector: 'app-list-lawyer',
  templateUrl: './list-lawyer.component.html',
  styleUrls: ['./list-lawyer.component.css'],
})
export class ListLawyerComponent {
  dataSource: MatTableDataSource<UserProcesess>;
  columnNames: string[] = [
    'nombres',
    'correo',
    'telefono',
    'especialidades',
    'procesos',
    'button',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private userService: UserService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<UserProcesess>([]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchData();
    });
  }

  fetchData() {
    const firmaId = parseInt(localStorage.getItem('firmaId')!);
    const fechaInicioStr = ""; // Cambiado a número
    const fechaFinStr = ""; // Cambiado a número
    const especialidades: string[] = [];
    const page = this.pageIndex;
  

    this.userService
      .getAbogadosFilter(
        firmaId,
        especialidades, 
        fechaFinStr,
        fechaInicioStr, 
        page,
        this.pageSize)
      .subscribe(
        (data: Pageable<UserProcesess>) => {
          this.dataSource.data = data.data;
          this.totalItems = data.totalItems;
          console.log(data.data);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  // Método para aplicar el filtro en tiempo real
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    // Aplicar el filtro solo a la columna 'nombres'
    this.dataSource.filter = filterValue;
  }

  deleteUser(row: UserProcesess) {
    event!.stopPropagation();
    this.userService.deleteUser(row.id).subscribe(
      (message) => {
        alert(message);
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
  
  redirectToOtherComponent(row: UserProcesess) {
    localStorage.setItem('selectedIdLawyer', row.id.toString());
    localStorage.setItem('selectedLawyer', JSON.stringify(row));
    this.router.navigate(['/infolawyer']);
  }
}
