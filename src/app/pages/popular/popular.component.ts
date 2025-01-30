import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  OnInit,
  signal,
} from '@angular/core';

import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-popular',
  template: `<app-movie-list [movieData$]="movieData$()" />`,
  styleUrls: ['./popular.component.scss'],
  standalone: true,
  imports: [MovieListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularComponent implements OnInit {
  @HostBinding('class') hostClasses = 'overflow-auto flex-grow-1';

  movieData$ = signal(this.movieService.getPopular());

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.subscribeToQueryParams();
  }

  private subscribeToQueryParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.movieData$.set(
          this.movieService.getPopular(parseInt(params['page']) || 1)
        );
      });
  }
}
