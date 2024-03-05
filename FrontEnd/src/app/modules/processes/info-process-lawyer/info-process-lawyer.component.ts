import { Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActionService } from '../../../services/action.service';
import { Pageable } from '../../../shared/model/pageable';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.lawyer.filter';
import { ProcessService } from '../../../services/process.service';
import { ProcesoLawyer } from '../../../shared/model/process/proceso.abogado';

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

  ngOnInit(): void {}

  listaSujetos: string[] = [];
  listAudience: string[] = [];
  dataSource = new MatTableDataSource<ActuacionResponse>();

  documentImageUrl: string = 'assets/document.png';

  constructor(
    private actionService: ActionService,
    private processService: ProcessService
  ) {
    this.loadData();
  }

  loadData() {
    this.obtainActions();
    this.obtainInfoProcess();
  }
  obtainInfoProcess() {
    const idProcess = localStorage.getItem('selectedIdProcessLawyer')!;
    this.processService.getProcesoPorId(parseInt(idProcess)).subscribe((data:ProcesoLawyer) => {
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
    const idProcess = localStorage.getItem('selectedIdProcessLawyer')!;
    this.actionService
      .getAllActuacionesByProcesoAbogado(
        parseInt(idProcess),
        this.fechaInicioStr,
        this.fechaFinStr,
        this.existeDoc,
        this.pageIndex,
        this.pageSize
      )
      .subscribe((data: Pageable<ActuacionResponse>) => {
        this.dataSource.data = data.data;
        this.totalItems = data.totalItems;
      });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}
