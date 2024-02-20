import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable, switchMap } from 'rxjs';
import { PaginatedMovieResponse } from '../../models/paginated-response';
import { Movie } from '../../models/movie';
import { Router } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [MovieCardComponent, PaginatorComponent],
})
export class MovieListComponent implements OnChanges {
  @Input() movieData: Observable<PaginatedMovieResponse>;

  @HostBinding('class') hostClass = 'h-100';

  currentResponse: PaginatedMovieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 };
  isLoading: boolean = true;

  constructor(public movieService: MovieService, private router: Router) {
    this.movieData = movieService.getAllGenres().pipe(switchMap(() => movieService.getPopular()));
  }

  getResponseData(): void {
    this.isLoading = true;
    this.movieData.subscribe((response) => {
      this.currentResponse = response;
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieData'].previousValue !== changes['movieData'].currentValue) {
      this.getResponseData();
    }
  }

  public get movies(): Movie[] {
    return this.currentResponse.results;
  }

  onSearchPage(): boolean {
    return this.router.url.split('?')[0].endsWith('/search');
  }
}
