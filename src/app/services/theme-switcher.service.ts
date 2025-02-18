import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private currentTheme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    Theme.DARK
  );

  constructor() {
    this.fetchLocalStorage();
    this.updateHtmlAttribute();
  }

  getCurrentTheme(): Observable<Theme> {
    return this.currentTheme$.asObservable();
  }

  toggleDarkMode(): void {
    if (this.currentTheme$.value === Theme.DARK) {
      this.currentTheme$.next(Theme.LIGHT);
    } else {
      this.currentTheme$.next(Theme.DARK);
    }

    this.updateHtmlAttribute();
  }

  private fetchLocalStorage(): void {
    const theme = localStorage.getItem('theme') as Theme;
    if (theme) {
      this.currentTheme$.next(theme);
    }
  }

  private updateHtmlAttribute(): void {
    document
      .querySelector('html')
      ?.setAttribute('data-bs-theme', this.currentTheme$.value);
    localStorage.setItem('theme', this.currentTheme$.value);
  }
}
