import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../../services/action.service';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StorageService } from '../../../services/storage.service';

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

  id: string = '';
  listaSujetos: string[] = [];
  constructor(
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
        this.despacho = data.despacho;
        this.date = data.fechaActuacion;
        this.annotation = data.anotacion;
        this.typeProcess = data.tipoProceso;
        this.action = data.actuacion;
        this.dateRegister = data.fechaRegistro;
        this.listaSujetos = data.sujetos.split('|');
        this.downloadAndShowPDF();
      });
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
}
