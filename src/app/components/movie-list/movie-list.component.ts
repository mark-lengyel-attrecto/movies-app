import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from "../../services/tmdb.service";
import {Observable} from "rxjs";

import {Response} from "../../models/response";
import {Movie} from "../../models/movie";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movieData: Observable<Response> = new Observable<Response>();
  movies: Movie[] = [];

  constructor(public movieService: TmdbService) {
  }

  getMovieData(): void {
    this.movieData.subscribe((response) => {this.movies = response.results});
  }

  ngOnInit(): void {
    this.getMovieData();
  }

  ngOnChanges(): void {
    this.getMovieData();
  }
}
