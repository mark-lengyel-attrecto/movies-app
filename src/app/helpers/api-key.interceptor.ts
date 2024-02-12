import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {PaginatedMovieResponse} from "../models/paginated-response";
import {GenreResponse} from '../models/genre-response';
import {Movie} from "../models/movie";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<PaginatedMovieResponse | GenreResponse | Movie>, next: HttpHandler): Observable<HttpEvent<PaginatedMovieResponse | GenreResponse | Movie>> {
    request = request.clone({
      setParams: {
        api_key: environment.movieApi.key,
      }
    })
    return next.handle(request);
  }
}
