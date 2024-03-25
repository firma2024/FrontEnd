import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token')) {
      const role = localStorage.getItem('role');
      if (role && route.data['roles'] && route.data['roles'].includes(role)) {
        return true;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'No autorizado',
      text: 'Por favor, inicie sesión para continuar',
      confirmButtonText: 'Okay',
      confirmButtonColor: '#AA2535',
    });
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
