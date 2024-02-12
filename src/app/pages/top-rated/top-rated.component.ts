import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {TmdbService} from "../../services/tmdb.service";
import {Response} from "../../models/response";

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  movieData: Observable<Response> = new Observable<Response>();

  constructor(public movieService: TmdbService) {
  }

  ngOnInit(): void {
    this.movieData = this.movieService.getTopRated();
  }
}
