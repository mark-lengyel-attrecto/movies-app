import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { PaginatedMovieResponse } from '../interfaces/paginated-response.interface';
import { GenreResponse } from '../interfaces/genre-response.interface';
import { Movie } from '../interfaces/movie.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<PaginatedMovieResponse | GenreResponse | Movie>,
    next: HttpHandler
  ): Observable<HttpEvent<PaginatedMovieResponse | GenreResponse | Movie>> {
    request = request.clone({
      setParams: {
        api_key: environment.movieApi.key,
      },
    });
    return next.handle(request);
  }
}
