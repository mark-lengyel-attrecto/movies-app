import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "src/app/pages/login/login.component";
import {AuthGuard} from "src/app/helpers/auth.guard";
import {HomeComponent} from "src/app/pages/home/home.component";
import {PopularComponent} from "./pages/popular/popular.component";
import {TopRatedComponent} from "./pages/top-rated/top-rated.component";
import {SearchComponent} from "./pages/search/search.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'popular', component: PopularComponent, canActivate: [AuthGuard]},
  {path: 'top-rated', component: TopRatedComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
