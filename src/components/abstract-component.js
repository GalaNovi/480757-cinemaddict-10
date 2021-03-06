import {createElement} from '../utils/render';

export default class AbstractComponent {
  constructor() {
    this._element = null;

    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this.removeElement = this.removeElement.bind(this);
  }

  set element(element) {
    this._element = element;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this.getElement().remove();
    this._element = null;
  }

  show() {
    this.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
  }
}
