import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PaginatedMovieResponse } from '../interfaces/paginated-response.interface';
import { Movie } from '../interfaces/movie.interface';

import { environment } from '../../environments/environment';
import { GenreResponse } from '../interfaces/genre-response.interface';
import { Connectable, Observable, ReplaySubject, connectable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public posterBase: string = environment.movieApi.posterBase;
  public posterBaseHighRes: string = environment.movieApi.posterBaseHighRes;
  private language: string = 'en-US';

  private genreResponse: Connectable<GenreResponse> | undefined = undefined;

  constructor(private http: HttpClient) {}

  getAllGenres(): Connectable<GenreResponse> {
    if (!this.genreResponse) {
      this.genreResponse = connectable(
        this.http.get<GenreResponse>(environment.movieApi.genres, {
          params: {
            language: this.language,
          },
        }),
        { connector: () => new ReplaySubject(1), resetOnDisconnect: false }
      );

      this.genreResponse.connect();
    }

    return this.genreResponse;
  }

  getPopular(page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(environment.movieApi.popular, {
      params: {
        page: page,
        language: this.language,
      },
    });
  }

  getTopRated(page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(
      environment.movieApi.topRated,
      {
        params: {
          page: page,
          language: this.language,
        },
      }
    );
  }

  getTrending(page: number = 1): Observable<PaginatedMovieResponse> {
    // some movie titles missing from response
    return this.http.get<PaginatedMovieResponse>(
      environment.movieApi.trending,
      {
        params: {
          page: page,
          language: this.language,
        },
      }
    );
  }

  search(query: string, page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(environment.movieApi.search, {
      params: {
        page: page,
        query: query,
        include_adult: false,
        language: this.language,
      },
    });
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(environment.movieApi.details + `/${movieId}`, {
      params: {
        language: this.language,
      },
    });
  }
}
