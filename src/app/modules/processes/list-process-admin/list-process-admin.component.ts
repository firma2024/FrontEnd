import { Component, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { ProcessJefeFilter } from '../../../shared/model/process/proceso.jefe.filter';
import { Pageable } from '../../../shared/model/pageable';
import { DateAdapter } from '@angular/material/core';
import { HttpParams } from '@angular/common/http';
import { ProcesoType } from '../../../shared/model/process/proceso.tipo';
import { ProcesoLawyerFilter } from '../../../shared/model/process/process.abogado.filter';
import { ProcesoStatus } from '../../../shared/model/process/proceso.estado';

@Component({
  selector: 'app-list-process-admin',
  templateUrl: './list-process-admin.component.html',
  styleUrls: ['./list-process-admin.component.css'],
})
export class ListProcessAdminComponent {
  processSearch: string = '';
  dataSource: MatTableDataSource<ProcessJefeFilter>;
  columnNames: string[] = [
    'numeroRadicado',
    'abogado',
    'despacho',
    'Tipo',
    'Fecha',
    'Estado',
  ];
  displayedColumns: string[] = [
    'numeroRadicado',
    'abogado',
    'despacho',
    'Tipo',
    'Fecha',
    'Estado',
  ];
  processTypeFilter: { valor: ProcesoType | null; texto: string }[] = [
    {
      valor: null,
      texto: 'Seleccionar',
    },
  ];
  selectedProcessType: { valor: ProcesoType | null; texto: string } | undefined;

  processStatusFilter: { valor: any; texto: string; checked: boolean }[] = [];
  mostrarDiv: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 6;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private processService: ProcessService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dataSource = new MatTableDataSource<ProcessJefeFilter>([]);
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
  applyFilters() {
    let params = new HttpParams();
    params = params
      .set('firmaId', parseInt(localStorage.getItem('firmaId')!))
      .set('page', this.pageIndex.toString())
      .set('size', this.pageSize.toString());

    let startDateStr = '';
    let endDateStr = '';

    if (this.startDate) {
      startDateStr = this.startDate.toISOString().slice(0, 10);
      params = params.set('fechaInicioStr', startDateStr);
    }
    if (this.endDate) {
      endDateStr = this.endDate.toISOString().slice(0, 10);
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

    if (this.selectedProcessType?.valor) {
      params = params.set('tipoProceso', this.selectedProcessType.valor.nombre);
    }
    
    this.processService.getProcesosByFirmaFilter(params).subscribe(
      (data: Pageable<ProcessJefeFilter>) => {
        this.dataSource.data = data.data;
        this.totalItems = data.totalItems;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  ngOnInit() {
    this.loadFilterParams();
    this.applyFilters();
  }
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }

  redirectToOtherComponent(row: ProcessJefeFilter) {
    const queryParams = { id: row.id.toString() };
    localStorage.setItem('selectedIdProcessAdmin', row.id.toString());
    this.router.navigate(['/infoprocessadmin'], { queryParams: queryParams });
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
