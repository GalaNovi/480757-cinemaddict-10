import {sortMovies} from '../utils/sort';
import {DEFAULT_SORT_TYPE} from '../const';

export default class Movies {
  constructor() {
    this._movies = null;
    this._sortType = DEFAULT_SORT_TYPE;
    this._sortChangeHandlers = [];
  }

  get movies() {
    return sortMovies(this._movies, this._sortType);
  }

  set movies(movies) {
    this._movies = Array.from(movies);
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
