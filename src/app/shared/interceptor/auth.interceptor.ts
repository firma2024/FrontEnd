import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) { }
    AuthGuard : AuthGuard | undefined
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        } 

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && !req.url.includes('login') ) {
                    localStorage.clear(); 
                    const currentUrl = this.router.url;
                    if (error.url && !error.url.includes('login')) {
                        Swal.fire({
                            icon: 'error',
                            title: 'No autorizado',
                            text: 'Su sesión ha caducado. Por favor, inicie sesión nuevamente.',
                            confirmButtonText: 'Okay',
                            confirmButtonColor: '#AA2535'
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
