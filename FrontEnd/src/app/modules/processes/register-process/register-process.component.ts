import { Component } from '@angular/core';
import { ProcessService } from '../../../services/process.service';

@Component({
  selector: 'app-register-process',
  templateUrl: './register-process.component.html',
  styleUrl: './register-process.component.css'
})
export class RegisterProcessComponent {
  filingNumberInput: string = ""
  constructor() { }

}