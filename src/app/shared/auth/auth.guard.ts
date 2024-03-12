import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if (localStorage.getItem('token')) {

      const role = localStorage.getItem('role');
      if (role && route.data['roles'] && route.data['roles'].includes(role)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Verificar si hay un código de estado 401
      const lastResponseStatus = localStorage.getItem('lastResponseStatus');
      if (lastResponseStatus && lastResponseStatus === '401') {
        Swal.fire({
          icon: 'error',
          title: 'No autorizado',
          text: 'No tiene permiso para acceder a esta página. Por favor, inicie sesión.',
          confirmButtonText: 'Ir al inicio de sesión'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
      return false;
    }
  }
}
