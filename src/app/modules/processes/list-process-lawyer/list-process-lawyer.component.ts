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
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormControl } from '@angular/forms';
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
  selectedProcessType: ProcesoType | null = null;
  processTypeFilter: { valor: ProcesoType | null; texto: string }[] = [
    { valor: null, texto: 'Seleccionar' },
  ];

  processStatusFilter: { valor: any; texto: string; checked: boolean }[] = [];
  mostrarDiv: boolean = false;
  initDate: Date | null = null;
  endDate: Date | null = null;
  maxDate: Date;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  isDateSelected: boolean = true;
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
  
  dateChanged() {
    if (this.initDate && this.endDate) {
      console.log(this.initDate! > this.endDate!);
      if (this.initDate.getTime() > this.endDate.getTime()) {
        this.endDate = this.initDate;
      }
    } else {
      this.initDate = new Date();
      this.endDate = new Date();
    }
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
        for (let statusProcess of data) {
          this.processTypeFilter.push({
            valor: statusProcess,
            texto: statusProcess.nombre,
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
    this.fetchData();
    this.loadFilterParams();
    this.selectedProcessType = this.processTypeFilter[0].valor;
  }
  fetchData() {
    const lawyerId = parseInt(localStorage.getItem('lawyerId')!);
    const page = this.pageIndex;

    this.processService
      .getProcesosByAbogadoFilter('', lawyerId, '', [], '', page, this.pageSize)
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
  applyFilters() {
    let initDateStr = '';
    let endDateStr = '';
    const lawyerId = parseInt(localStorage.getItem('lawyerId')!);
    if (this.initDate) {
      initDateStr = this.obtaintDate(this.initDate);
    }
    if (this.endDate) {
      endDateStr = this.obtaintDate(this.endDate);
    }
    const processStatus = this.processStatusFilter.filter(filtro => filtro.checked);
    console.log(this.selectedProcessType!.nombre)
  }
  obtaintDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + month + '-' + day;
  }
  // Función para manejar el cambio de página
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData(); // Recargar datos con la paginación actualizada
  }
  onTypeProcessChange(event:any){

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
