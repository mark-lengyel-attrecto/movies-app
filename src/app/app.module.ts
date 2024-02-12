import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthInterceptor } from "./helpers/auth.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { fakeBackendProvider } from "./helpers/fake-backend.interceptor";
import { NavbarComponent } from './components/navbar/navbar.component';
import {ApiKeyInterceptor} from "./helpers/api-key.interceptor";
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { TopRatedComponent } from './pages/top-rated/top-rated.component';
import { PopularComponent } from './pages/popular/popular.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    MovieListComponent,
    TopRatedComponent,
    PopularComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true},
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
