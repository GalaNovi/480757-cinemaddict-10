import {render} from '../utils/render';
import SortComponent from '../components/sort';

export class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._sortComponent = new SortComponent();
  }

  render() {
    this._sortComponent.setSortChangeHandler((evt) => {
      evt.preventDefault();
      if (evt.target.tagName === `A` && evt.target.getAttribute(`data-sort-type`) !== this._moviesModel.sortType) {
        this._sortComponent.setActiveSortLink(evt.target);
        this._moviesModel.setSort(evt.target.getAttribute(`data-sort-type`));
      }
    });

    render(this._container, this._sortComponent);
  }

  showSort() {
    this._sortComponent.show();
  }

  hideSort() {
    this._sortComponent.hide();
  }
}
