import {sortMovies} from '../utils/sort';
import {filterMovies} from '../utils/filter';
import {DEFAULT_SORT_TYPE, FilterType} from '../const';

export default class Movies {
  constructor(api) {
    this._api = api;
    this._movies = null;
    this._comments = [];
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

  getMovie(id) {
    return this._movies.find((movie) => movie.id === id);
  }

  getComments(movieId) {
    return this._api.getComments(movieId)
      .then((comments) => this._comments.push(...comments));
  }

  getMovieComments(movieId) {
    const movieCommentIds = this._movies.find((movie) => movie.id === movieId).comments;
    return movieCommentIds.map((id) => this._comments.find((comment) => comment.id === id));
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

  createComment(movie, newComment) {
    return this._api.createComment(movie.id, newComment)
      .then(({movie: newMovie, comments}) => {
        const newCommentData = comments.find((comment) => !movie.comments.find((id) => id === comment.id));
        this._comments.push(newCommentData);
        this._movies = this._movies.map((oldMovie) => oldMovie.id === newMovie.id ? newMovie : oldMovie);
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
