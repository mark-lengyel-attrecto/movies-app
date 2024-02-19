import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavbarElement } from '../../models/navbar-element';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Theme, ThemeSwitcherService } from 'src/app/services/theme-switcher.service';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  @ViewChild('searchFormElement') searchFromElement!: NgForm;

  private destroy$ = new Subject<void>();

  readonly theme = Theme;

  switcherClasses$ = this.themeSwitcher.getCurrentTheme().pipe(
    map((theme) => {
      if (theme === Theme.DARK) {
        return 'bi bi-sun text-body pointer';
      } else {
        return 'bi bi-moon text-body pointer';
      }
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
    private formBuilder: FormBuilder
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.currentUserValue !== null;
  }

  isActive(navbarElement: NavbarElement): boolean {
    return this.router.url.endsWith(navbarElement.route);
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
      return this.searchFromElement.submitted && this.searchForm.invalid && this.hasFocus;
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
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['query']) {
        this.searchForm.get('search')?.patchValue(params['query']);
      } else {
        this.searchForm.get('search')?.patchValue('');
      }
    });
  }
}
