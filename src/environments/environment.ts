export const environment = {
  movieApi: {
    key: import.meta.env.NG_APP_TMDB_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org',
  },
  imdbBaseUrl: 'https://www.imdb.com/',
  production: false,
};
