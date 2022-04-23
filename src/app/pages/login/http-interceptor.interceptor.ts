import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                   // 'Authorization':  `Basic ${btoa(this.authenticationService.createBasicAuthToken("adminSpringSecurity" , "adminMdpSpringSecurity"))}`,
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + window.btoa("jeKxjpwl9nAlnnI92jNR" + ":" + "AtmxsAlj1jaG01sR2C0b",
                    )
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
