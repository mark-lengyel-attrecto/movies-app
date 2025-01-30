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
  private baseUrl = environment.movieApi.baseUrl;
  private language: string = 'en-US';

  private genreResponse: Connectable<GenreResponse> | undefined = undefined;

  constructor(private http: HttpClient) {}

  getPosterUrl(resolution = 'w200'): string {
    return `${environment.movieApi.imageBaseUrl}/t/p/${resolution}`;
  }

  getImdbUrl(imdbId: string) {
    return `${environment.imdbBaseUrl}/title/${imdbId}`;
  }

  getAllGenres(): Connectable<GenreResponse> {
    if (!this.genreResponse) {
      this.genreResponse = connectable(
        this.http.get<GenreResponse>(`${this.baseUrl}/genre/movie/list`, {
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
    return this.http.get<PaginatedMovieResponse>(
      `${this.baseUrl}/movie/popular`,
      {
        params: {
          page: page,
          language: this.language,
        },
      }
    );
  }

  getTopRated(page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(
      `${this.baseUrl}/movie/top_rated`,
      {
        params: {
          page: page,
          language: this.language,
        },
      }
    );
  }

  getTrending(page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(
      `${this.baseUrl}/trending/movie/week`,
      {
        params: {
          page: page,
          language: this.language,
        },
      }
    );
  }

  search(query: string, page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(
      `${this.baseUrl}/search/movie`,
      {
        params: {
          page: page,
          query: query,
          include_adult: false,
          language: this.language,
        },
      }
    );
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${movieId}`, {
      params: {
        language: this.language,
      },
    });
  }
}
