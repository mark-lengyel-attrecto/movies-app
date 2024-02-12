import {Component, OnInit} from '@angular/core';
import {NavbarElement} from "../../models/navbar-element";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {TmdbService} from "../../services/tmdb.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public navbarElements: NavbarElement[];

  public searchTerm: string = '';

  constructor(public movieService: TmdbService, public authenticationService: AuthenticationService, public router: Router) {
    this.navbarElements = [
      {name: "Home", route: "/home"},
      {name: "Top Rated", route: "/top-rated"},
      {name: "Popular", route: "/popular"},
      {name: "Search", route: "/search"},
    ];
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authenticationService.currentUserValue !== null;
  }

  public isSearchPage(navbarElement: NavbarElement): boolean {
    return this.router.url.endsWith('/search') && (navbarElement.route == '/search')
  }

  public searchForTerm(searchTerm: string): void {
    this.movieService.searchTermChange.next(searchTerm)
  }

  public logout(): void {
    this.authenticationService.logout()
  }

}
