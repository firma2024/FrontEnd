import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService,private router: Router) { }

  username: string = '';
  password: string = '';
  error: boolean = false;
  error_message: string = 'Error de conexion';


  error_dict: {[key: number]: string} = {
    400: 'Credenciales incorrecta',
    500: 'Error del servidor',
  };
  loginObserver : Observer<any> = {
    next: (data: any) => {
      console.log(data);
      this.router.navigate(["/home"])
    },
    error: (error: any) => {
      let code: number | undefined = error.status ? Math.round(error.status/100)*100 : undefined;
      if(code && code in this.error_dict){
        this.error_message = this.error_dict[code];
      }
      this.error = true;
    },
    complete: () => {
      console.log("complete");
    }
  };

  iniciarSesion(): void {
    this.auth.login(this.username, this.password).subscribe(this.loginObserver)
    console.log("intentando loguearse");
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}