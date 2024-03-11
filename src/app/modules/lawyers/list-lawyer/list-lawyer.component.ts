import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { Pageable } from '../../../shared/model/pageable';
import Swal from 'sweetalert2';
import { MensajeResponse } from '../../../shared/model/message';
import { HttpErrorResponse } from '@angular/common/http';

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
  especialidadFilter: { valor: any; texto: string; checked: boolean }[] = [
    { valor: 1, texto: 'Especialidad 1', checked: false },
    { valor: 2, texto: 'Especialidad 2', checked: false },
    { valor: 1, texto: 'Especialidad 1', checked: false },
    { valor: 2, texto: 'Especialidad 2', checked: false },
  ];
  
  processFilter: { valor: any; texto: string; checked: boolean }[] = [
    { valor: 'A', texto: 'Proceso A', checked: false },
    { valor: 'B', texto: 'Proceso B', checked: false },
    { valor: 'A', texto: 'Proceso A', checked: false },
    { valor: 'B', texto: 'Proceso B', checked: false },
  ];
  mostrarDiv: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 7;
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
    const fechaInicioStr = ''; // Cambiado a número
    const fechaFinStr = ''; // Cambiado a número
    const especialidades: string[] = [];
    const page = this.pageIndex;

    this.userService
      .getAbogadosFilter(
        firmaId,
        especialidades,
        fechaFinStr,
        fechaInicioStr,
        page,
        this.pageSize
      )
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    // Aplicar el filtro solo a la columna 'nombres'
    this.dataSource.filter = filterValue;
  }

  deleteUser(row: UserProcesess) {
    event!.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este abogado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#AA2535',
      cancelButtonColor: '#AA2535',
      iconColor: '#AA2535',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(row.id).subscribe(
          (message) => {
            console.log('Usuario eliminado:', message);
            this.fetchData();
          },
          (error:HttpErrorResponse) => {
            console.log(error)
           Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el usuario',
              text: error.error.message,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#AA2535',
           })
          }
        );
      }
    });
  }

  redirectToOtherComponent(row: UserProcesess) {
    localStorage.setItem('selectedIdLawyer', row.id.toString());
    localStorage.setItem('selectedLawyer', JSON.stringify(row));
    this.router.navigate(['/infolawyer']);
  }

  onCheckboxChange(opcion: { valor: any; texto: string; checked: boolean }, filterType: string): void {
    // Maneja el cambio de checkbox aquí
    console.log(`Opción ${opcion.texto} del filtro ${filterType} seleccionada: ${opcion.checked}`);
  }
  toggleDiv() {
    this.mostrarDiv = !this.mostrarDiv;
  }
  
}
