import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {
  username: string = '';
  constructor(private authService: AuthService) {}
  recoverPassword(){
    this.authService.forgotPassword(this.username).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        iconColor: '#AA2535',
        title: 'Correo enviado',
        text: 'Se ha enviado un correo con las instrucciones para recuperar su contraseña',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#AA2535'
      })
    },
    (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        iconColor: '#AA2535',
        text: 'No se ha podido enviar el correo',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#AA2535'
      })
    })
  }
}
