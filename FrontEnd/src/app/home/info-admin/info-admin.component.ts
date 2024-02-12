import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.component.html',
  styleUrl: './info-admin.component.css'
})
export class InfoAdminComponent {

  constructor(private dialogRef: MatDialogRef<InfoAdminComponent>) { }

  goBack() {
    this.dialogRef.close();
  }
  
}
