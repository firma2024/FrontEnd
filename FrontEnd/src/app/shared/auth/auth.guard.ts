import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verifica si el usuario está autenticado
    if (localStorage.getItem('token')) {
      // Obtén el rol del usuario desde localStorage
      const role = localStorage.getItem('role');

      // Verifica si el rol del usuario tiene acceso a la ruta actual
      if (role && route.data['roles'] && route.data['roles'].includes(role)) {
        // Usuario autenticado y autorizado, permite el acceso.
        return true;
      } else {
        // Usuario no tiene el rol necesario para acceder a la ruta, redirige a una página de acceso no autorizado.
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      // Usuario no autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
