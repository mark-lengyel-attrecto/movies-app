import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
class LoginGuardModel {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate() {
    return this.authenticationService.initialized$.pipe(
      filter((initialized) => initialized),
      map(() => {
        const canActivate = !this.authenticationService.user.value;

        if (!canActivate) {
          this.router.navigate(['/home']);
        }

        return canActivate;
      })
    );
  }
}

export const LoginGuard: CanActivateFn = () => {
  return inject(LoginGuardModel).canActivate();
};
