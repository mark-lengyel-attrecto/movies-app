import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable, switchMap } from 'rxjs';
import { PaginatedMovieResponse } from '../../interfaces/paginated-response.interface';
import { Movie } from '../../interfaces/movie.interface';
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
  @Input() movieData: Observable<PaginatedMovieResponse> = this.movieService
    .getAllGenres()
    .pipe(switchMap(() => this.movieService.getPopular()));

  private readonly defaultResponse: PaginatedMovieResponse = {
    page: 0,
    results: Array<Movie>(20),
    total_pages: 10,
    total_results: 20,
  };

  currentResponse: PaginatedMovieResponse = this.defaultResponse;
  isLoading: boolean = true;

  constructor(public movieService: MovieService) {}

  get movies(): Movie[] {
    return this.currentResponse.results;
  }

  getResponseData(): void {
    this.isLoading = true;
    this.currentResponse = this.defaultResponse;
    this.movieData.subscribe((response) => {
      this.currentResponse = response;
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['movieData'].previousValue !== changes['movieData'].currentValue
    ) {
      this.getResponseData();
    }
  }
}
