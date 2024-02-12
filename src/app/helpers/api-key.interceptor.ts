import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from "../models/response";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<Response>, next: HttpHandler): Observable<HttpEvent<Response>> {
    request = request.clone({
      setParams: {
        api_key: environment.movieApi.key,
      }
    })
    return next.handle(request);
  }
}
