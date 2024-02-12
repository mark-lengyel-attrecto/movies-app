import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarElement } from '../../models/navbar-element';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchForm!: FormGroup;
  @ViewChild('searchFormElement') searchFromElement!: NgForm;

  public navbarElements: NavbarElement[];
  public hasFocus: boolean = false;

  private collapsed: boolean = true;

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.navbarElements = [
      { name: 'Home', route: '/home' },
      { name: 'Top Rated', route: '/top-rated' },
      { name: 'Popular', route: '/popular' },
    ];
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.searchFromElement = new NgForm([], []);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.currentUserValue !== null;
  }

  isActive(navbarElement: NavbarElement): boolean {
    return this.router.url.endsWith(navbarElement.route);
  }

  public searchForTerm(): void {
    this.hasFocus = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      this.router.navigate(['/search'], {
        queryParams: {
          query: this.searchForm.controls['search'].value,
          page: 1,
        },
      });
    }
  }

  public hasSearchError(): boolean {
    if (this.searchFromElement) {
      return this.searchFromElement.submitted && this.searchForm.invalid && this.hasFocus;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.searchForm.controls['search'].setValue('');
    this.authenticationService.logout();
  }

  public getUsername(): string {
    const user = this.authenticationService.getUser();

    if (user) {
      return user.username;
    } else {
      return '';
    }
  }

  public setFocus(setting: boolean): void {
    this.hasFocus = setting;
  }

  public toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  public get isCollapsed(): boolean {
    return this.collapsed;
  }
}
