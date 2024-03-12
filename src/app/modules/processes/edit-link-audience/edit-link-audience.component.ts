import { Component, Inject } from '@angular/core';
import { ProcessService } from '../../../services/process.service';
import { MensajeResponse } from '../../../shared/model/message';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Audiencia } from '../../../shared/model/audencia/audiencia';

@Component({
  selector: 'app-edit-link-audience',
  templateUrl: './edit-link-audience.component.html',
  styleUrl: './edit-link-audience.component.css',
})
export class EditLinkAudienceComponent {
  link: string = '';
  name: string = '';
  idProcess: string = '';
  audience : Audiencia | undefined
  constructor(
    public dialog: MatDialog,
    private processService: ProcessService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.audience = data.audience;
  }

  editarAudiencia() {
    this.processService.actualizarAudiencia(this.audience?.id!, this.link).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        iconColor: '#AA2535',
        title: 'Audiencia actualizada',
        text: 'Se ha actualizado la audiencia correctamente.',
        confirmButtonColor: '#AA2535',
        didClose: () => {
          this.dialog.closeAll();
          window.location.reload();
        },
      });
    })
  }
  ngOnInit() {
    
  }
}
