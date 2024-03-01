import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { ProcessJefeFilter } from '../../../shared/model/process/proceso.jefe.filter';
import { Pageable } from '../../../shared/model/pageable';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private processService: ProcessService
  ) {
    this.dataSource = new MatTableDataSource<ProcessJefeFilter>([]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchData();
    });
  }

  fetchData() {
    const fechaInicioStr = '';
    const firmaId = parseInt(localStorage.getItem('firmaId')!);
    const fechaFinStr = '';
    const estadosProceso: string[] = [];
    const tipoProceso = '';
    const page = this.pageIndex; // Ajuste del índice de página
  
    this.processService
      .getProcesosByFirmaFilter(
        fechaInicioStr,
        firmaId,
        fechaFinStr,
        estadosProceso,
        tipoProceso,
        page,
        this.pageSize
      )
      .subscribe(
        (data: Pageable<ProcessJefeFilter>) => {
          this.dataSource.data = data.data;
          this.totalItems = data.totalItems; // Actualizamos totalItems con el valor devuelto por el servicio
          console.log(data.data);
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

  redirectToOtherComponent(row: ProcessJefeFilter) {
    localStorage.setItem("selectedIdProcessAdmin", row.id.toString())
    this.router.navigate(['/infoprocessadmin']);
  }
}
