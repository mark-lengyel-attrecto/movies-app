import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ApiKeyInterceptor } from './app/interceptors/api-key.interceptor';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import {
  PreloadAllModules,
  provideRouter,
  Route,
  withPreloading,
} from '@angular/router';
import { AuthGuard } from './app/guards/auth.guard';
import { LoginGuard } from './app/guards/login.guard';

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./app/pages/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
    canActivate: [LoginGuard],
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
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  ],
}).catch((err) => console.error(err));
