import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { ProcesoLawyerFilter } from '../../../shared/model/process/process.abogado.filter';
import { Pageable } from '../../../shared/model/pageable';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-list-process-lawyer',
  templateUrl: './list-process-lawyer.component.html',
  styleUrls: ['./list-process-lawyer.component.css'],
})
export class ListProcessLawyerComponent {
  processSearch: string = '';

  dataSource: MatTableDataSource<ProcesoLawyerFilter>;
  columnNames: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];
  displayedColumns: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];
  selectedOption: any; // Aquí almacenarás la opción seleccionada
  options = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' }
  ];

  processFilter: { valor: any; texto: string; checked: boolean }[] = [
    { valor: 'A', texto: 'Proceso A', checked: false },
    { valor: 'B', texto: 'Proceso B', checked: false },
    { valor: 'A', texto: 'Proceso A', checked: false },
    { valor: 'B', texto: 'Proceso B', checked: false },
  ];
  mostrarDiv: boolean = false;
  selectedDate: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private processService: ProcessService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.selectedDate = new Date();
    this.dataSource = new MatTableDataSource<ProcesoLawyerFilter>([]);
  }

  ngAfterViewInit() {
    this.fetchData();
  }
  redirectToOtherComponent(row: any) {
    const queryParams = { processId: row.id.toString() };
    localStorage.setItem('selectedIdProcessLawyer', row.id.toString());
    this.router.navigate(['/infoprocesslawyer'], { queryParams: queryParams });
  }
  fetchData() {
    const fechaInicioStr = '';
    const fechaFinStr = '';
    const estadosProceso: string[] = [];
    const tipoProceso = '';
    const lawyerId = parseInt(localStorage.getItem('lawyerId')!);
    const page = this.pageIndex;

    this.processService
      .getProcesosByAbogadoFilter(
        fechaInicioStr,
        lawyerId,
        fechaFinStr,
        estadosProceso,
        tipoProceso,
        page,
        this.pageSize
      )
      .subscribe(
        (data: Pageable<ProcesoLawyerFilter>) => {
          this.dataSource.data = data.data;
          this.totalItems = data.totalItems;
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
  onCheckboxChange(
    opcion: { valor: any; texto: string; checked: boolean },
    filterType: string
  ): void {
    // Maneja el cambio de checkbox aquí
    console.log(
      `Opción ${opcion.texto} del filtro ${filterType} seleccionada: ${opcion.checked}`
    );
  }
  toggleDiv() {
    this.mostrarDiv = !this.mostrarDiv;
  }
}
