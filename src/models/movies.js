export default class Movies {
  constructor() {
    this._movies = null;
  }

  get movies() {
    return this._movies;
  }

  set movies(movies) {
    this._movies = Array.from(movies);
  }

  updateMovie(id, movie) {
    this._movies[id] = movie;
  }
}
