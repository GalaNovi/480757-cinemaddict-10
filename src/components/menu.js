import AbstractComponent from './abstract-component';
import {capitalize} from '../utils/common';
import {FILTERS} from '../const';

const filterParameters = {
  all: ``,
  watchlist: (movie) => movie.movieInfo.isOnTheWatchlist,
  history: (movie) => movie.movieInfo.isAlredyWatched,
  favorites: (movie) => movie.movieInfo.isFavorite,
};

const createFilterMarkup = (filter, movies) => {
  const activeClass = filter === `all` ? ` main-navigation__item--active` : ``;
  const counterMarkup = filter === `all` ? `All movies` : `${capitalize(filter)} <span class="main-navigation__item-count">${movies.filter(filterParameters[filter]).length}</span>`;

  return (
    `<a href="#${filter}" class="main-navigation__item${activeClass}">
      ${counterMarkup}
    </a>`
  );
};

const createMenuMarkup = (moviesData) => {
  const filtersMarkup = FILTERS.map((filter) => createFilterMarkup(filter, moviesData)).join(``);

  return (
    `<nav class="main-navigation">
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(moviesData) {
    super();
    this._moviesData = moviesData;
  }

  getTemplate() {
    return createMenuMarkup(this._moviesData);
  }
}
