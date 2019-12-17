import AbstractComponent from './abstract-component';

const SORT_LINK_ACTIVE_CLASS = `sort__button--active`;
const sortParameters = {
  date: (a, b) => b.movieInfo.release.date - a.movieInfo.release.date,
  rating: (a, b) => b.movieInfo.rating - a.movieInfo.rating,
};

const createSortMarkup = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="date">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="rating">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._sortType = `default`;
    this._sortLinkActive = this.getElement().querySelector(`.${SORT_LINK_ACTIVE_CLASS}`);
  }

  get sortType() {
    return this._sortType;
  }

  getTemplate() {
    return createSortMarkup();
  }

  sortData(data) {
    if (this._sortType === `default`) {
      return data.slice();
    } else {
      return data.slice().sort(sortParameters[this._sortType]);
    }
  }

  setCallback(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        this._setCurrentSortType(evt);
        callback();
      }
    });
  }

  _setCurrentSortType(evt) {
    evt.preventDefault();
    const newSortLink = evt.target;
    const newSortType = evt.target.getAttribute(`data-sort-type`);
    this._changeActiveSortLink(newSortLink);
    this._sortType = newSortType;
  }

  _changeActiveSortLink(newSortLink) {
    this._sortLinkActive.classList.remove(SORT_LINK_ACTIVE_CLASS);
    newSortLink.classList.add(SORT_LINK_ACTIVE_CLASS);
    this._sortLinkActive = newSortLink;
  }
}
