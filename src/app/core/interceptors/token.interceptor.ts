import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const token = localStorage.getItem('X-AUTH-TOKEN');
    if (token) {
      const headers = request.headers
        .set('X-AUTH-TOKEN', token);

      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
