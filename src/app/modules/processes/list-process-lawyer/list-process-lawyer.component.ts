import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { ProcesoLawyerFilter } from '../../../shared/model/process/process.abogado.filter';
import { Pageable } from '../../../shared/model/pageable';

@Component({
  selector: 'app-list-process-lawyer',
  templateUrl: './list-process-lawyer.component.html',
  styleUrls: ['./list-process-lawyer.component.css']
})
export class ListProcessLawyerComponent {

  processSearch: string = ''; 

  dataSource: MatTableDataSource<ProcesoLawyerFilter>;
  columnNames: string[] = ['Radicado', 'Despacho','Tipo', 'Fecha'];
  displayedColumns: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private processService: ProcessService
  ) {
    this.dataSource = new MatTableDataSource<ProcesoLawyerFilter>([]);
  }

  ngAfterViewInit() {
    this.fetchData(); // Cargar datos al iniciar la vista
  }

  // Función para redirigir a otro componente al hacer clic en una fila
  redirectToOtherComponent(row: any) {
    console.log('Redireccionando a otro componente:', row);
    this.router.navigate(['/infolawyer']);
  }

  // Función para cargar datos con paginación
  fetchData() {
    const fechaInicioStr = '';
    const fechaFinStr = '';
    const estadosProceso: string[] = [];
    const tipoProceso = '';
    const lawyerId = parseInt(localStorage.getItem("lawyerId")!);
    const page = this.pageIndex; 

    this.processService.getProcesosByAbogadoFilter(
      fechaInicioStr,
      lawyerId,
      fechaFinStr,
      estadosProceso,
      tipoProceso,
      page,
      this.pageSize
    ).subscribe(
      (data: Pageable<ProcesoLawyerFilter>) => {
        this.dataSource.data = data.data;
        this.totalItems = data.totalItems; // Actualizamos totalItems con el valor devuelto por el servicio
        console.log(data.data);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  // Función para manejar el cambio de página
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData(); // Recargar datos con la paginación actualizada
  }
}