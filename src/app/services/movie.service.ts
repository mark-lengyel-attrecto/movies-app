import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, connectable, ReplaySubject, Connectable} from "rxjs";

import {PaginatedMovieResponse} from "../models/paginated-response";
import {Movie} from "../models/movie";

import {environment} from "../../environments/environment";
import {GenreResponse} from '../models/genre-response';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public posterBase: string = environment.movieApi.posterBase;
  public posterBaseHighRes: string = environment.movieApi.posterBaseHighRes;
  private language: string = "en-US";

  private allGenres: Connectable<GenreResponse> | null = null;

  constructor(private http: HttpClient) {
  }

  getAllGenres(): Connectable<GenreResponse> {
    if (!this.allGenres) {
      this.allGenres = connectable(
        this.http.get<GenreResponse>(environment.movieApi.genres, {
          params: {
            language: this.language
          }
        }),
        { connector: () => new ReplaySubject(1), resetOnDisconnect: false }
      );

      this.allGenres.connect();
    }

    return this.allGenres;
  }

  getPopular(page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(environment.movieApi.popular, {
      params: {
        page: page,
        language: this.language
      }
    });
  }

  getTopRated(page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(environment.movieApi.topRated, {
      params: {
        page: page,
        language: this.language
      }
    });
  }

  getTrending(page: number = 1): Observable<PaginatedMovieResponse> { // some movie titles missing from response
    return this.http.get<PaginatedMovieResponse>(environment.movieApi.trending, {
      params: {
        page: page,
        language: this.language
      }
    });
  }

  search(query: string, page: number = 1): Observable<PaginatedMovieResponse> {
    return this.http.get<PaginatedMovieResponse>(environment.movieApi.search, {
      params: {
        page: page,
        query: query,
        include_adult: false,
        language: this.language
      }
    });
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(environment.movieApi.details + `/${movieId}`, {
      params: {
        language: this.language
      }
    });
  }
}
