import {capitalize} from '../utils';

const Filters = [`all`, `watchlist`, `history`, `favorites`];

const createFilterMarkup = (filter, index) => {
  const activeClass = !index ? ` main-navigation__item--active` : ``;

  return (
    `<a href="#${filter}" class="main-navigation__item${activeClass}">
      ${filter === `all` ?
      `All movies` :
      `${capitalize(filter)} <span class="main-navigation__item-count">13</span>`}
    </a>`
  );
};

export const createFilterTemplate = () => {
  const filtersMarkup = Filters.map((filter, index) => createFilterMarkup(filter, index)).join(``);

  return (
    `<nav class="main-navigation">
      ${filtersMarkup}
    </nav>`
  );
};
