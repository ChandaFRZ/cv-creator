import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authSerivce: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authSerivce.isLoggedIn) {
            const modifiedReq = req.clone({
                setHeaders: {
                    Authorization: this.authSerivce.getTokenFormLocalStorage(),
                    ContentType: 'application/json',
                }
            });
            return next.handle(modifiedReq);
        }
        return next.handle(req);
    }
}

