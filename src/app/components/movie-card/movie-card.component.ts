import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Genre } from 'src/app/interfaces/genre.interface';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import { ReleaseDatePipe } from '../../pipes/release-date.pipe';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [DialogComponent, ReleaseDatePipe],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;

  genreString: string = '';
  releaseDate: string = '';

  constructor(protected movieService: MovieService) {}

  ngOnInit(): void {
    this.getGenreString();
    this.getReleaseDate();
  }

  public getGenreString(): void {
    this.movieService
      .getAllGenres()
      .pipe(
        map((response) =>
          response.genres.reduce<{ [key: number]: Genre }>(
            (allGenres, genre) => ({ ...allGenres, [genre.id]: genre }),
            {}
          )
        )
      )
      .subscribe((allGenres) => {
        if (!allGenres || this.movie.genre_ids.length === 0) {
          this.genreString = '';
        } else {
          let genreStrings: string[] = [];

          this.movie.genre_ids.forEach((genreId) => {
            allGenres[genreId] && genreStrings.push(allGenres[genreId].name);
          });

          this.genreString = genreStrings.join(', ');
        }
      });
  }

  public getReleaseDate(): void {
    if (!this.movie.release_date) {
      this.releaseDate = '';
    } else {
      this.releaseDate = this.movie.release_date;
    }
  }
}
