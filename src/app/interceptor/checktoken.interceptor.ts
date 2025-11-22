import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ChecktokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    const cloned = token
      ? req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
      : req;

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        // Nếu backend trả về 401 => token hết hạn
        if (error.status === 401||error.status === 403) {

          // Xóa token
          localStorage.removeItem('token');
          localStorage.removeItem('username');

          // Chuyển về trang login
          this.router.navigate(['/login']);

        }

        return throwError(() => error);
      })
    );
  }
}
