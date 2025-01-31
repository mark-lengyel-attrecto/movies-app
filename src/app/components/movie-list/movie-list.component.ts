import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { startWith } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { PAGE_SIZE } from 'src/app/configs/app.config';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  imports: [AsyncPipe, MovieCardComponent, PaginatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  movieData$ = input(this.movieService.getPopular());

  movieDataWithSkeleton$ = computed(() => {
    const pageParam =
      parseInt(this.activatedRoute.snapshot.queryParams['page']) || 1;

    return this.movieData$().pipe(
      startWith({
        page: pageParam,
        results: Array<Movie>(PAGE_SIZE),
        total_pages: pageParam + 10,
        total_results: PAGE_SIZE,
      })
    );
  });

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}
}
