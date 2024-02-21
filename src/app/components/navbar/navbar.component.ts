import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarElement } from '../../interfaces/navbar-element.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Theme,
  ThemeSwitcherService,
} from 'src/app/services/theme-switcher.service';
import { map } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgClass, AsyncPipe],
})
export class NavbarComponent implements OnInit {
  searchForm!: FormGroup;
  @ViewChild('searchFormElement') searchFromElement!: NgForm;

  readonly theme = Theme;

  iconClass$ = this.themeSwitcher.getCurrentTheme().pipe(
    map((theme) => {
      return theme === Theme.DARK ? 'bi-sun' : 'bi-moon';
    })
  );

  navbarElements: NavbarElement[];
  hasFocus: boolean = false;

  private collapsed: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private themeSwitcher: ThemeSwitcherService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private destroyRef: DestroyRef
  ) {
    this.navbarElements = [
      { name: 'Home', route: '/home' },
      { name: 'Top Rated', route: '/top-rated' },
      { name: 'Popular', route: '/popular' },
    ];
  }

  get isCollapsed(): boolean {
    return this.collapsed;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.searchFromElement = new NgForm([], []);

    this.subscribeToQueryParams();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.currentUserValue !== null;
  }

  isActive(navbarElement: NavbarElement): boolean {
    const url = this.router.url.split('?')?.[0] || this.router.url;
    return url.endsWith(navbarElement.route);
  }

  searchForTerm(): void {
    this.hasFocus = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      this.router.navigate(['/search'], {
        queryParams: {
          query: this.searchForm.get('search')?.value || '',
          page: 1,
        },
      });
    }
  }

  hasSearchError(): boolean {
    if (this.searchFromElement) {
      return (
        this.searchFromElement.submitted &&
        this.searchForm.invalid &&
        this.hasFocus
      );
    } else {
      return false;
    }
  }

  logout(): void {
    this.searchForm.get('search')?.setValue('');
    this.authenticationService.logout();
  }

  getUsername(): string {
    const user = this.authenticationService.getUser();

    if (user) {
      return user.username;
    } else {
      return '';
    }
  }

  setFocus(setting: boolean): void {
    this.hasFocus = setting;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  toggleDarkMode(): void {
    this.themeSwitcher.toggleDarkMode();
  }

  private subscribeToQueryParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        if (params['query']) {
          this.searchForm.get('search')?.patchValue(params['query']);
        } else {
          this.searchForm.get('search')?.patchValue('');
        }
      });
  }
}
