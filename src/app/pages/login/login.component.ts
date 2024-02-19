import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgClass, NgIf],
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

  hasError(formControlName: string, errorType: string | null = null): boolean {
    if (errorType != null) {
      return this.loginForm.get(formControlName)?.hasError(errorType) || false;
    } else {
      return this.loginForm.get(formControlName)?.invalid || false;
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
        .login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
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
