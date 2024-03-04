import { Component } from '@angular/core';
import { ProcessService } from '../../../services/process.service';

@Component({
  selector: 'app-info-process-lawyer',
  templateUrl: './info-process-lawyer.component.html',
  styleUrl: './info-process-lawyer.component.css'
})
export class InfoProcessLawyerComponent {
constructor(private processService:ProcessService){}

ngOnInit(){
}
}
