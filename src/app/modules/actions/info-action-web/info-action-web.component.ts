import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';
import { ActionService } from '../../../services/action.service';

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
  dateRegister: string = 'Valor de la fecha de registro';

  id: string = '';
  listaSujetos: string[] = [];

  officeURL: string = ""
  constructor(
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private actionService: ActionService
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
        this.dateRegister = data.fechaRegistro;
        this.listaSujetos = data.sujetos.split('|');
        this.officeURL = data.link;
      });
  }
 
}
