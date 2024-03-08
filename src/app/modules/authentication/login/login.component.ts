import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private utilService: UtilService
  ) {}

  username: string = '';
  password: string = '';
  error: boolean = false;
  error_message: string = 'Error de conexión';

  error_dict: { [key: number]: string } = {
    400: 'Credenciales incorrectas',
    500: 'Error del servidor',
  };

  loginObserver: Observer<any> = {
    next: (data: any) => {
      const rol = localStorage.getItem('role');
      if (rol === 'JEFE') {
        this.router.navigate(['/main']);
      } else if (rol === 'ABOGADO') {
        this.router.navigate(['/main-lawyer']);
      }
    },
    error: (error: any) => {
      let code: number | undefined = error.status
        ? Math.round(error.status / 100) * 100
        : undefined;
      if (code && code in this.error_dict) {
        this.error_message = this.error_dict[code];
      }
      this.error = true;
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: this.error_message,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#AA2535',
      });
    },
    complete: () => {
      console.log('complete');
    },
  };
  areCorrectFields(): boolean {
    let dict: { [key: string]: string } = {};
    if (this.username === '') {
      dict['Usuario'] = 'El nombre de usuario es requerido';
    }
    if (this.password === '') {
      dict['Contraseña'] = 'La contraseña es requerida';
    }

    if (Object.keys(dict).length !== 0) {
      this.utilService.raiseInvalidFields(dict);
      return false;
    } else {
      return true;
    }
  }
  iniciarSesion(): void {
    if (this.areCorrectFields()) {
      this.auth
        .login(this.username, this.password)
        .subscribe(this.loginObserver);
      localStorage.setItem('username', this.username);
    }
  }
}
