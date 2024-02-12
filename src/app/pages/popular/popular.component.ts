import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {TmdbService} from "../../services/tmdb.service";
import {Response} from "../../models/response";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  movieData: Observable<Response> = new Observable<Response>();

  constructor(public movieService: TmdbService) {
  }

  ngOnInit(): void {
    this.movieData = this.movieService.getPopular();
  }
}
