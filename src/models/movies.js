import {sortMovies} from '../utils/sort';
import {filterMovies} from '../utils/filter';
import {DEFAULT_SORT_TYPE} from '../const';
import {FilterType} from '../const';

export default class Movies {
  constructor() {
    this._movies = null;
    this._filterType = FilterType.ALL;
    this._sortType = DEFAULT_SORT_TYPE;
    this._sortChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  get movies() {
    return this._movies;
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

  getMoviesForRender() {
    let moviesCopy = this._movies.slice();
    moviesCopy = filterMovies(moviesCopy, this._filterType);
    moviesCopy = sortMovies(moviesCopy, this._sortType);
    return moviesCopy;
  }

  updateMovie(id, movie) {
    this._movies[id] = movie;
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setSort(sortType) {
    this._sortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilter(filterType) {
    this._filterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
