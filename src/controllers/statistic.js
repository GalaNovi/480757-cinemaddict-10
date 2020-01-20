import Statistic from '../components/statistic';
import {render} from '../utils/render';

export class StatisticController {
  constructor(container, moviesData) {
    this._container = container;
    this._moviesData = moviesData;
    this._statisticComponent = new Statistic(this._moviesData);
  }

  render() {
    this._statisticComponent.renderChart();
    this._statisticComponent.setOnFilterClickHandler();
    render(this._container, this._statisticComponent);
  }

  updateMoviesData(newMoviesData) {
    this._moviesData = newMoviesData;
  }

  showStatistic() {
    this._statisticComponent.show();
    this._statisticComponent.isHidden = false;
  }

  hideStatistic() {
    this._statisticComponent.hide();
    this._statisticComponent.isHidden = true;
  }

  update(newMoviesData) {
    this._moviesData = newMoviesData;
    this._statisticComponent.update(this._moviesData);
  }
}
