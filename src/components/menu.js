import AbstractComponent from './abstract-component';
import {capitalize} from '../utils/common';
import {filterMovies} from '../utils/filter';
import {FilterType} from '../const';

const FILTER_LINK_ACTIVE_CLASS = `main-navigation__item--active`;

const createFilterItemMarkup = (filter, movies) => {
  const activeClass = filter === FilterType.ALL ? ` main-navigation__item--active` : ``;
  const counterMarkup = filter === FilterType.ALL ? `All movies` : `${capitalize(filter)} <span class="main-navigation__item-count">${filterMovies(movies, filter).length}</span>`;

  return (
    `<a href="#${filter}" class="main-navigation__item${activeClass}" data-filter-type="${filter}">
      ${counterMarkup}
    </a>`
  );
};

const createFilterMarkup = (moviesData) => {
  const filters = Object.values(FilterType);
  const markup = filters.map((filter) => createFilterItemMarkup(filter, moviesData)).join(`\n`);
  return markup;
};

const createMenuMarkup = (moviesData) => {
  const filterMarkup = createFilterMarkup(moviesData);

  return (
    `<nav class="main-navigation">
      ${filterMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(moviesData) {
    super();
    this._moviesData = moviesData;
    this._filterLinkActive = this.getElement().querySelector(`.${FILTER_LINK_ACTIVE_CLASS}`);
  }

  getTemplate() {
    return createMenuMarkup(this._moviesData);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setActiveFilterLink(newFilterLink) {
    this._filterLinkActive.classList.remove(FILTER_LINK_ACTIVE_CLASS);
    newFilterLink.classList.add(FILTER_LINK_ACTIVE_CLASS);
    this._filterLinkActive = newFilterLink;
  }
}
