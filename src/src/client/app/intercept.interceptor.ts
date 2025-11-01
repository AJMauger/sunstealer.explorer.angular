import { Injectable, Injector } from '@angular/core';
import {HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IdentityService } from "./services/identity.service";
import { LoggerService } from "./services/logger.service";

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
    this.identity = this.injector.get(IdentityService);
    this.logger = this.injector.get(LoggerService);
  }

  // ajm: FAIL
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.identity.accessToken) {
      const r: HttpRequest<unknown> = request.clone({setHeaders: { Authorization: `Bearer ${this.identity.accessToken}` } });
      return next.handle(r);
    }

    return next.handle(request);
  }

  public identity!: IdentityService;
  public logger!: LoggerService;
}
