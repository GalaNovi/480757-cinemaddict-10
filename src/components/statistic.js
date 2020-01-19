import AbstractSmartComponent from './abstract-smart-component';
import {getUserRank} from '../utils/common';
import {capitalize} from '../utils/common';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const FILTERS = [`All time`, `Today`, `Week`, `Month`, `Year`];
const HEIGHT_FOR_CHART_BAR = 60;

const periodFilter = {
  'all-time': (item) => item,
  'today': (item) => Number(moment(new Date(item.userInfo.watchingDate).getTime()).format(`YYYYMMDD`)) === Number(moment(new Date()).format(`YYYYMMDD`)),
  'week': (item) => Number(moment(new Date(item.userInfo.watchingDate).getTime()).format(`YYYYMMDD`)) >= Number(moment(new Date()).format(`YYYYMMDD`) - 7),
  'month': (item) => Number(moment(new Date(item.userInfo.watchingDate).getTime()).format(`YYYYMM`)) === Number(moment(new Date()).format(`YYYYMM`)),
  'year': (item) => Number(moment(new Date(item.userInfo.watchingDate).getTime()).format(`YYYY`)) === Number(moment(new Date()).format(`YYYY`)),
};

// Global settings for Chart
Chart.helpers.merge(Chart.defaults, {
  scale: {
    ticks: {
      fontColor: `#ffffff`,
      padding: 80,
      fontSize: `20`,
      fontFamily: `Open Sans`,
    },
  },
  global: {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        align: `start`,
        anchor: `start`,
        clamp: true,
        color: `#ffffff`,
        font: {
          size: `20`,
          family: `Open Sans`,
        },
        offset: 20,
      },
    },
  },
});

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

const createFiltersMarkup = (currentFilter) => {
  return FILTERS.map((filter) => {
    const filterAttribute = formatStringForAttribute(filter);

    return (
      `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filterAttribute}" value="${filterAttribute}"${filterAttribute === currentFilter ? ` checked` : ``}>
      <label for="statistic-${filterAttribute}" class="statistic__filters-label">${filter}</label>`
    );
  }).join(`\n`);
};

const createStatisticMarkup = (moviesData, currentFilter) => {
  const alreadyWatchedMoviesAmount = moviesData
    .filter((movie) => movie.userInfo.isAlreadyWatched)
    .filter(periodFilter[currentFilter]).length;
  const userRank = getUserRank(moviesData.filter((movie) => movie.userInfo.isAlreadyWatched).length);
  const totalDuration = moviesData.reduce((acc, {movieInfo}) => acc + movieInfo.duration, 0);
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;
  const topGenre = moviesData.length ? getTopGenre(moviesData) : null;
  const filtersMarkup = createFiltersMarkup(currentFilter);

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
          <p class="statistic__item-text">${topGenre ? capitalize(topGenre) : `-`}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

const getGenresStatistic = (moviesData) => {
  let genres = [];
  moviesData.forEach((movie) => genres.push(...movie.movieInfo.genres));
  genres = Array.from(new Set(genres)).map((genre) => capitalize(genre));
  const genresStatistic = genres.map((genre) => {
    return {name: genre};
  });
  genresStatistic.forEach((item) => {
    item.amount = moviesData.filter(({movieInfo}) => movieInfo.genres.find((genre) => genre === item.name.toLowerCase())).length;
  });
  return genresStatistic.sort((a, b) => b.amount - a.amount);
};

export default class Statistic extends AbstractSmartComponent {
  constructor(moviesData) {
    super();
    this._moviesData = moviesData;
    this._currentFilter = Object.keys(periodFilter)[0];
  }

  // set currentFilter(fiterType) {
  //   this._currentFilter = fiterType;
  // }

  getTemplate() {
    return createStatisticMarkup(this._moviesData, this._currentFilter);
  }

  update(newMoviesData) {
    this._moviesData = newMoviesData;
    this.rerender();
  }

  renderChart() {
    this._chart = this._createChart(this._chartContainerElement);
  }

  setOnFilterClickHandler() {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          this._currentFilter = evt.target.value;
          this.rerender();
        }
      });
  }

  recoveryListeners() {
    this.setOnFilterClickHandler();
  }

  _setChartContainerHeight(barsAmount) {
    const containerHeight = barsAmount * HEIGHT_FOR_CHART_BAR;
    this._chartContainerElement.height = `${containerHeight}`;
    this._chartContainerElement.style.height = `${containerHeight}px`;
  }

  _createChart() {
    const genresStatistic = getGenresStatistic(this._moviesData);
    this._chartContainerElement = this.getElement().querySelector(`.statistic__chart`);
    this._setChartContainerHeight(genresStatistic.length);

    return new Chart(this._chartContainerElement, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: genresStatistic.map((item) => item.name),
        datasets: [{
          label: false,
          data: genresStatistic.map((item) => item.amount),
          backgroundColor: `#ffe800`,
          barThickness: 30,
        }]
      },
      options: {
        responsiveAnimationDuration: 400,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            offset: true,
            display: false,
          }]
        }
      }
    });
  }

  // _updateChartPeriod(period) {
  //   const moviesDataForPeriod = this._moviesData.filter(periodFilter[period]);
  //   const genresStatistic = getGenresStatistic(moviesDataForPeriod);
  //   this._setChartContainerHeight(genresStatistic.length);
  //   this._chart.data.labels = genresStatistic.map((item) => item.name);
  //   this._chart.data.datasets[0].data = genresStatistic.map((item) => item.amount);
  //   this._chart.update();
  // }
}
