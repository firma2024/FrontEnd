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
import { HttpParams, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Audiencia } from '../../../shared/model/audencia/audiencia';
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';

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
  docFilter: { valor: any; texto: string; checked: boolean }[] = [
    { valor: true, texto: 'Con Documento', checked: false },
    { valor: false, texto: 'Sin Documento', checked: false },
  ];

  mostrarDiv: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;

  idProcess: string = '';
  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idProcess = params['id'];
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
  ) {}

  loadData() {
    this.applyFilters();
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
  applyFilters() {
    let params = new HttpParams();
    let startDateStr = '';
    let endDateStr = '';

    params=params.set('procesoId', parseInt(this.idProcess));
    params=params.set('page', this.pageIndex.toString());
    params=params.set('size', this.pageSize.toString());

    if (this.startDate) {
      startDateStr = this.startDate.toISOString().slice(0, 10);
      params = params.set('fechaInicioStr', startDateStr);
    }
    if (this.endDate) {
      endDateStr = this.endDate.toISOString().slice(0, 10);
      params = params.set('fechaFinStr', endDateStr);
    }
    const docSelected = this.docFilter.filter((filtro) => filtro.checked);
    if (docSelected.length > 0) {
      for (let statusProcess of docSelected) {
        params = params.append('existeDoc', statusProcess.valor);
      }
    }
    console.log(params)
    this.actionService
      .getAllActuacionesByProcesoAbogado(params)
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
    
    Swal.fire({
      title:
        'Descargando providencias\nEspere un momento',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        const container = Swal.getHtmlContainer();
        if (container) {
          const loader = container.querySelector('.swal2-loader');
          if (loader instanceof HTMLElement) {
            loader.style.color = '#AA2535';
          }
        }
      },
    });

    this.storageService
      .descargarTodosLosDocumentos(this.idProcess)
      .subscribe((data: HttpResponse<Blob>) => {
        Swal.close();
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
      height: '200px',
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
    if (filterType === 'docFilter') {
      this.docFilter.forEach((filter) => {
        if (filter.texto !== opcion.texto) {
          filter.checked = false;
        }
      });
    }
    opcion.checked = !opcion.checked;
  }
  
  toggleDiv() {
    this.mostrarDiv = !this.mostrarDiv;
  }
}
