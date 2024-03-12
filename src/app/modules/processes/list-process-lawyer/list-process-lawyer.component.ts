import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { ProcesoLawyerFilter } from '../../../shared/model/process/process.abogado.filter';
import { Pageable } from '../../../shared/model/pageable';
import { DateAdapter } from '@angular/material/core';
import { ProcesoStatus } from '../../../shared/model/process/proceso.estado';
import { ProcesoType } from '../../../shared/model/process/proceso.tipo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
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
  selectedProcessType: { valor: ProcesoType | null; texto: string } | undefined;
  processTypeFilter: { valor: ProcesoType | null; texto: string }[] = [
    { valor: null, texto: 'Seleccionar' },
  ];

  processStatusFilter: { valor: any; texto: string; checked: boolean }[] = [];
  mostrarDiv: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  maxDate: Date;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
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
    this.maxDate = new Date();
    this.dataSource = new MatTableDataSource<ProcesoLawyerFilter>([]);
  }

  loadFilterParams() {
    //Obtain process status
    this.processService
      .getAllEstadoProcesos()
      .subscribe((data: ProcesoStatus[]) => {
        for (let statusProcess of data) {
          this.processStatusFilter.push({
            valor: statusProcess,
            texto: statusProcess.nombre,
            checked: false,
          });
        }
      });
    //Obtain process type
    this.processService
      .getAllTipoProcesos()
      .subscribe((data: ProcesoType[]) => {
        for (let typeProcess of data) {
          this.processTypeFilter.push({
            valor: typeProcess,
            texto: typeProcess.nombre,
          });
        }
      });
  }
  redirectToOtherComponent(row: any) {
    const queryParams = { processId: row.id.toString() };
    localStorage.setItem('selectedIdProcessLawyer', row.id.toString());
    this.router.navigate(['/infoprocesslawyer'], { queryParams: queryParams });
  }
  ngOnInit() {
    this.loadFilterParams();
    this.applyFilters();
  }
  applyFilters() {
    let params = new HttpParams().set(
      'abogadoId',
      parseInt(localStorage.getItem('lawyerId')!)
    );
    params = params.set('page', this.pageIndex.toString());

    params = params.set('size', this.pageSize.toString());

    let startDateStr = '';
    let endDateStr = '';
    const lawyerId = parseInt(localStorage.getItem('lawyerId')!);
    if (this.startDate) {
      startDateStr = this.obtaintDate(this.startDate);
      params = params.set('fechaInicioStr', startDateStr);
    }
    if (this.endDate) {
      endDateStr = this.obtaintDate(this.endDate);
      params = params.set('fechaFinStr', endDateStr);
    }

    const processStatus = this.processStatusFilter.filter(
      (filtro) => filtro.checked
    );
    if (processStatus.length > 0) {
      for (let statusProcess of processStatus) {
        params = params.append('estadosProceso', statusProcess.texto);
      }
    }

    console.log(params);
    if (this.selectedProcessType?.valor) {
      params = params.set('tipoProceso', this.selectedProcessType.valor.nombre);
    }
    this.processService
      .getProcesosByAbogadoFilter(params)
      .subscribe(
        (data: Pageable<ProcesoLawyerFilter>) => {
          this.dataSource.data = data.data;
          this.totalItems = data.totalItems;
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  obtaintDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + month + '-' + day;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }
  onSelected(value: ProcesoType): void {
    console.log('AAAAAAA', value);
  }
  onCheckboxChange(
    opcion: { valor: any; texto: string; checked: boolean },
    filterType: string
  ): void {
    opcion.checked = !opcion.checked;
  }
  toggleDiv() {
    this.mostrarDiv = !this.mostrarDiv;
  }
}
