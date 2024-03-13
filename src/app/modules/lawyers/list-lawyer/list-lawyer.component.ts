import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { Pageable } from '../../../shared/model/pageable';
import Swal from 'sweetalert2';
import { MensajeResponse } from '../../../shared/model/message';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { TipoAbogado } from '../../../shared/model/user/user.tipo';

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
  especialidadFilter: { valor: any; texto: string; checked: boolean }[] = [];

  processCountFilter: { valor: any; texto: string; checked: boolean }[] = [
    { valor: [0, 5], texto: 'Menos de 5', checked: false },
    { valor: [5, 10], texto: 'Entre 5 y 10', checked: false },
    { valor: [10, 15], texto: 'Entre 10 y 15', checked: false },
    { valor: [15, 1000], texto: 'Mas de 15', checked: false },
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

  ngOnInit() {
    this.loadFilterParams();
    this.applyFilters();
  }
  loadFilterParams() {
    this.userService.getAllTipoAbogado().subscribe((data:TipoAbogado[])=>{
      this.especialidadFilter = data.map((especialidad) => {
        return { valor: especialidad.nombre, texto: especialidad.nombre, checked: false };
      });
    })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }

  applyFilterName(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }
  applyFilters() {
    let params = new HttpParams()
      .set('page', this.pageIndex.toString())
      .set('size', this.pageSize.toString())
      .set('firmaId', parseInt(localStorage.getItem('firmaId')!));
    const specSelected = this.especialidadFilter.filter(
      (filter) => filter.checked
    );
    if (specSelected.length > 0) {
      for (let spec of specSelected) {
        params = params.append('especialidades', spec.valor);
      }
    }
    const processCountSelected = this.processCountFilter.filter(
      (filter) => filter.checked
    );
    if (processCountSelected.length > 0) {
      for (let processCount of processCountSelected) {
        params = params.append('numProcesosInicial', processCount.valor[0]);
        params = params.append('numProcesosFinal', processCount.valor[1]);
      }
    }
    this.userService
      .getAbogadosFilter(
        params
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
            this.applyFilters();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el usuario',
              text: error.error.message,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#AA2535',
            });
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

  onCheckboxChangeCountProcess(
    opcion: { valor: any; texto: string; checked: boolean },
    filterType: string
  ): void {
    if (filterType === 'processCountFilter') {
      this.processCountFilter.forEach((filter) => {
        if (filter.texto !== opcion.texto) {
          filter.checked = false;
        }
      });
    }
    opcion.checked = !opcion.checked;
  }
  onCheckboxChangeSpeciality(
    opcion: { valor: any; texto: string; checked: boolean },
    filterType: string
  ): void {
    opcion.checked = !opcion.checked;
  }
  toggleDiv() {
    this.mostrarDiv = !this.mostrarDiv;
  }
}
