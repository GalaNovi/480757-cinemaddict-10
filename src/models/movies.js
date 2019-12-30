import {sortMovies} from '../utils/sort';
import {filterMovies} from '../utils/filter';
import {DEFAULT_SORT_TYPE} from '../const';
import {FilterType} from '../const';

export default class Movies {
  constructor() {
    this._movies = null;
    this._sortType = DEFAULT_SORT_TYPE;
    this._filterType = FilterType.ALL;
    this._sortChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  get movies() {
    return this._movies;
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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
