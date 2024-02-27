import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ProcessService } from '../../../services/process.service';
import { ProcesoLawyerFilter } from '../../../shared/model/process/process.abogado.filter';
import { Pageable } from '../../../shared/model/pageable';

@Component({
  selector: 'app-list-process-lawyer',
  templateUrl: './list-process-lawyer.component.html',
  styleUrl: './list-process-lawyer.component.css'
})
export class ListProcessLawyerComponent {

  processSearch: string = ''; 

  dataSource: MatTableDataSource<ProcesoLawyerFilter>;
  columnNames: string[] = ['Radicado', 'Despacho','Tipo', 'Fecha'];
  displayedColumns: string[] = ['Radicado', 'Despacho', 'Tipo', 'Fecha'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router,private processService:ProcessService) {
    this.dataSource = new MatTableDataSource<ProcesoLawyerFilter>([    ]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.changeDetectorRefs.detectChanges();
  }

  // Función para redirigir a otro componente al hacer clic en una fila
  redirectToOtherComponent(row: any) {
    // Implementa la lógica para la redirección aquí
    console.log('Redireccionando a otro componente:', row);
    this.router.navigate(['/infolawyer']);
  }
  ngOnInit() {
    const fechaInicioStr = '';
    const firmaId = parseInt(localStorage.getItem('firmaId')!);
    const fechaFinStr = '';
    const estadosProceso: string[] = [];
    const tipoProceso = '';
    const lawyerId = localStorage.getItem("lawyerId")!
    this.processService
      .getProcesosByAbogadoFilter(
        lawyerId,
        fechaInicioStr,
        fechaFinStr,
        estadosProceso,
        tipoProceso
        //Add when pagination
      )
      .subscribe(
        (data: Pageable<ProcesoLawyerFilter>) => {
          this.dataSource.data = data.data
          console.log(data.data)
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

}
