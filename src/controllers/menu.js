import {render, Position} from '../utils/render';
import MenuComponent from '../components/menu';

export class MenuController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._menuComponent = new MenuComponent(this._moviesModel);
  }

  render() {
    this._menuComponent.removeElement();

    this._menuComponent.setFilterChangeHandler((evt) => {
      evt.preventDefault();
      if (evt.target.tagName === `A` && evt.target.getAttribute(`data-filter-type`) !== this._moviesModel.filterType) {
        this._menuComponent.setActiveFilterLink(evt.target.getAttribute(`data-filter-type`));
        this._moviesModel.setFilter(evt.target.getAttribute(`data-filter-type`));
      }
    });

    render(this._container, this._menuComponent, Position.AFTERBEGIN);
  }
}
