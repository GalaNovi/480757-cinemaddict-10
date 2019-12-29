import {render} from '../utils/render';
import SortComponent from '../components/sort';

export default class Sort {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const sortComponent = new SortComponent();

    sortComponent.setSortChangeHandler((evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();
        sortComponent.setActiveSortLink(evt.target);
        this._moviesModel.setSort(evt.target.getAttribute(`data-sort-type`));
      }
    });

    render(this._container, sortComponent);
  }
}
