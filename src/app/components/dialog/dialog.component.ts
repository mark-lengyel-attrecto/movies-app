import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from '../../services/movie.service';

import { Genre } from '../../interfaces/genre.interface';
import * as bootstrap from 'bootstrap';
import { ReleaseDatePipe } from '../../pipes/release-date.pipe';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [ReleaseDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements AfterViewInit {
  @Input() movieId: number | undefined = undefined;

  @ViewChild('modal') modalElement!: ElementRef;

  modal!: bootstrap.Modal;
  movie: WritableSignal<Movie | undefined> = signal(undefined);

  imdbLink = computed(() => {
    return this.movieService.getImdbUrl(this.movie()?.imdb_id || '');
  });

  genreString = computed(() =>
    this.getListString<Genre>(this.movie()?.genres || [], 'name')
  );

  releaseYear = computed(() => this.movie()?.release_date || '');

  lengthString = computed(() => {
    const runtime = this.movie()?.runtime || 0;
    const hour = Math.floor(runtime / 60);
    const minute = runtime - hour * 60;

    let lengthString: string;

    if (hour > 0) {
      lengthString = `${hour} hour ${minute} minute`;
    } else {
      lengthString = `${minute} minute`;
    }

    return lengthString;
  });

  movieCountries = computed(() =>
    this.getListString<{ iso_3166_1: string; name: string }>(
      this.movie()?.production_countries || [],
      'name'
    )
  );

  backdropUrl = computed(() => {
    return `${this.movieService.getPosterUrl('w500')}${
      this.movie()?.backdrop_path
    }`;
  });

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

  private fetchMovieData(): void {
    if (!this.movieId) {
      return;
    }

    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movie.set(movie);
      },
      error: () => {
        this.movie.set(undefined);
      },
    });
  }

  private getListString<ModelType>(
    list: ModelType[],
    propertyName: Extract<keyof ModelType, string>
  ) {
    return (list || []).reduce(
      (
        previousValue: string,
        currentValue: ModelType,
        currentIndex: number
      ) => {
        let subString = previousValue + currentValue[propertyName];

        if (currentIndex < list.length - 1) {
          subString += ', ';
        }

        return subString;
      },
      ''
    );
  }
}
