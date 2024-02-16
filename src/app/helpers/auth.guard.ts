import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
class PermissionService {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let onLogin: boolean = state.url.split('?')[0].startsWith('/login');

    if (this.authenticationService.currentUserValue) {
      if (onLogin) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    if (onLogin) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivate(next, state);
};
