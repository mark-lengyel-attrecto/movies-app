import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { PaginatedMovieResponse } from '../../models/paginated-response';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent implements OnInit, OnDestroy {
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
      this.movieData = this.movieService.getTopRated(parseInt(params['page'] ?? 1));
    });
  }
}
