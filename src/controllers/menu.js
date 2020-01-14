import {render, Position} from '../utils/render';
import MenuComponent from '../components/menu';

export class MenuController {
  constructor(container, moviesModel, showMovies, showStatistic) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._showMovies = showMovies;
    this._showStatistic = showStatistic;
    this._menuComponent = new MenuComponent(this._moviesModel);
  }

  render() {
    this._menuComponent.removeElement();

    this._menuComponent.setFilterChangeHandler((evt) => {
      evt.preventDefault();
      if (evt.target.tagName === `A` && evt.target.getAttribute(`href`) !== `#stats`) {
        this._showMovies();
        this._menuComponent.setActiveLink(evt.target);
        if (evt.target.getAttribute(`data-filter-type`) !== this._moviesModel.filterType) {
          this._moviesModel.setFilter(evt.target.getAttribute(`data-filter-type`));
        }
      } else {
        this._showStatistic();
        this._menuComponent.setActiveLink(evt.target);
      }
    });

    render(this._container, this._menuComponent, Position.AFTERBEGIN);
  }
}
