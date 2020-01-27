import {sortMovies} from '../utils/sort';
import {filterMovies} from '../utils/filter';
import {DEFAULT_SORT_TYPE, FilterType} from '../const';
import {getRandomArrayItem} from '../utils/common';

export default class Movies {
  constructor() {
    this._movies = null;
    this._comments = null;
    this._filterType = FilterType.ALL;
    this._sortType = DEFAULT_SORT_TYPE;
    this._sortChangeHandlers = null;
    this._filterChangeHandler = null;
  }

  get movies() {
    return this._movies;
  }

  get comments() {
    return this._comments;
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

  set comments(comments) {
    this._comments = comments;
  }

  getMoviesForRender() {
    let moviesCopy = this._movies.slice();
    moviesCopy = filterMovies(moviesCopy, this._filterType);
    moviesCopy = sortMovies(moviesCopy, this._sortType);
    return moviesCopy;
  }

  updateMovie(oldMovieId, newMovie) {
    if (newMovie.localComment) {
      this.addComment(Object.assign(newMovie.localComment, {
        id: this._comments.length + 1,
        author: getRandomArrayItem(COMMENT_AUTHORS),
      }));

      newMovie.comments.unshift(this._comments.length);
      delete newMovie.localComment;
    }

    this._movies = this._movies.map((movie) => movie.id === oldMovieId ? newMovie : movie);
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

  addComment(comment) {
    this._comments.unshift(comment);
  }
}
