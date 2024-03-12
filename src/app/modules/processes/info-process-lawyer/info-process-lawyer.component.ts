import { Component } from '@angular/core';
import { CreateLinkAudienceComponent } from '../create-link-audience/create-link-audience.component';
import { EditLinkAudienceComponent } from '../edit-link-audience/edit-link-audience.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActionService } from '../../../services/action.service';
import { Pageable } from '../../../shared/model/pageable';
import { ActuacionAbogadoFilter } from '../../../shared/model/actuaciones/actuacion.lawyer.filter';
import { ProcessService } from '../../../services/process.service';
import { ProcesoLawyer } from '../../../shared/model/process/proceso.abogado';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Audiencia } from '../../../shared/model/audencia/audiencia';
import { DateAdapter } from '@angular/material/core';

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
  processFilter: { valor: any; texto: string; checked: boolean }[] = [
    { valor: 'A', texto: 'Proceso A', checked: false },
    { valor: 'B', texto: 'Proceso B', checked: false },
  ];

  mostrarDiv: boolean = false;
  selectedDate: Date;

  idProcess: string = '';
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idProcess = params['processId'];
    });
    this.loadData();
  }

  listaSujetos: string[] = [];
  listAudience: Audiencia[] = [];
  dataSource = new MatTableDataSource<ActuacionAbogadoFilter>();

  documentImageUrl: string = 'assets/document.png';

  constructor(
    private actionService: ActionService,
    private processService: ProcessService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.selectedDate = new Date();
  }

  loadData() {
    this.obtainActions();
    this.obtainInfoProcess();
  }
  obtainInfoProcess() {
    this.processService
      .getProcesoPorId(parseInt(this.idProcess))
      .subscribe((data: ProcesoLawyer) => {
        console.log(data);
        this.despacho = data.despacho;
        this.date = data.fechaRadicacion;
        this.nRadicado = data.numeroRadicado;
        this.typeProcess = data.tipoProceso;
        this.listaSujetos = data.sujetos.split('|');
        this.listAudience = data.audiencias;
      });
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
        console.log(data);
      });
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
  redirectToOtherComponent(element: ActuacionAbogadoFilter) {
    const queryParams = { id: element.id.toString() };
    this.router.navigate(['/infoactionbroker'], { queryParams: queryParams });
  }
  downloadAllDocs() {
    this.storageService
      .descargarTodosLosDocumentos(this.idProcess)
      .subscribe((data: HttpResponse<Blob>) => {
        const file = new Blob([data.body!], { type: 'application/zip' });
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;

        a.download = `providencias_${this.nRadicado}.zip`;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        document.body.removeChild(a);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateLinkAudienceComponent, {
      width: '350px',
      height: '300px',
      panelClass: 'custom-dialog-container',
      position: {
        top: '200px',
        left: '400px',
      },
      data: {
        idProcess: this.idProcess,
      },
    });
  }

  openDialogEdit(item: Audiencia) {
    const dialogRef = this.dialog.open(EditLinkAudienceComponent, {
      width: '350px',
      height: '300px',
      panelClass: 'custom-dialog-container',
      position: {
        top: '250px',
        left: '600px',
      },
      data: {
        audience: item,
      },
    });
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
