import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoAdminComponent } from '../info-admin/info-admin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(InfoAdminComponent, {
      width: '650px', 
      height: '620px',
      panelClass: 'custom-dialog-container',
      position: {
        top: '3px', 
        left: '830px' 
      },
      data: { /* Puedes pasar datos al componente del diálogo */ }
    });
  }
  

}
