import AbstractComponent from "./abstract-component";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.element = null;
    const newElement = this.getElement();
    if (parent) {
      parent.replaceChild(newElement, oldElement);
    }

    this.recoveryListeners();
  }

  update(primaryData, secondaryData) {
    this._primaryData = primaryData;

    if (secondaryData) {
      this._secondaryData = secondaryData;
    }

    this.rerender();
  }

  _shakeElement(element) {
    element.classList.add(`shake`);
    setTimeout(() => element.classList.remove(`shake`), 600);
  }
}
