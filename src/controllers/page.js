import MainMovies from '../components/main-movies';
import ExtraMovies from '../components/extra-movies';
import MoviesContainer from '../components/movies-container';
import NoMoviesContainer from '../components/no-movies-container';
import Profile from '../components/profile';
import {MovieController} from '../controllers/movie';
import {SortController} from './sort';
import {MenuController} from './menu';
import {getNextItemsIterator} from '../utils/common';
import {render} from '../utils/render';
import {EXTRA_MOVIES_HEADINGS} from '../const';

const START_MOVIES_AMOUNT = 5;
const ADD_MOVIES_AMOUNT = 5;
const EXTRA_MOVIES_AMOUNT = 2;
const MAIN_MOVIES_TYPE = `main`;
const EXTRA_MOVIES_TYPE = `extra`;

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
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._extraMoviesAmount = EXTRA_MOVIES_AMOUNT;
    this._renderedMoviesAmount = START_MOVIES_AMOUNT;
    this._moviesContainerComponent = new MoviesContainer();
    this._mainMoviesComponent = new MainMovies();
    this._shownMoviesInstances = [];
    this._moviesData = [];
    this._extraMoviesComponents = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onCloseBigCard = this._onCloseBigCard.bind(this);

    this._moviesModel.setSortChangeHandler(this._onSortChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const allMovies = this._moviesModel.movies;
    const moviesForRender = this._moviesModel.getMoviesForRender();
    const headerElement = this._container.querySelector(`.header`);
    const mainElement = this._container.querySelector(`.main`);
    const alredyWatchedMoviesNumber = allMovies.filter((movie) => movie.userInfo.isOnTheWatchlist).length;
    const sortController = new SortController(mainElement, this._moviesModel);
    this._menuController = new MenuController(mainElement, this._moviesModel);

    render(headerElement, new Profile(alredyWatchedMoviesNumber));
    this._menuController.render();
    sortController.render();

    if (moviesForRender.length) {
      render(this._moviesContainerComponent, this._mainMoviesComponent);
      this._mainMoviesListInit(moviesForRender);
      render(mainElement, this._moviesContainerComponent);
      this._extraMoviesListsInit();
    } else {
      render(mainElement, new NoMoviesContainer());
    }

    this._container.querySelector(`.footer__statistics p`).textContent = `${allMovies.length} movies inside`;
  }

  _renderMovieCard(movieData, container = this._mainMoviesComponent.getMoviesList()) {
    const comments = this._moviesModel.comments;
    const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._onCloseBigCard);
    const movieInstance = {
      type: MAIN_MOVIES_TYPE,
      controller: movieController,
    };

    if (container !== this._mainMoviesComponent.getMoviesList()) {
      movieInstance.type = EXTRA_MOVIES_TYPE;
    }

    this._shownMoviesInstances.push(movieInstance);
    movieController.render(movieData, comments);
  }

  _renderMainMovies(iterator) {
    const {value: moviesForRender, done: hasNoMoviesForRender} = iterator.next();
    moviesForRender.forEach((movieData) => this._renderMovieCard(movieData));
    this._mainMoviesComponent.toggleShowLoadButton(hasNoMoviesForRender);
  }

  _getExtraMovies(parameter) {
    const extraMovies = this._moviesModel.movies.filter(extraMoviesParameters[parameter].filter);
    return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, this._extraMoviesAmount) : null;
  }

  _renderExtraMovies(movies, heading) {
    const doesHasMovies = Boolean(movies.length);
    const extraMoviesComponent = new ExtraMovies(heading);
    this._extraMoviesComponents.push(extraMoviesComponent);

    if (doesHasMovies) {
      const extraMoviesListElement = extraMoviesComponent.getMoviesListElement();
      movies.forEach((movie) => this._renderMovieCard(movie, extraMoviesListElement));
      render(this._moviesContainerComponent, extraMoviesComponent);
    }
  }

  _mainMoviesListInit() {
    this._clearMovies(MAIN_MOVIES_TYPE);
    const moviesData = this._moviesModel.getMoviesForRender();
    const iterator = getNextItemsIterator(moviesData, ADD_MOVIES_AMOUNT, this._renderedMoviesAmount);
    this._renderMainMovies(iterator);
    this._mainMoviesComponent.setCallback(() => {
      this._renderMainMovies(iterator);
      this._renderedMoviesAmount += ADD_MOVIES_AMOUNT;
    });
  }

  _extraMoviesListsInit() {
    this._clearExtraMovies();
    const topRatedMovies = this._getExtraMovies(Object.keys(extraMoviesParameters)[0]);
    const mostCommentedMovies = this._getExtraMovies(Object.keys(extraMoviesParameters)[1]);
    this._renderExtraMovies(topRatedMovies, EXTRA_MOVIES_HEADINGS[0]);
    this._renderExtraMovies(mostCommentedMovies, EXTRA_MOVIES_HEADINGS[1]);
  }

  _clearMovies(moviesType) {
    const movieInstanceForClean = this._shownMoviesInstances.filter((item) => item.type === moviesType);
    movieInstanceForClean.forEach((item) => item.controller.removeElements());
    this._shownMoviesInstances = this._shownMoviesInstances.filter((item) => item.type !== moviesType);
  }

  _clearExtraMovies() {
    this._clearMovies(EXTRA_MOVIES_TYPE);
    this._extraMoviesComponents.forEach((component) => component.removeElement());
    this._extraMoviesComponents = [];
  }

  _isExtraMoviesRatingChange() {
    const currentExtraMoviesIdsString = this._shownMoviesInstances
      .filter((item) => item.type === EXTRA_MOVIES_TYPE)
      .map(({controller}) => controller.id)
      .join(``);

    const topRatedMoviesIdsString = this._getExtraMovies(Object.keys(extraMoviesParameters)[0])
      .map((controller) => controller.id)
      .join(``);

    const mostCommentedMoviesIdsString = this._getExtraMovies(Object.keys(extraMoviesParameters)[1])
      .map((controller) => controller.id)
      .join(``);

    const newExtraMoviesIdsString = topRatedMoviesIdsString + mostCommentedMoviesIdsString;
    return currentExtraMoviesIdsString !== newExtraMoviesIdsString;
  }

  _onDataChange(oldMovie, newMovie) {
    const instanceOfChangedMovies = this._shownMoviesInstances.filter(({controller}) => controller.id === oldMovie.id);
    this._moviesModel.updateMovie(oldMovie.id, newMovie);

    if (newMovie.localComment) {
      newMovie = this._moviesModel.movies.find((movie) => movie.id === newMovie.id);
    }

    instanceOfChangedMovies.forEach(({controller}) => {
      controller.updateMovieData(newMovie);
      controller.updateComponents(newMovie, this._moviesModel.comments);
    });

    this._menuController.render();
  }

  _onCloseBigCard() {
    if (this._isExtraMoviesRatingChange()) {
      this._extraMoviesListsInit();
    }
  }

  _onViewChange() {
    this._shownMoviesInstances.forEach(({controller}) => controller.setDefaultView());
  }

  _onSortChange() {
    this._mainMoviesListInit();
  }

  _onFilterChange() {
    this._mainMoviesListInit();
  }
}
