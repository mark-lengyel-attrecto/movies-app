import { Crew } from "./crew";
import { Cast } from "./cast";
import {Genre} from "./genre";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  crew_list: Array<Crew>;
  cast_list: Array<Cast>;
  genres: Array<Genre>;
  runtime: number;
  production_countries: Array<{iso_3166_1: string, name: string}>;
  imdb_id: string;
}