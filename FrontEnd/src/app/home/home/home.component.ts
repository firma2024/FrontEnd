import { Component ,  OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  rol: string = ''; // Inicializamos la variable aquí

  constructor() { 
    this.rol = 'jefe'; // Asignamos el valor en el constructor
  }

  ngOnInit(): void {
    // Aquí puedes realizar otras inicializaciones si es necesario
  }
}
