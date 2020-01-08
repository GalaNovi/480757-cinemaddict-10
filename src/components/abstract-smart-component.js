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

  update(newMovieData, newCommentsData) {
    this._movieData = newMovieData;

    if (newCommentsData) {
      this._commentsData = newCommentsData;
    }

    this.rerender();
  }
}
