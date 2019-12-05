import {createElement} from '../utils';

const createMoviesContainerMarkup = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
        <button class="films-list__show-more">Show more</button>
      </section>
    </div>`
  );
};

export default class MoviesContainer {
  constructor(heading) {
    this._elment = null;
    this._heading = heading;
  }

  getTemplate() {
    return createMoviesContainerMarkup(this._heading);
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
