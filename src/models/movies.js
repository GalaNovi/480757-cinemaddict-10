import {sortMovies} from '../utils/sort';
import {filterMovies} from '../utils/filter';
import {DEFAULT_SORT_TYPE, FilterType} from '../const';

export default class Movies {
  constructor(api) {
    this._api = api;
    this._movies = null;
    this._comments = new Set();
    this._filterType = FilterType.ALL;
    this._sortType = DEFAULT_SORT_TYPE;
    this._filterChangeHandler = null;
  }

  get movies() {
    return this._movies;
  }

  get comments() {
    return Array.from(this._comments);
  }

  get filterType() {
    return this._filterType;
  }

  get sortType() {
    return this._sortType;
  }

  set movies(movies) {
    this._movies = Array.from(movies);
  }

  getMovies() {
    return this._api.getMovies()
      .then((movies) => {
        this.movies = movies;
        return movies;
      });
  }

  getComments(movieId) {
    return this._api.getComments(movieId)
      .then((comments) => {
        comments.forEach((comment) => this._comments.add(comment))
      });
  }

  getMoviesForRender() {
    let moviesCopy = this._movies.slice();
    moviesCopy = filterMovies(moviesCopy, this._filterType);
    moviesCopy = sortMovies(moviesCopy, this._sortType);
    return moviesCopy;
  }

  updateMovie(oldMovieId, newMovie) {
    return this._api.updateMovie(oldMovieId, newMovie)
      .then(() => {
        this._movies = this._movies.map((movie) => movie.id === oldMovieId ? newMovie : movie);
      });
  }

  deleteComment(commentId) {
    this._api.deleteComment(commentId)
      .then(() => {
        this._comments = this._comments.filter((comment) => Number(comment.id) !== commentId);
      });
  }

  createComment(movieId, comment) {
    return this._api.createComment(movieId, comment)
      .then(({newMovie, comments}) => {
        this._movies = this._movies.map((movie) => movie.id === newMovie.id ? newMovie : movie);
      });
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandler = handler;
  }

  setSort(sortType) {
    this._sortType = sortType;
    this._sortChangeHandler();
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandler = handler;
  }

  setFilter(filterType) {
    this._filterType = filterType;
    this._filterChangeHandler();
  }
}
