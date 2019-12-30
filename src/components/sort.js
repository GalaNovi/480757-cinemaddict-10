import AbstractComponent from './abstract-component';

const SORT_LINK_ACTIVE_CLASS = `sort__button--active`;

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
    this._sortLinkActive = this.getElement().querySelector(`.${SORT_LINK_ACTIVE_CLASS}`);
  }

  getTemplate() {
    return createSortMarkup();
  }

  setSortChangeHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setActiveSortLink(newSortLink) {
    this._sortLinkActive.classList.remove(SORT_LINK_ACTIVE_CLASS);
    newSortLink.classList.add(SORT_LINK_ACTIVE_CLASS);
    this._sortLinkActive = newSortLink;
  }
}
