// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  emailApiUrl: 'http://localhost:4200',
  movieApi: {
    key: '1c5abaaeaa13c66b570ad3042a0d51f4',
    posterBase: 'https://image.tmdb.org/t/p/w200',
    posterBaseHighRes: 'https://image.tmdb.org/t/p/w500',
    configuration: 'https://api.themoviedb.org/3/configuration', //?api_key=<api_key>&language=en-US
    popular: 'https://api.themoviedb.org/3/movie/popular',
    topRated: 'https://api.themoviedb.org/3/movie/top_rated',
    trending: 'https://api.themoviedb.org/3/trending/movie/week',
    search: 'https://api.themoviedb.org/3/search/movie',
    details: 'https://api.themoviedb.org/3/movie',
    genres: 'https://api.themoviedb.org/3/genre/movie/list'
  },
  imdbBaseUrl: 'https://www.imdb.com/title',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
