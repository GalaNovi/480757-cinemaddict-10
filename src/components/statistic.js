import AbstractComponent from './abstract-component';
import {getUserRank} from '../utils/common';
import {capitalize} from '../utils/common';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const FILTERS = [`All time`, `Today`, `Week`, `Month`, `Year`];
const HEIGHT_FOR_CHART_BAR = 60;

const periodFilter = {
  'all-time': (item) => item,
  'today': (item) => Number(moment(item.userInfo.watchingDate).format(`YYYYMMDD`)) === Number(moment(new Date()).format(`YYYYMMDD`)),
  'week': (item) => Number(moment(item.userInfo.watchingDate).format(`YYYYMMDD`)) >= Number(moment(new Date()).format(`YYYYMMDD`) - 7),
  'month': (item) => Number(moment(item.userInfo.watchingDate).format(`YYYYMM`)) === Number(moment(new Date()).format(`YYYYMM`)),
  'year': (item) => Number(moment(item.userInfo.watchingDate).format(`YYYY`)) === Number(moment(new Date()).format(`YYYY`)),
};

// Глобальные настройки для Chart
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

const createFiltersMarkup = () => {
  return FILTERS.map((filter, index) => {
    return (
      `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${formatStringForAttribute(filter)}" value="${formatStringForAttribute(filter)}"${index ? `` : ` checked`}>
      <label for="statistic-${formatStringForAttribute(filter)}" class="statistic__filters-label">${filter}</label>`
    );
  }).join(`\n`);
};

const createStatisticMarkup = (moviesData) => {
  const alreadyWatchedMoviesAmount = moviesData.length;
  const userRank = alreadyWatchedMoviesAmount ? `${getUserRank(alreadyWatchedMoviesAmount)}` : ``;
  const totalDuration = moviesData.reduce((acc, { movieInfo }) => acc + movieInfo.duration, 0);
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
          <p class="statistic__item-text">${topGenre ? capitalize(topGenre) : ``}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

const getGenres = (moviesData) => {
  const genres = [];
  moviesData.forEach((movie) => genres.push(...movie.movieInfo.genres));
  return Array.from(new Set(genres)).map((genre) => capitalize(genre));
};

const getGenresData = (genres, moviesData) => {
  return genres.map((genre) => Number(moviesData
    .filter((movie) => movie.movieInfo.genres
    .find((item) => item === genre.toLowerCase())).length));
};

export default class Statistic extends AbstractComponent {
  constructor(moviesData) {
    super();
    this._moviesData = moviesData;
  }

  getTemplate() {
    return createStatisticMarkup(this._moviesData);
  }

  updateData(newMoviesData) {
    this._moviesData = newMoviesData;
  }

  renderChart() {
    this._chart = this._createChart(this._chartContainerElement);
  }

  setOnFilterClickHandler() {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          this._updateChartPeriod((evt.target.value));
        }
      });
  }

  _setChartContainerHeight(barsAmount) {
    const containerHeight = barsAmount * HEIGHT_FOR_CHART_BAR;
    this._chartContainerElement.height = containerHeight;
    this._chartContainerElement.style.height = `${containerHeight}px`;
  }

  _createChart() {
    const genres = getGenres(this._moviesData);
    const genresData = getGenresData(genres, this._moviesData);
    this._chartContainerElement = this.getElement().querySelector(`.statistic__chart`);
    this._setChartContainerHeight(genres.length);
  
    return new Chart(this._chartContainerElement, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: genres,
        datasets: [{
          label: false,
          data: genresData,
          backgroundColor: `#ffe800`,
          barThickness: 30,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            offset: true,
            display: false,
          }]
        }
      }
    });
  };

  _updateChartPeriod(period) {
    const moviesDataForPeriod = this._moviesData.filter(periodFilter[period]);
    const genres = getGenres(moviesDataForPeriod);
    const genresData = getGenresData(genres, moviesDataForPeriod);
    console.log(genres);
    console.log(genresData);
    this._chart.data.labels = genres;
    console.log(this._chart.data.labels);
    this._chart.data.datasets[0].data = genresData;
    this._setChartContainerHeight(genresData.length);
    this._chart.update();
  }
}
