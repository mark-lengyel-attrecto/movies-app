import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {MovieService} from "../../services/movie.service";
import {PaginatedMovieResponse} from "../../models/paginated-response";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  movieData: Observable<PaginatedMovieResponse> = new Observable<PaginatedMovieResponse>();

  constructor(public movieService: MovieService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.movieData = this.movieService.getTopRated(parseInt(params['page'] ?? 1));
    })
  }
}
