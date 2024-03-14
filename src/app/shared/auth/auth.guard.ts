import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
