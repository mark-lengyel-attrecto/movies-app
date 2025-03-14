import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedMovieResponse } from 'src/app/interfaces/paginated-response.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
})
export class PaginatorComponent {
  @Input({ required: true }) movieData!: PaginatedMovieResponse;

  paginatorSize: number = 5;

  constructor(private router: Router) {}

  jumpToPage(page: number): void {
    if (
      page < 1 ||
      page > this.movieData.total_pages ||
      page === this.movieData.page
    ) {
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

  getPaginatorRange(): number[] {
    const totalPages = this.movieData.total_pages;
    let start = this.movieData.page - Math.floor(this.paginatorSize / 2);
    let end = this.movieData.page + Math.floor(this.paginatorSize / 2);

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

  isCurrentPage(page: number) {
    return page === this.movieData?.page;
  }
}
