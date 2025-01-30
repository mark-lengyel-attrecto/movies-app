import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestToken } from '../interfaces/request-token.interface';
import { Session } from '../interfaces/session.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = environment.movieApi.baseUrl;

  user = new BehaviorSubject<User | null>(null);
  initialized$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    const sessionId = localStorage.getItem('session_id');
    if (sessionId) {
      this.getAccount(sessionId).subscribe((user) => {
        this.user.next(user);
        this.initialized$.next(true);
      });
    } else {
      this.logout().subscribe(() => {
        this.initialized$.next(true);
      });
    }
  }

  private createRequestToken(): Observable<string> {
    return this.http
      .get<RequestToken>(`${this.baseUrl}/authentication/token/new`)
      .pipe(
        map(({ request_token }) => request_token || ''),
        catchError((error) =>
          throwError(() => {
            console.error(error);
            return new Error('Token request failed.');
          })
        )
      );
  }

  private validateWithLogin(
    username: string,
    password: string,
    requestToken: string
  ): Observable<string> {
    return this.http
      .post<RequestToken>(
        `${this.baseUrl}/authentication/token/validate_with_login`,
        {
          username,
          password,
          request_token: requestToken,
        }
      )
      .pipe(
        map(({ request_token }) => request_token || ''),
        catchError((error) =>
          throwError(() => {
            console.error(error);
            return new Error('Login validation failed.');
          })
        )
      );
  }

  private createSession(validatedToken: string) {
    return this.http
      .post<Session>(`${this.baseUrl}/authentication/session/new`, {
        request_token: validatedToken,
      })
      .pipe(
        catchError((error) =>
          throwError(() => {
            console.error(error);
            return new Error('Session creation failed.');
          })
        )
      );
  }

  private getAccount(sessionId: string): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/account`, {
        params: {
          session_id: sessionId,
        },
      })
      .pipe(
        catchError((error) =>
          throwError(() => {
            console.error(error);
            return new Error('Invalid session ID.');
          })
        )
      );
  }

  private deleteSession(sessionId: string): Observable<unknown> {
    return this.http
      .delete(`${this.baseUrl}/authentication/session`, {
        body: {
          session_id: sessionId,
        },
      })
      .pipe(
        catchError((error) =>
          throwError(() => {
            console.error(error);
            return new Error('Session deletion failed.');
          })
        )
      );
  }

  login(username: string, password: string): Observable<User> {
    return this.createRequestToken().pipe(
      switchMap((requestToken) =>
        this.validateWithLogin(username, password, requestToken)
      ),
      switchMap((validatedToken) => this.createSession(validatedToken)),
      map((session) => {
        localStorage.setItem('session_id', session.session_id);
        return session.session_id;
      }),
      switchMap((sessionId) => this.getAccount(sessionId)),
      tap((user) => {
        this.user.next(user);
      }),
      catchError((error) => throwError(() => error))
    );
  }

  logout(): Observable<unknown> {
    const sessionId = localStorage.getItem('session_id');

    return (sessionId ? this.deleteSession(sessionId) : of(null)).pipe(
      tap(() => {
        localStorage.removeItem('session_id');
        this.user.next(null);
      })
    );
  }
}
