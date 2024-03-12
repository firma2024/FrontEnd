import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';
import { ActionService } from '../../../services/action.service';
import Swal from 'sweetalert2';
import { StorageService } from '../../../services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-info-action-web',
  templateUrl: './info-action-web.component.html',
  styleUrl: './info-action-web.component.css',
})
export class InfoActionWebComponent implements OnInit {
  despacho: string = 'Valor del despacho';
  date: string = 'Valor de la fecha';
  annotation: string = 'Valor de la anotación';
  typeProcess: string = 'Valor del tipo de proceso';
  action: string = 'Valor de la acción';
  datestart: string = 'Valor de la fecha de registro';
  dateend: string = 'Valor de la fecha de registro';
  selectedFile: File | null = null;
  id: string = '';
  listaSujetos: string[] = [];

  officeURL: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.loadActionInfo();
  }
  loadActionInfo() {
    this.actionService
      .getActuacion(this.id)
      .subscribe((data: ActuacionResponse) => {
        console.log(data);
        this.despacho = data.despacho;
        this.date = data.fechaActuacion;
        this.annotation = data.anotacion;
        this.typeProcess = data.tipoProceso;
        this.action = data.actuacion;
        this.datestart = data.fechaRegistro;
        this.listaSujetos = data.sujetos.split('|');
        this.officeURL = data.link;
      });
  }
  selectDoc(event: any) {
    this.selectedFile = event.target.files[0];
  }
  uploadDoc(event: any) {
    event.preventDefault();
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas subir el archivo ${this.selectedFile?.name} como providencia?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#AA2535',
      cancelButtonColor: '#AA2535',
      iconColor: '#AA2535',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.selectedFile) {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el archivo',
            text: 'Debe seleccionar un archivo para poder subirlo.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#AA2535',
          });
        }
        const extension =
          this.selectedFile?.name.split('.').pop()?.toLowerCase() || '';
        if (extension !== 'pdf') {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el archivo',
            text: 'El archivo debe tener extensión .pdf.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#AA2535',
          });
        } else {
          this.storageService
            .subirDocumento(this.id, this.selectedFile!)
            .subscribe(() => {
              Swal.fire({
                icon: 'success',
                iconColor: '#AA2535',
                title: 'Archivo subido',
                text: 'El archivo se ha subido correctamente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#AA2535',
              });
              const queryParams = { id: this.id };
              this.router.navigate(['/infoactionbroker'], {
                queryParams: queryParams,
              });
            }),
            (error: HttpErrorResponse) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al cargar el archivo',
                text: 'Hubo un error al cargar el archivo, intentelo de nuevo.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#AA2535',
              });
            };
        }
      }
    });
    
  }
}
