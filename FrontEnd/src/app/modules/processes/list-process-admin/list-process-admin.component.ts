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
  styleUrls: ['./list-process-admin.component.css']
})
export class ListProcessAdminComponent {
  processSearch: string = ''; 
  dataSource: MatTableDataSource<ProcessJefeFilter>;
  columnNames: string[] = ['Radicado', 'Abogado', 'Despacho', 'Tipo', 'Fecha', 'Estado'];
  displayedColumns: string[] = ['Radicado', 'Abogado', 'Despacho', 'Tipo', 'Fecha' , 'Estado'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRefs: ChangeDetectorRef, 
              private router: Router,
              private servicio: ProcessService) { 
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
  
    this.servicio.getProcesosByFirmaFilter(
      fechaInicioStr,
      firmaId,
      fechaFinStr,
      estadosProceso,
      tipoProceso,
      page,
      size
    ).subscribe(
      (data: Pageable<ProcessJefeFilter>) => {
        console.log(data); 
        if (data && data.data) {
          this.dataSource.data = data.data;
        } else {
          console.error('La respuesta del servicio no tiene la propiedad "data".', data);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
  

  redirectToOtherComponent(row: any) {
    console.log('Redireccionando a otro componente:', row);
    this.router.navigate(['/infoprocessadmin']);
  }
}
