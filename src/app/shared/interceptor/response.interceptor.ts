import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import Swal from 'sweetalert2';


@Injectable()
export class ReponseInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}
  AuthGuard: AuthGuard | undefined;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('login')) {
          localStorage.clear();
          if (error.url && !error.url.includes('login')) {
            Swal.fire({
              icon: 'error',
              title: 'No autorizado',
              text: 'Su sesión ha caducado. Por favor, inicie sesión nuevamente.',
              confirmButtonText: 'Okay',
              confirmButtonColor: '#AA2535',
            }).then(() => {
              // window.location.reload()
              //this.router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
            });
          }
        }
        return throwError(error);
      })
    );
  }
}