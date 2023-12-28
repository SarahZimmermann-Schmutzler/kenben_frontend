import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // als Antwort erhalten wir ein Observable
    const token = localStorage.getItem('token');
    // token wird abgerufen, entweder aus dem this.authService.getAuthToken() oder wie wir aus dem LS
    if (token) {
      // gibt es Token, wird es dem header angehängt
      req = req.clone({
        setHeaders: {Authorization: `Token ${token}`}
      });
    }

    return next.handle(req).pipe(
      // geben request in next --> pipe soll error catchen und dann was damit machen
      catchError((err) => {
        if(err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigateByUrl('')
            // wenn kein Token, dann zurück zum Login
          }
        }
        return throwError(() => err);
        // gibt error auch aus
      }));
  }
}
