import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observer } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UtilService } from '../../../services/util.service';
import { UserService } from '../../../services/user.service';
import { UserProcesess } from '../../../shared/model/user/user.procesos';
import { LawFirmService } from '../../../services/law.firm.service';
import { Firma } from '../../../shared/model/lawFirm/firma';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private lawFirmService: LawFirmService
  ) {}

  username: string = '';
  password: string = '';
  error: boolean = false;
  error_message: string = 'Error de conexión';
  returnUrl: string = '/';
  error_dict: { [key: number]: string } = {
    400: 'Credenciales incorrectas',
    500: 'Error del servidor',
  };
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'];
    });
  }
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
  hasQueryParams() {}
  iniciarSesion(): void {
    if (this.areCorrectFields()) {
      this.authService.login(this.username, this.password).subscribe(
        (data: any) => {
          const rol = localStorage.getItem('role');

          this.lawFirmService.getFirmaByUser(this.username).subscribe(
            (firma: Firma) => {
              localStorage.setItem('firmaId', firma.id.toString());
            },
            (error) => {
              console.error('Error al obtener la firma:', error);
            }
          );
          if (rol === 'JEFE') {
            if (this.returnUrl !== '/' && this.returnUrl !== undefined) {
              if (this.returnUrl.includes('?')) {
                //Url with query params
                const id = this.returnUrl.split('?')[1].split('=')[1];
                const urlQuery = this.returnUrl.split('?')[0];
                let queryParams = { id: id.toString() };
                console.log(queryParams);
                this.router.navigate([urlQuery], {
                  queryParams: queryParams,
                });
              } else {
                //Url without query params
                this.router.navigate([this.returnUrl]);
              }
            } else {
              this.router.navigate(['/main']);
            }
          } else if (rol === 'ABOGADO') {
            this.getLawyerInfo();
            if (this.returnUrl !== '/' && this.returnUrl !== undefined) {
              if (this.returnUrl.includes('?')) {
                //Url with query params
                const id = this.returnUrl.split('?')[1].split('=')[1];
                const urlQuery = this.returnUrl.split('?')[0];
                let queryParams = { id: id.toString() };
                console.log(queryParams);
                this.router.navigate([urlQuery], {
                  queryParams: queryParams,
                });
              } else {
                //Url without query params
                this.router.navigate([this.returnUrl]);
              }
            } else {
              this.router.navigate(['/main-lawyer']);
            }
          }
        },
        (error: any) => {
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
        }
      );
    }
  }
  getLawyerInfo() {
    this.userService.getLawyerByUsername(this.username).subscribe(
      (user: UserProcesess) => {
        localStorage.setItem('lawyerId', user.id.toString());
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
