import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActionService } from '../../../services/action.service';
import { Pageable } from '../../../shared/model/pageable';
import { ActuacionAbogadoFilter } from '../../../shared/model/actuaciones/actuacion.lawyer.filter';
import { ProcessService } from '../../../services/process.service';
import { ProcesoLawyer } from '../../../shared/model/process/proceso.abogado';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-process-lawyer',
  templateUrl: './info-process-lawyer.component.html',
  styleUrl: './info-process-lawyer.component.css',
})
export class InfoProcessLawyerComponent {
  despacho: string = 'Valor del despacho';
  date: string = 'Valor de la fecha';
  nRadicado: string = 'Valor del radicado';
  typeProcess: string = 'Valor del tipo de proceso';

  fechaFinStr = '';
  fechaInicioStr = '';
  existeDoc: boolean | undefined;

  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  id: string | null = null;

  idProcess: string = "";
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
        this.idProcess = params['processId'];
    });
    this.loadData();
  }

  listaSujetos: string[] = [];
  listAudience: string[] = [];
  dataSource = new MatTableDataSource<ActuacionAbogadoFilter>();

  documentImageUrl: string = 'assets/document.png';

  constructor(
    private actionService: ActionService,
    private processService: ProcessService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    
  }

  loadData() {
    this.obtainActions();
    this.obtainInfoProcess();
  }
  obtainInfoProcess() {
    this.processService.getProcesoPorId(parseInt(this.idProcess)).subscribe((data:ProcesoLawyer) => {
      console.log(data)
        this.despacho = data.despacho;
        this.date = data.fechaRadicacion;
        this.nRadicado = data.numeroRadicado;
        this.typeProcess = data.tipoProceso;
        this.listaSujetos = data.sujetos.split("|")
        this.listAudience = data.audiencias.map(audiencia => audiencia.nombre);
    })
  }
  obtainActions() {
    this.actionService
      .getAllActuacionesByProcesoAbogado(
        parseInt(this.idProcess),
        this.fechaInicioStr,
        this.fechaFinStr,
        this.existeDoc,
        this.pageIndex,
        this.pageSize
      )
      .subscribe((data: Pageable<ActuacionAbogadoFilter>) => {
        this.dataSource.data = data.data;
        this.totalItems = data.totalItems;
        console.log(data)
      });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
  redirectToOtherComponent(element:ActuacionAbogadoFilter){
    const queryParams = { id: element.id.toString() };
    this.router.navigate(['/infoactionbroker'],{queryParams:queryParams});
  }
}
