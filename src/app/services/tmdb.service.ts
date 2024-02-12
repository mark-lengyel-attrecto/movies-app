import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Response} from "../models/response";

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private page: number = 1;
  public posterBase: string = environment.movieApi.posterBase;

  searchTermChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  getPopular(): Observable<Response> {
    return this.http.get<Response>(environment.movieApi.popular, {
      params: {
        page: this.page,
        language: "en-US"
      }
    });
  }

  getTopRated(): Observable<Response> {
    return this.http.get<Response>(environment.movieApi.topRated, {
      params: {
        page: this.page,
        language: "en-US"
      }
    });
  }

  getTrending(): Observable<Response> { // some movie titles missing from response
    return this.http.get<Response>(environment.movieApi.trending, {
      params: {
        page: this.page,
        language: "en-US"
      }
    });
  }

  search(searchTerm: string): Observable<Response> {
    return this.http.get<Response>(environment.movieApi.search, {
      params: {
        page: this.page,
        query: searchTerm,
        include_adult: false,
        language: "en-US"
      }
    });
  }
}
