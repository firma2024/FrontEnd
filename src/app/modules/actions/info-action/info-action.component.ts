import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../../services/action.service';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';

@Component({
  selector: 'app-info-action',
  templateUrl: './info-action.component.html',
  styleUrls: ['./info-action.component.css'],
})
export class InfoActionComponent implements OnInit {
  despacho: string = 'Valor del despacho';
  date: string = 'Valor de la fecha';
  annotation: string = 'Valor de la anotación';
  typeProcess: string = 'Valor del tipo de proceso';
  action: string = 'Valor de la acción';
  dateRegister: string = 'Valor de la fecha de registro';

  id: string = '';

  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
  });
    this.loadActionInfo();
  }
  loadActionInfo(){
    this.actionService.getActuacion(this.id).subscribe((data:ActuacionResponse) => {
      console.log(data)
      this.despacho = data.despacho;
      this.date = data.fechaActuacion;
      this.annotation = data.anotacion;
      this.typeProcess = data.tipoProceso;
      this.action = data.actuacion;
      this.dateRegister = data.fechaRegistro;
      this.listaSujetos = data.sujetos.split('|');
    });
  }
  listaSujetos: string[] = [];
}
