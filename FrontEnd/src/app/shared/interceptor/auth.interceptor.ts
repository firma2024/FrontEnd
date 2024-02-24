import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, filter, map, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('login') || req.url.includes('login') ) {
            return next.handle(req);
        }
    
        const token = localStorage.getItem('token');
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });
        return next.handle(req);
    }
    
}
