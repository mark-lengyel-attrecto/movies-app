import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-top-rated',
  template: `<app-movie-list [movieData$]="movieData$()" />`,
  styleUrls: ['./top-rated.component.scss'],
  standalone: true,
  imports: [RouterLink, MovieListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRatedComponent implements OnInit {
  @HostBinding('class') hostClasses = 'overflow-auto flex-grow-1';

  movieData$ = signal(this.movieService.getTopRated());

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
          this.movieService.getTopRated(parseInt(params['page']) || 1)
        );
      });
  }
}
