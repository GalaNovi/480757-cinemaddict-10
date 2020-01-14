import AbstractComponent from './abstract-component';
import {capitalize} from '../utils/common';
import {filterMovies} from '../utils/filter';
import {FilterType} from '../const';

const LINK_ACTIVE_CLASS = `main-navigation__item--active`;

const createFilterItemMarkup = (filter, moviesModel) => {
  const activeClass = filter === moviesModel.filterType ? ` main-navigation__item--active` : ``;
  const counterMarkup = filter === FilterType.ALL ? `All movies` : `${capitalize(filter)} <span class="main-navigation__item-count">${filterMovies(moviesModel.movies, filter).length}</span>`;

  return (
    `<a href="#${filter}" class="main-navigation__item${activeClass}" data-filter-type="${filter}">
      ${counterMarkup}
    </a>`
  );
};

const createFilterMarkup = (moviesModel) => {
  const filters = Object.values(FilterType);
  const markup = filters.map((filter) => createFilterItemMarkup(filter, moviesModel)).join(`\n`);
  return markup;
};

const createMenuMarkup = (moviesModel) => {
  const filterMarkup = createFilterMarkup(moviesModel);

  return (
    `<nav class="main-navigation">
      ${filterMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
  }

  getTemplate() {
    return createMenuMarkup(this._moviesModel);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setActiveLink(newActiveLink) {
    const oldActiveLink = this.getElement().querySelector(`.${LINK_ACTIVE_CLASS}`);
    oldActiveLink.classList.remove(LINK_ACTIVE_CLASS);
    newActiveLink.classList.add(LINK_ACTIVE_CLASS);
  }
}
