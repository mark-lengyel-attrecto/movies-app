import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { PaginatedMovieResponse } from '../../models/paginated-response';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterLink, MovieListComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
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
      this.movieData = this.movieService.getTrending(parseInt(params['page'] ?? 1));
    });
  }
}
