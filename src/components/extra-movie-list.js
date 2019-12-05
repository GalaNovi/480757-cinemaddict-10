import {createElement} from '../utils';

const createExtraMovieListMarkup = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class ExtraMovieList {
  constructor(heading) {
    this._elment = null;
    this._heading = heading;
  }

  getTemplate() {
    return createExtraMovieListMarkup(this._heading);
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
