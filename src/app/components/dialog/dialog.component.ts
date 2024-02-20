import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

import { environment } from 'src/environments/environment';
import { Genre } from '../../models/genre';
import * as bootstrap from 'bootstrap';
import { ReleaseDatePipe } from '../../helpers/release-date.pipe';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [ReleaseDatePipe],
})
export class DialogComponent implements AfterViewInit {
  @Input() movieId: number | null = null;

  @ViewChild('modal') modalElement!: ElementRef;

  readonly baseUrl: string = this.movieService.posterBaseHighRes;

  modal!: bootstrap.Modal;
  movieData: Movie | null = null;

  constructor(private movieService: MovieService) {}

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  openDialog(): void {
    this.fetchMovieData();
    this.modal.show();
  }

  closeDialog(): void {
    this.modal.hide();
  }

  fetchMovieData(): void {
    if (!this.movieId) {
      return;
    }

    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movieData = movie;
      },
      error: () => {
        this.movieData = null;
      },
    });
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

  getListString<ModelType>(list: ModelType[], propertyName: Extract<keyof ModelType, string>) {
    return (list || []).reduce((previousValue: string, currentValue: ModelType, currentIndex: number) => {
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
