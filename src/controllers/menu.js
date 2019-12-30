import {render} from '../utils/render';
import MenuComponent from '../components/menu';

export class MenuController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const menuComponent = new MenuComponent(this._moviesModel.movies);

    menuComponent.setFilterChangeHandler((evt) => {
      evt.preventDefault();
      if (evt.target.tagName === `A` && evt.target.getAttribute(`data-filter-type`) !== this._moviesModel.filterType) {
        menuComponent.setActiveFilterLink(evt.target);
        this._moviesModel.setFilter(evt.target.getAttribute(`data-filter-type`));
      }
    });

    render(this._container, menuComponent);
  }
}
