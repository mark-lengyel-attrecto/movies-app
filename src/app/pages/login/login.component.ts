import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass],
})
export class LoginComponent implements OnInit {
  @HostBinding('class') hostClasses = 'overflow-auto flex-grow-1';

  @ViewChild('loginFormElement', { static: true }) loginFormElement =
    new NgForm([], []);

  loginForm!: FormGroup;
  loading: boolean = false;
  returnUrl: string = '/home';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.authenticationService
        .login(
          this.loginForm.get('username')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe({
          next: () => {
            this.router.navigate([this.returnUrl]);
          },
          error: (error) => {
            this.loading = false;
            this.error = error.message;
          },
        });
    }
  }
}
