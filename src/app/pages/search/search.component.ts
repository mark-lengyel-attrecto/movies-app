import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { PaginatedMovieResponse } from '../../models/paginated-response';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [RouterLink, MovieListComponent],
})
export class SearchComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClasses = 'overflow-auto flex-grow-1';

  private destroy$ = new Subject<void>();

  movieData: Observable<PaginatedMovieResponse> = new Observable<PaginatedMovieResponse>();

  constructor(public movieService: MovieService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscribeToQueryParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToQueryParams(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['query']) {
        this.movieData = this.movieService.search(params['query'], parseInt(params['page'] ?? 1));
      } else {
        this.movieData = this.movieService.getPopular();
      }
    });
  }
}
