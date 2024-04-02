import { Component } from '@angular/core';
import { ActionService } from '../../../services/action.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ActuacionResponse } from '../../../shared/model/actuaciones/actuacion.req';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.actionService.getActuacion(this.id).subscribe(
      (data: ActuacionResponse) => {
        console.log(data);
        if (!data.existeDocumento) {
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
          const queryParams = { id: this.id.toString() };
          this.router.navigate(['/infoactiondoc'], {
            queryParams: queryParams,
          });
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status >= 400) {
          Swal.fire({
            icon: 'info',
            title:
              'No se ha obtenido el link del micrositio',
            text: 'Por favor intente más tarde',
            iconColor: '#AA2535',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#AA2535',
          }).then((result) => {
            if (localStorage.getItem('selectedIdProcessLawyer') !== null) {
              const queryParams = {
                id: localStorage.getItem('selectedIdProcessLawyer'),
              };
              this.router.navigate(['/infoprocesslawyer'], {
                queryParams: queryParams,
              });
              localStorage.removeItem('selectedIdProcessLawyer');
            } else {
              this.router.navigate(['/listprocesslawyer']);
            }
          });
        }
      }
    );
  }
}
