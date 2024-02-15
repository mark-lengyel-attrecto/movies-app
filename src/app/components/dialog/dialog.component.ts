import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

import { environment } from 'src/environments/environment';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  movieData: Movie | null = null;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public movieService: MovieService
  ) {
    movieService.getMovieById(data.id).subscribe({
      next: (movie) => {
        this.movieData = movie;
      },
      error: () => {
        this.movieData = null;
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getGenreString(movieData: Movie): string {
    return this.getListString<Genre>(movieData.genres, 'name');
  }

  getReleaseYear(movieData: Movie): string {
    return movieData.release_date;
  }

  getLengthString(movieData: Movie): string {
    const hour = Math.floor(movieData.runtime / 60);
    const minute = movieData.runtime - hour * 60;

    let lengthString: string;

    if (hour > 0) {
      lengthString = `${hour} hour ${minute} minute`;
    } else {
      lengthString = `${minute} minute`;
    }

    return lengthString;
  }

  getMovieCountries(movieData: Movie): string {
    return this.getListString<{ iso_3166_1: string; name: string }>(movieData.production_countries, 'name');
  }

  public getListString<ModelType>(list: ModelType[], propertyName: Extract<keyof ModelType, string>) {
    return list.reduce((previousValue: string, currentValue: ModelType, currentIndex: number) => {
      let subString = previousValue + currentValue[propertyName];

      if (currentIndex < list.length - 1) {
        subString += ', ';
      }

      return subString;
    }, '');
  }

  getIMDBLink(movieData: Movie): string {
    return `${environment.imdbBaseUrl}/${movieData.imdb_id}`;
  }
}
