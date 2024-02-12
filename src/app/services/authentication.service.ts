import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {environment} from "src/environments/environment";
import {User} from "src/app/models/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(AuthenticationService.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private static saveUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private static getUser(): User | null {
    const localStorageUser = localStorage.getItem('currentUser');
    if (localStorageUser) {
      return JSON.parse(localStorageUser);
    }
    return null;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.emailApiUrl}/users/authenticate`, {username, password})
      .pipe(map(user => {
        user.authdata = window.btoa(username + ':' + password);
        AuthenticationService.saveUser(user);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
