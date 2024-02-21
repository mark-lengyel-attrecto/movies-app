import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  input,
  signal,
} from '@angular/core';
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
  movie = input<Movie>();
  genres: WritableSignal<{ [key: number]: Genre }> = signal({});

  genreString = computed(() => {
    const genres = this.genres();
    const movie = this.movie();

    if (!genres || !movie?.genre_ids.length) {
      return '';
    } else {
      let genreStrings: string[] = [];

      movie.genre_ids.forEach((genreId) => {
        genres[genreId] && genreStrings.push(genres[genreId].name);
      });

      return genreStrings.join(', ');
    }
  });

  releaseDate = computed(() => {
    return this.movie()?.release_date || '';
  });

  constructor(protected movieService: MovieService) {}

  ngOnInit(): void {
    if (this.movie()) {
      this.fetchGenres();
    }
  }

  private fetchGenres(): void {
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
      .subscribe((genres) => {
        this.genres.set(genres);
      });
  }
}
