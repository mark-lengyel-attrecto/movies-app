import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {MovieService} from "../../services/movie.service";
import {PaginatedMovieResponse, PaginatedResponse} from "../../models/paginated-response";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movieData: Observable<PaginatedMovieResponse> = new Observable<PaginatedMovieResponse>();

  constructor(public movieService: MovieService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.movieData = this.movieService.getTrending(parseInt(params['page'] ?? 1));
    })
  }
}
