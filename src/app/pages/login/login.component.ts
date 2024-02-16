import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') hostClasses = 'overflow-auto flex-grow-1';

  @ViewChild('loginFormElement') loginFormElement!: NgForm;

  loginForm!: FormGroup;
  loading: boolean = false;
  returnUrl: string = '';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  get loginFormControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  hasError(formControlName: string, errorType: string | null = null): boolean {
    if (errorType != null) {
      return this.loginFormControls[formControlName].hasError(errorType);
    } else {
      return this.loginFormControls[formControlName].invalid;
    }
  }

  isErrorOutputEnabled(formControlName: string): boolean {
    if (this.loginFormElement) {
      return this.hasError(formControlName) && this.loginFormElement.submitted;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.authenticationService
        .login(this.loginFormControls['username'].value, this.loginFormControls['password'].value)
        .subscribe({
          next: () => {
            this.router.navigate([this.returnUrl]);
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            switch (error.status) {
              case 404:
                this.error = 'Wrong username or password!';
                break;
              default:
                this.error = error.message;
            }
          },
        });
    }
  }
}
