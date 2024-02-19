import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from 'src/app/models/user';

const users: User[] = [{ id: 1, username: 'some@body.com', password: 'Hello123' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User[] | User>> {
    return this.handleRoute(request, next).pipe(delay(500));
    //console.log(request);
    //let response = this.handleRoute(request, next).pipe(delay(500));
    //console.log(response.subscribe((x) => { console.log(x) }));
    //return response;
  }

  handleRoute(request: HttpRequest<User>, next: HttpHandler): Observable<HttpEvent<User[] | User>> {
    const { url, method } = request;

    if (url.endsWith('/users/authenticate') && method === 'POST') {
      return this.authenticate(request);
    } else if (url.endsWith('/users') && method === 'GET') {
      return this.getUsers(request);
    } else {
      return next.handle(request);
    }
  }

  authenticate(request: HttpRequest<User>): Observable<HttpEvent<User>> {
    if (request.body === null) {
      throw new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });
    }
    const { username, password } = request.body;

    const user = users.find((x) => x.username === username && x.password === password);

    if (!user) {
      throw new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    }
    return of(new HttpResponse<User>({ status: 200, body: user }));
  }

  getUsers(request: HttpRequest<User>): Observable<HttpEvent<User[]>> {
    if (!this.isLoggedIn(request)) {
      throw new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
    }
    return of(new HttpResponse({ status: 200, body: users }));
  }

  isLoggedIn(request: HttpRequest<User>) {
    return request.headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
  }
}
