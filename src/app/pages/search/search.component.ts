import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {TmdbService} from "../../services/tmdb.service";
import {Response} from "../../models/response";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  movieData: Observable<Response> = new Observable<Response>();

  constructor(public movieService: TmdbService) {
  }

  ngOnInit(): void {
    this.movieService.searchTermChange.subscribe({
      next: (searchTerm) => {
        if (searchTerm !== '') {
          this.movieData = this.movieService.search(searchTerm);
        }
        else {
          this.movieData = this.movieService.getPopular();
        }
      }
    });
  }
}
