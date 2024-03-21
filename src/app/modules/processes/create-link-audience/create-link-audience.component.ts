import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProcessService } from '../../../services/process.service';
import Swal from 'sweetalert2';
import { MensajeResponse } from '../../../shared/model/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-link-audience',
  templateUrl: './create-link-audience.component.html',
  styleUrl: './create-link-audience.component.css',
})
export class CreateLinkAudienceComponent {
  link: string = '';
  name: string = '';
  idProcess: string = '';
  constructor(
    public dialog: MatDialog,
    private processService: ProcessService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idProcess = data.idProcess;
  }

  crearAudiencia() {
    console.log(this.link);
    this.processService
      .agregarAudiencia(this.link, this.idProcess, this.name)
      .subscribe(
        (res: MensajeResponse) => {
          Swal.fire({
            icon: 'success',
            iconColor: '#AA2535',
            title: 'Audiencia creada',
            text: 'Se ha creado la audiencia exitosamente.',
            confirmButtonColor: '#AA2535',
            didClose: () => {
              this.dialog.closeAll();
              window.location.reload();
            },
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear audiencia',
            text: 'Se presentó un error cargando la audencia, intente de nuevo.',
            confirmButtonColor: '#AA2535',
          });
        }
      );
  }
  ngOnInit() {
    console.log(this.idProcess);
  }
}
