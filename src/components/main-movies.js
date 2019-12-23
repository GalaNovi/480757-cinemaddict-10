import AbstractComponent from './abstract-component';

const createMainMoviesMarkup = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
      <button class="films-list__show-more">Show more</button>
    </section>`
  );
};

export default class MainMovies extends AbstractComponent {
  constructor() {
    super();
    this._isNeedSetHandler = true;
  }

  getTemplate() {
    return createMainMoviesMarkup();
  }

  setCallback(callback) {
    this._callback = callback;

    if (this._isNeedSetHandler) {
      this.getElement().querySelector(`.films-list__show-more`)
        .addEventListener(`click`, () => this._callback());
    }

    this._isNeedSetHandler = false;
  }

  toggleShowLoadButton(areAllMoviesShown) {
    const loadMoreButton = this.getElement().querySelector(`.films-list__show-more`);
    if (areAllMoviesShown) {
      loadMoreButton.classList.toggle(`visually-hidden`);
    }
  }

  getMoviesList() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
