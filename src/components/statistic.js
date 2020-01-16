import AbstractComponent from './abstract-component';
import {getUserRank} from '../utils/common';
import {capitalize} from '../utils/common';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const FILTERS = [`All time`, `Today`, `Week`, `Month`, `Year`];
const CHART_CONTAINER_CLASS = `statistic__chart`;

// Глобальные настройки для Chart.js
Chart.helpers.merge(Chart.defaults, {
  scale: {
    ticks: {
      fontColor: `#ffffff`,
      padding: 80,
      fontSize: `22`,
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
          size: `22`,
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

const renderChart = (container, moviesData) => {
  const genres = getGenres(moviesData);
  const genresData = getGenresData(genres, moviesData);
  container.height = genres.length * 60;

  const chart = new Chart(container, {
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

export default class Statistic extends AbstractComponent {
  constructor(moviesData) {
    super();
    this._alreadyWatchedMoviesData = moviesData.filter((movie) => movie.userInfo.isAlreadyWatched);
  }

  getTemplate() {
    return createStatisticMarkup(this._alreadyWatchedMoviesData);
  }

  updateData(newMoviesData) {
    this._alreadyWatchedMoviesData = newMoviesData.filter((movie) => movie.userInfo.isAlreadyWatched);
  }

  renderChart() {
    getGenres(this._alreadyWatchedMoviesData);
    const chartContainerElement = this.getElement().querySelector(`.${CHART_CONTAINER_CLASS}`);
    renderChart(chartContainerElement, this._alreadyWatchedMoviesData);
  }
}
