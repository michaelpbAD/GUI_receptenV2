import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted: ', req);
    const clonedReq = req.clone({params: req.params.set('auth', localStorage.getItem('token'))});
    // const clonedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});
    console.log('cloned: ', clonedReq);
    return next.handle(clonedReq);
  }
}

