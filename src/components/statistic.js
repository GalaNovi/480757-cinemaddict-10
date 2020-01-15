import AbstractComponent from './abstract-component';
import {getUserRank} from '../utils/common';
import {capitalize} from '../utils/common';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const FILTERS = [`All time`, `Today`, `Week`, `Month`, `Year`];

const getTopGenre = (moviesData) => {
  const allGenres = [].concat(...moviesData.map(({movieInfo}) => movieInfo.genres));

  const genresStats = allGenres.reduce((acc, genre) => {
    if (acc[genre]) {
      acc[genre]++;
    } else {
      acc[genre] = 1;
    }

    return acc;
  }, {});

  const topGenre = Object.keys(genresStats)[Object.values(genresStats).findIndex((value) => value === Math.max(...Object.values(genresStats)))];

  return topGenre;
};

const formatStringForAttribute = (string) => {
  return string.toLowerCase().replace(` `, `-`);
};

const createFiltersMarkup = () => {
  return FILTERS.map((filter, index) => {
    return (
      `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${formatStringForAttribute(filter)}" value="${formatStringForAttribute(filter)}"${index ? `` : ` checked`}>
      <label for="statistic-${formatStringForAttribute(filter)}" class="statistic__filters-label">${filter}</label>`
    );
  }).join(`\n`);
};

const createStatisticMarkup = (moviesData) => {
  const alreadyWatchedMoviesAmount = moviesData.filter((movie) => movie.userInfo.isAlreadyWatched).length;
  const userRank = alreadyWatchedMoviesAmount ? `${getUserRank(alreadyWatchedMoviesAmount)}` : ``;
  const totalDuration = moviesData
    .filter((movie) => movie.userInfo.isAlreadyWatched)
    .reduce((acc, {movieInfo}) => acc + movieInfo.duration, 0);
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;
  const topGenre = getTopGenre(moviesData);
  const filtersMarkup = createFiltersMarkup();

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        ${userRank}
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${filtersMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${alreadyWatchedMoviesAmount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalHours} <span class="statistic__item-description">h</span> ${totalMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${capitalize(topGenre)}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistic extends AbstractComponent {
  constructor(movieData) {
    super();
    this._movieData = movieData;
  }

  getTemplate() {
    return createStatisticMarkup(this._movieData);
  }

  updateData(newMoviesData) {
    this._moviesData = newMoviesData;
  }
}
