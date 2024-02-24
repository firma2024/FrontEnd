import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Cambio de styleUrl a styleUrls
})
export class HomeComponent implements OnInit {
  rol: string = '';

  constructor() {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('role') || '';
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('firmaId');
  }
}
