import {sortMovies} from '../utils/sort';
import {filterMovies} from '../utils/filter';
import {DEFAULT_SORT_TYPE, FilterType} from '../const';

export default class Movies {
  constructor(apiWithProvider) {
    this._apiWithProvider = apiWithProvider;
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
    return this._apiWithProvider.getMovies()
      .then((movies) => {
        this.movies = movies;
        return movies;
      });
  }

  getMovie(id) {
    return this._movies.find((movie) => movie.id === id);
  }

  getComments(movieId) {
    return this._apiWithProvider.getComments(movieId)
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
    return this._apiWithProvider.updateMovie(oldMovieId, newMovie.toRAW())
      .then(() => {
        this._movies = this._movies.map((movie) => movie.id === oldMovieId ? newMovie : movie);
      });
  }

  deleteComment(newMovie, commentId) {
    return this._apiWithProvider.deleteComment(newMovie, commentId)
      .then(() => {
        this._movies = this._movies.map((movie) => movie.id === newMovie.id ? newMovie : movie);
        this._comments = this._comments.filter((comment) => Number(comment.id) !== commentId);
      });
  }

  createComment(movie, newComment) {
    return this._apiWithProvider.createComment(movie, newComment)
      .then(({newMovie, comments}) => {
        const newCommentData = comments[comments.length - 1];
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
