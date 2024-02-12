import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {TmdbService} from "../../services/tmdb.service";
import {Response} from "../../models/response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movieData: Observable<Response> = new Observable<Response>();

  constructor(public movieService: TmdbService) {
  }

  ngOnInit(): void {
    this.movieData = this.movieService.getPopular();
  }
}
