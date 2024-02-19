import { Component ,  OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  rol: string = ''; 

  constructor() { 
    this.rol = 'jefe' 
  }

  ngOnInit(): void {
  }
}
