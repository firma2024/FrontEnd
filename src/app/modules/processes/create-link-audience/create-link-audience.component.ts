import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-link-audience',
  templateUrl: './create-link-audience.component.html',
  styleUrl: './create-link-audience.component.css'
})
export class CreateLinkAudienceComponent {
  link: string = ''; 
  name: string = ''; 

  constructor(public dialog: MatDialog) {}

  crearAudiencia(){
    
  }
}
