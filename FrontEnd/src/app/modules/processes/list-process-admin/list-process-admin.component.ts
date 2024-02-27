import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private processService: ProcessService
  ) {
    this.dataSource = new MatTableDataSource<ProcessJefeFilter>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.changeDetectorRefs.detectChanges();
    this.fetchData();
  }

  fetchData() {
    const fechaInicioStr = '';
    const firmaId = parseInt(localStorage.getItem('firmaId')!);
    const fechaFinStr = '';
    const estadosProceso: string[] = [];
    const tipoProceso = '';
    const page = 0;
    const size = 10;

    this.processService
      .getProcesosByFirmaFilter(
        fechaInicioStr,
        firmaId,
        fechaFinStr,
        estadosProceso,
        tipoProceso,
        page,
        size
      )
      .subscribe(
        (data: Pageable<ProcessJefeFilter>) => {
          this.dataSource.data = data.data
          console.log(data.data)
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  redirectToOtherComponent(row: ProcessJefeFilter) {
    localStorage.setItem("selectedIdProcessAdmin",row.id.toString())
    this.router.navigate(['/infoprocessadmin']);
  }
}
