import Statistic from '../components/statistic';
import {render} from '../utils/render';

export class StatisticController {
  constructor(container, moviesData) {
    this._container = container;
    this._moviesData = moviesData;
    this._statisticComponent = new Statistic(this._moviesData);
  }

  render() {
    this._statisticComponent.removeElement();
    this._statisticComponent.getElement().classList.add(`visually-hidden`);
    render(this._container, this._statisticComponent);
  }

  updateMoviesData(newMoviesData) {
    this._moviesData = newMoviesData;
  }

  showStatistic() {
    this._statisticComponent.show();
  }

  hideStatistic() {
    this._statisticComponent.hide();
  }

  update(newMoviesData) {
    this._moviesData = newMoviesData;
    this._statisticComponent.updateData(this._moviesData);
    this.render();
  }
}
