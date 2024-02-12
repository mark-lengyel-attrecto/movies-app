import { Movie } from "src/app/models/movie";

export interface Response {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}
