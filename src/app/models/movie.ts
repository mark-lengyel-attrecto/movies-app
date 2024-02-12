import { Crew } from "./crew";
import { Cast } from "./cast";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<unknown>;
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
}
