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
    this._extraMoviesAmount = 2;
    this._headerElement = this._container.querySelector(`.header`);
    this._mainElement = this._container.querySelector(`.main`);
    this._moviesContainerComponent = new MoviesContainer();
    this._moviesListElement = this._moviesContainerComponent.getElement().querySelector(`.films-list__container`);
  }

  render(moviesData) {
    const alredyWathedMoviesNumber = moviesData.filter((movie) => movie.movieInfo.isAlredyWatched).length;
    const iterator = getNextItemsIterator(moviesData);
    const {value: moviesForRender, done: hasNoMoviesForRender} = iterator.next();
    const topRatedMovies = this._getExtraMovies(moviesData, `topRated`);
    const mostCommentedMovies = this._getExtraMovies(moviesData, `mostCommented`);

    const onLoadButtonClick = (evt) => {
      evt.preventDefault();
      const {value, done} = iterator.next();

      if (value) {
        this._renderMainMovies(this._moviesListElement, value);
      }

      if (done) {
        evt.target.remove();
      }
    };

    const initLoadButton = () => {
      if (!hasNoMoviesForRender) {
        this._moviesContainerComponent.setLoadButtonHandler(onLoadButtonClick);
      } else {
        this._moviesContainerComponent.removeLoadButton();
      }
    };

    render(this._headerElement, new Profile(alredyWathedMoviesNumber));
    render(this._mainElement, new Menu(moviesData));
    render(this._mainElement, new Sort());

    if (moviesData.length) {
      this._renderMainMovies(this._moviesListElement, moviesForRender);
      initLoadButton(hasNoMoviesForRender);
      render(this._mainElement, this._moviesContainerComponent);
      this._renderExtraMovies(topRatedMovies, EXTRA_MOVIES_HEADINGS[0]);
      this._renderExtraMovies(mostCommentedMovies, EXTRA_MOVIES_HEADINGS[1]);
    } else {
      render(this._mainElement, new NoMoviesContainer());
    }

    this._container.querySelector(`.footer__statistics p`).textContent = `${moviesData.length} movies inside`;
  }

  _getExtraMovies(movies, parameter) {
    const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
    return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, this._extraMoviesAmount) : false;
  }

  _renderMovieCard(container, movie) {
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

    const onBigCardCloseButtonClick = () => {
      closeBigCard();
    };

    const onOpeningBigCardElementClick = (evt) => {
      evt.preventDefault();
      openBigCard();
      bigCard.setCloseButtonHandler(onBigCardCloseButtonClick);
    };

    card.setOnOpeningBigCardElementsHandler(onOpeningBigCardElementClick);

    render(container, card);
  }

  _renderMainMovies(container, movies) {
    movies.forEach((movie) => this._renderMovieCard(container, movie));
  }

  _renderExtraMovies(movies, heading) {
    const doesHasMovies = Boolean(movies.length);
    const extraMoviesComponent = new ExtraMovies(heading, this._moviesContainerComponent);
    const extraMoviesListElement = extraMoviesComponent.getElement().querySelector(`.films-list__container`);

    if (doesHasMovies) {
      movies.forEach((movie) => this._renderMovieCard(extraMoviesListElement, movie));
    } else {
      extraMoviesComponent.getElement().innerHTML = ``;
    }

    render(this._moviesContainerComponent, extraMoviesComponent);
  }
}
