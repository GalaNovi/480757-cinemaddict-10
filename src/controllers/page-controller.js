import BigCard from '../components/big-card';
import Card from '../components/card';
import MainMovies from '../components/main-movies';
import ExtraMovies from '../components/extra-movies';
import Menu from '../components/menu';
import MoviesContainer from '../components/movies-container';
import NoMoviesContainer from '../components/no-movies-container';
import Profile from '../components/profile';
import Sort from '../components/sort';
import {getNextItemsIterator} from '../utils/common';
import {render} from '../utils/render';
import {EXTRA_MOVIES_HEADINGS} from '../const';

const START_MOVIES_AMOUNT = 5;
const ADD_MOVIES_AMOUNT = 5;
const EXTRA_MOVIES_AMOUNT = 2;

const extraMoviesParameters = {
  topRated: {
    filter: ({movieInfo}) => movieInfo.rating >= 1,
    sort: (a, b) => b.movieInfo.rating - a.movieInfo.rating,
  },
  mostCommented: {
    filter: ({comments}) => comments.length >= 1,
    sort: (a, b) => b.comments.length - a.comments.length,
  },
};

export class PageController {
  constructor(container) {
    this._container = container;
    this._extraMoviesAmount = EXTRA_MOVIES_AMOUNT;
    this._renderedMoviesAmount = START_MOVIES_AMOUNT;
    this._moviesContainerComponent = new MoviesContainer();
    this._mainMoviesComponent = new MainMovies();
    this._sortComponent = new Sort();
    this._subscriptions = [];
  }

  render(moviesData) {
    const headerElement = this._container.querySelector(`.header`);
    const mainElement = this._container.querySelector(`.main`);
    const alredyWatchedMoviesNumber = moviesData.filter((movie) => movie.movieInfo.isAlredyWatched).length;
    const topRatedMovies = this._getExtraMovies(moviesData, `topRated`);
    const mostCommentedMovies = this._getExtraMovies(moviesData, `mostCommented`);

    render(headerElement, new Profile(alredyWatchedMoviesNumber));
    render(mainElement, new Menu(moviesData));
    render(mainElement, this._sortComponent);

    if (moviesData.length) {
      render(this._moviesContainerComponent, this._mainMoviesComponent);
      this._mainMoviesListInit(moviesData);
      render(mainElement, this._moviesContainerComponent);
      this._sortComponent.setCallback(() => {
        this._mainMoviesListInit(moviesData);
      });
      this._renderExtraMovies(topRatedMovies, EXTRA_MOVIES_HEADINGS[0]);
      this._renderExtraMovies(mostCommentedMovies, EXTRA_MOVIES_HEADINGS[1]);
    } else {
      render(mainElement, new NoMoviesContainer());
    }

    this._container.querySelector(`.footer__statistics p`).textContent = `${moviesData.length} movies inside`;
  }

  _renderMovieCard(movie, container = this._mainMoviesComponent.getMoviesList()) {
    const cardComponent = new Card(movie);
    const bigCardComponent = new BigCard(movie);

    if (container === this._mainMoviesComponent.getMoviesList()) {
      this._subscriptions.push(() => {
        cardComponent.removeElement();
        bigCardComponent.removeElement();
      });
    }

    const onEsqKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closeBigCard();
      }
    };

    const openBigCard = () => {
      render(this._container, bigCardComponent);
      document.addEventListener(`keydown`, onEsqKeyDown);
    };

    const closeBigCard = () => {
      bigCardComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEsqKeyDown);
    };

    const onCloseButtonClick = () => {
      closeBigCard();
    };

    const onOpeningElementClick = (evt) => {
      evt.preventDefault();
      openBigCard();
      bigCardComponent.setCloseButtonHandler(onCloseButtonClick);
    };

    cardComponent.setOpenHandler(onOpeningElementClick);

    render(container, cardComponent);
  }

  _renderMainMovies(iterator) {
    const {value: moviesForRender, done: hasNoMoviesForRender} = iterator.next();
    moviesForRender.forEach((movie) => this._renderMovieCard(movie));
    this._mainMoviesComponent.toggleShowLoadButton(hasNoMoviesForRender);
  }

  _getExtraMovies(movies, parameter) {
    const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
    return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, this._extraMoviesAmount) : false;
  }

  _renderExtraMovies(movies, heading) {
    const doesHasMovies = Boolean(movies.length);

    if (doesHasMovies) {
      const extraMoviesComponent = new ExtraMovies(heading);
      const extraMoviesListElement = extraMoviesComponent.getMoviesListElement();
      movies.forEach((movie) => this._renderMovieCard(movie, extraMoviesListElement));
      render(this._moviesContainerComponent, extraMoviesComponent);
    }
  }

  _mainMoviesListInit(moviesData) {
    this._clearMainMovies();
    const moviesForRender = this._sortComponent.sortData(moviesData);
    const iterator = getNextItemsIterator(moviesForRender, ADD_MOVIES_AMOUNT, this._renderedMoviesAmount);
    this._renderMainMovies(iterator);
    this._mainMoviesComponent.setCallback(() => {
      this._renderMainMovies(iterator);
      this._renderedMoviesAmount += ADD_MOVIES_AMOUNT;
    });
  }

  _clearMainMovies() {
    this._subscriptions.forEach((element) => element());
    this._subscriptions = [];
  }
}
