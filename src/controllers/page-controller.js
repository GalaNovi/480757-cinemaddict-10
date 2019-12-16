import BigCard from '../components/big-card';
import Card from '../components/card';
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
  }

  render(moviesData) {
    const headerElement = this._container.querySelector(`.header`);
    const mainElement = this._container.querySelector(`.main`);
    const alredyWatchedMoviesNumber = moviesData.filter((movie) => movie.movieInfo.isAlredyWatched).length;
    const topRatedMovies = this._getExtraMovies(moviesData, `topRated`);
    const mostCommentedMovies = this._getExtraMovies(moviesData, `mostCommented`);

    render(headerElement, new Profile(alredyWatchedMoviesNumber));
    render(mainElement, new Menu(moviesData));
    render(mainElement, new Sort());

    if (moviesData.length) {
      this._initMainMoviesList(moviesData);
      render(mainElement, this._moviesContainerComponent);
      this._renderExtraMovies(topRatedMovies, EXTRA_MOVIES_HEADINGS[0]);
      this._renderExtraMovies(mostCommentedMovies, EXTRA_MOVIES_HEADINGS[1]);
    } else {
      render(mainElement, new NoMoviesContainer());
    }

    this._container.querySelector(`.footer__statistics p`).textContent = `${moviesData.length} movies inside`;
  }

  _getExtraMovies(movies, parameter) {
    const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
    return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, this._extraMoviesAmount) : false;
  }

  _renderExtraMovies(movies, heading) {
    const doesHasMovies = Boolean(movies.length);
    const extraMoviesComponent = new ExtraMovies(heading);
    const extraMoviesListElement = extraMoviesComponent.getMoviesListElement();

    if (doesHasMovies) {
      movies.forEach((movie) => this._renderMovieCard(movie, extraMoviesListElement));
    } else {
      extraMoviesComponent.getElement().innerHTML = ``;
    }

    render(this._moviesContainerComponent, extraMoviesComponent);
  }

  _renderMovieCard(movie, container = this._moviesContainerComponent.getMoviesListElement()) {
    const card = new Card(movie);
    const bigCard = new BigCard(movie);

    const onEsqKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closeBigCard();
      }
    };

    const openBigCard = () => {
      render(this._container, bigCard);
      document.addEventListener(`keydown`, onEsqKeyDown);
    };

    const closeBigCard = () => {
      bigCard.getElement().remove();
      document.removeEventListener(`keydown`, onEsqKeyDown);
    };

    const onCloseButtonClick = () => {
      closeBigCard();
    };

    const onOpeningElementClick = (evt) => {
      evt.preventDefault();
      openBigCard();
      bigCard.setCloseButtonHandler(onCloseButtonClick);
    };

    card.setOpenHandler(onOpeningElementClick);

    render(container, card);
  }

  _renderMainMovies(iterator) {
    const {value: moviesForRender, done: hasNoMoviesForRender} = iterator.next();
    moviesForRender.forEach((movie) => this._renderMovieCard(movie));
    this._moviesContainerComponent.toggleShowLoadButton(hasNoMoviesForRender);
  }

  _initMainMoviesList(moviesData) {
    const iterator = getNextItemsIterator(moviesData, ADD_MOVIES_AMOUNT, this._renderedMoviesAmount);

    const initLoadButton = () => {
      this._moviesContainerComponent.setLoadButtonCallback((evt) => {
        evt.preventDefault();
        this._renderMainMovies(iterator);
      });
    };

    this._renderMainMovies(iterator);
    initLoadButton();
  }
}
