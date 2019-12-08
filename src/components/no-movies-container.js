import {createElement} from '../utils';

const createNoMoviesContainerMarkup = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </div>`
  );
};

export default class NoMoviesContainer {
  constructor() {
    this._elment = null;
  }

  getTemplate() {
    return createNoMoviesContainerMarkup();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
