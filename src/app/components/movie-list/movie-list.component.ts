import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { PaginatedMovieResponse, PaginatedResponse } from '../../models/paginated-response';
import { Movie } from '../../models/movie';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { Genre } from '../../models/genre';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnChanges {
  @Input() movieData: Observable<PaginatedMovieResponse>;

  currentResponse: PaginatedMovieResponse = { page: 0, results: [], total_pages: 0, total_results: 0 };
  allGenres: Genre[] = [];
  paginatorSize: number = 5;
  isLoading: boolean = true;

  constructor(public movieService: MovieService, public dialog: MatDialog, private router: Router) {
    this.movieData = movieService.getPopular();
  }

  getResponseData(): void {
    this.isLoading = true;
    this.movieData.subscribe((response) => {
      this.currentResponse = response;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.movieService.getAllGenres().subscribe((response) => {
      this.allGenres = [];
      for (let genre of response.genres) {
        this.allGenres[genre.id] = genre;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieData'].previousValue !== changes['movieData'].currentValue) {
      this.getResponseData();
    }
  }

  public get movies(): Movie[] {
    return this.currentResponse.results;
  }

  public getGenreString(movie: Movie): string {
    if (this.allGenres.length === 0 || movie.genre_ids.length === 0) {
      return '';
    } else {
      let genreStrings: string[] = [];

      for (let genreId of movie.genre_ids) {
        if (this.allGenres[genreId]) {
          genreStrings.push(this.allGenres[genreId].name);
        }
      }

      return genreStrings.join(', ');
    }
  }

  public getReleaseDate(movie: Movie): string {
    if (!movie.release_date) {
      return '';
    } else {
      return movie.release_date;
    }
  }

  public isCurrentPage(page: number) {
    return page === this.currentResponse.page;
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

  getPaginatorRange(): number[] {
    const totalPages = this.currentResponse.total_pages;
    let start = this.currentResponse.page - Math.floor(this.paginatorSize / 2);
    let end = this.currentResponse.page + Math.floor(this.paginatorSize / 2);

    if (totalPages <= this.paginatorSize) {
      start = 1;
      end = totalPages;
    } else if (start < 1) {
      start = 1;
      end = start + (this.paginatorSize - 1);
    } else if (end > totalPages) {
      end = totalPages;
      start = end - (this.paginatorSize - 1);
    }

    let numberArray: number[] = [];
    for (let i = start; i <= end; i++) {
      numberArray.push(i);
    }

    return numberArray;
  }

  jumpToPage(page: number): void {
    if (page < 1 || page > this.currentResponse.total_pages || page === this.currentResponse.page) {
      return;
    } else {
      const urlTree = this.router.createUrlTree([], {
        queryParams: { page: page },
        queryParamsHandling: 'merge',
        preserveFragment: true,
      });

      this.router.navigateByUrl(urlTree);
    }
  }

  onSearchPage(): boolean {
    return this.router.url.split('?')[0].endsWith('/search');
  }
}
