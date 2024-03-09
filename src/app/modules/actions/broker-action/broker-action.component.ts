import { Component } from '@angular/core';
import { ActionService } from '../../../services/action.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';

@Component({
  selector: 'app-broker-action',
  templateUrl: './broker-action.component.html',
  styleUrl: './broker-action.component.css',
})
export class BrokerActionComponent {
  id: string = '';
  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.actionService
      .getActuacion(this.id)
      .subscribe((data: ActuacionResponse) => {
        console.log(data);
        if (!data.existeDocumento) {
          //TODO: Route action no file action
          const queryParams = { id: this.id.toString() };
          this.router.navigate(['/infoaction'], {
            queryParams: queryParams,
          });
        }
        if (data.existeDocumento && data.link !== null) {
          const queryParams = { id: this.id.toString() };
          this.router.navigate(['/infoactionweb'], {
            queryParams: queryParams,
          });
        }
        
        if (data.existeDocumento && data.link === null) {
          //TODO: Route action with file loaded
          const queryParams = { id: this.id.toString() };
          this.router.navigate(['/infoactiondoc'], {
            queryParams: queryParams,
          });
        }
        
      });
  }
}
