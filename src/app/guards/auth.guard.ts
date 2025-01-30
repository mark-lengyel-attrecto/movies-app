import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuardModel {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate() {
    return this.authenticationService.initialized$.pipe(
      filter((initialized) => initialized),
      map(() => {
        const canActivate = !!this.authenticationService.user.value;

        if (!canActivate) {
          this.router.navigate(['/login']);
        }

        return canActivate;
      })
    );
  }
}

export const AuthGuard: CanActivateFn = () => {
  return inject(AuthGuardModel).canActivate();
};
