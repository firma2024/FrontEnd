import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent implements OnInit{
  nombreEmpresa: string = 'Bran Holding Abogados & Asociados';
  direccionEmpresa: string = '';
  activeProcess: string = '';
  lawyersRegister: string = '';
  favorProcess: string = '';
  againstProcess: string = '';

  ngOnInit() {
  }

}
