import {render} from '../utils/render';
import SortComponent from '../components/sort';

export class SortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const sortComponent = new SortComponent();

    sortComponent.setSortChangeHandler((evt) => {
      evt.preventDefault();
      if (evt.target.tagName === `A` && evt.target.getAttribute(`data-sort-type`) !== this._moviesModel.sortType) {
        sortComponent.setActiveSortLink(evt.target);
        this._moviesModel.setSort(evt.target.getAttribute(`data-sort-type`));
      }
    });

    render(this._container, sortComponent);
  }
}
