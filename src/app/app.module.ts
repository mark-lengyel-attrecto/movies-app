import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { TopRatedComponent } from './pages/top-rated/top-rated.component';
import { PopularComponent } from './pages/popular/popular.component';
import { SearchComponent } from './pages/search/search.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend.interceptor';
import { ApiKeyInterceptor } from './helpers/api-key.interceptor';
import { ReleaseDatePipe } from './helpers/release-date.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

const components = [DialogComponent, MovieCardComponent, MovieListComponent, NavbarComponent, PaginatorComponent];

const pages = [HomeComponent, LoginComponent, PopularComponent, SearchComponent, TopRatedComponent];

const pipes = [ReleaseDatePipe];

@NgModule({
  declarations: [AppComponent, ...components, ...pages, ...pipes],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
