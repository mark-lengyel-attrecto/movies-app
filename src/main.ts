import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FakeBackendInterceptor } from './app/interceptors/fake-backend.interceptor';
import { ApiKeyInterceptor } from './app/interceptors/api-key.interceptor';
import { ErrorInterceptor } from './app/interceptors/error.interceptor';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import {
  PreloadAllModules,
  provideRouter,
  Route,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { AuthGuard } from './app/auth/auth.guard';

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./app/pages/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./app/pages/home/home.component').then(
        (mod) => mod.HomeComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'popular',
    loadComponent: () =>
      import('./app/pages/popular/popular.component').then(
        (mod) => mod.PopularComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'top-rated',
    loadComponent: () =>
      import('./app/pages/top-rated/top-rated.component').then(
        (mod) => mod.TopRatedComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./app/pages/search/search.component').then(
        (mod) => mod.SearchComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],
}).catch((err) => console.error(err));
