import {
  Component,
  DestroyRef,
  HostBinding,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `<app-movie-list [movieData$]="movieData$()" />`,
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [MovieListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
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
        if (params['query']) {
          this.movieData$.set(
            this.movieService.search(
              params['query'],
              parseInt(params['page']) || 1
            )
          );
        }
      });
  }
}
