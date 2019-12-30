import {render} from '../utils/render';
import MenuComponent from '../components/menu';

export class MenuController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const menuComponent = new MenuComponent(this._moviesModel.movies);

    // filterComponent.setFilterChangeHandler((evt) => {
    //   if (evt.target.tagName === `A`) {
    //     evt.preventDefault();
    //     sortComponent.setActiveSortLink(evt.target);
    //     this._moviesModel.setSort(evt.target.getAttribute(`data-sort-type`));
    //   }
    // });

    render(this._container, menuComponent);
  }
}
