import { Injectable, inject } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";
import { AppRoutes } from "../../app.routes";
import { AutoLogoutService } from "../../shared/services/auto-logout.service";

@Injectable()

export class RequestsInterceptor implements HttpInterceptor {
    constructor(
        private autoLogoutService: AutoLogoutService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const requestUrl: string = environment.apiUrl + request.url;
        const token = localStorage.getItem('token') ?? sessionStorage.getItem('token') ?? '';
        const router = inject(Router);

        if (token) {
            const decodedToken: any = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000

            if (expirationTime < Date.now()) {
                this.autoLogoutService.autoLogout();
                router.navigate([AppRoutes.SignIn]);
            }

            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token)
            });
        }
        request = request.clone({ url: requestUrl });
        // return next.handle(request);
        return next.handle(request).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }
}