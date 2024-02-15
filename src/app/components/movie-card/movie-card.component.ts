import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { map } from 'rxjs';
import { Genre } from 'src/app/models/genre';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;

  genreString: string = '';
  releaseDate: string = '';

  constructor(protected movieService: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getGenreString();
    this.getReleaseDate();
  }

  openDialog(movie: Movie): void {
    let dialogWidth = '50%';

    if (window.innerWidth < 600) {
      dialogWidth = '100%';
    }

    this.dialog.open(DialogComponent, {
      width: dialogWidth,
      data: { id: movie.id },
    });
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
