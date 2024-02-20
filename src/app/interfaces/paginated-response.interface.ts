import { Movie } from './movie.interface';

export interface PaginatedResponse<ListType> {
  page: number;
  results: Array<ListType>;
  total_pages: number;
  total_results: number;
}

export type PaginatedMovieResponse = PaginatedResponse<Movie>;
