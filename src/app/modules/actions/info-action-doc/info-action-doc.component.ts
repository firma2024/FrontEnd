import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../../services/action.service';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-action-doc',
  templateUrl: './info-action-doc.component.html',
  styleUrl: './info-action-doc.component.css',
})
export class InfoActionDocComponent implements OnInit {
  despacho: string = 'Valor del despacho';
  date: string = 'Valor de la fecha';
  annotation: string = 'Valor de la anotación';
  typeProcess: string = 'Valor del tipo de proceso';
  action: string = 'Valor de la acción';
  dateRegister: string = 'Valor de la fecha de registro';
  idprocess: string = '';
  id: string = '';
  listaSujetos: string[] = [];
  username: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.loadActionInfo();
    this.downloadAndShowPDF();
    this.suscribirEventoPopstate();
  }
  updateState(actionId: number): void {
    this.actionService.actualizarEstadoVisualizacionActuacion(actionId).subscribe(
      (response) => {
        console.log('Estado de visualización actualizado:', response);
      },
      (error) => {
        console.error('Error al actualizar el estado de visualización:', error);
      }
    );
  }
  loadActionInfo(): void {
    this.actionService.getActuacion(this.id).subscribe(
      (data: ActuacionResponse) => {
        console.log('Respuesta del servicio:', data);
        this.despacho = data.despacho;
        this.date = data.fechaActuacion;
        this.annotation = data.anotacion;
        this.typeProcess = data.tipoProceso;
        this.action = data.actuacion;
        this.dateRegister = data.fechaRegistro;
        this.listaSujetos = data.sujetos.split('|');
        this.idprocess = data.processId;
        this.username = data.username;

        const localStorageUsername = localStorage.getItem('username');
        if (localStorageUsername === this.username) {
          this.updateState(data.id);
        }
      },
      (error) => {
        console.error('Error al cargar la información de la acción:', error);
      }
    );
  }

  downloadAndShowPDF() {
    this.storageService
      .descargarDocumento(this.id)
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        console.log(response);
        const iframe = document.querySelector(
          '.description iframe'
        ) as HTMLIFrameElement;
        iframe.src = url;
      });
  }
  suscribirEventoPopstate(): void {
    window.onpopstate = () => {
      this.goBack();
    };
  }
  goBack():void {
    console.log(this.idprocess);
    this.router.navigateByUrl(`/infoprocesslawyer?id=${this.idprocess}`);
  }
}
