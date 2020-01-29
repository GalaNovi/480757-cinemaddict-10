import MainMovies from '../components/main-movies';
import ExtraMovies from '../components/extra-movies';
import MoviesContainer from '../components/movies-container';
import NoMoviesContainer from '../components/no-movies-container';
import Profile from '../components/profile';
import {MovieController} from '../controllers/movie';
import {SortController} from './sort';
import {MenuController} from './menu';
import {StatisticController} from '../controllers/statistic';
import {getNextItemsIterator, getUserRank} from '../utils/common';
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
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;
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
    this._showMovies = this._showMovies.bind(this);
    this._showStatistic = this._showStatistic.bind(this);

    this._moviesModel.setSortChangeHandler(this._onSortChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const allMovies = this._moviesModel.movies;
    const moviesForRender = this._moviesModel.getMoviesForRender();
    const headerElement = this._container.querySelector(`.header`);
    const mainElement = this._container.querySelector(`.main`);
    const alreadyWatchedMoviesNumber = allMovies.filter((movie) => movie.userInfo.isAlreadyWatched).length;
    this._sortController = new SortController(mainElement, this._moviesModel);
    this._menuController = new MenuController(mainElement, this._moviesModel, this._showMovies, this._showStatistic);
    this._statisticController = new StatisticController(mainElement, allMovies);
    this._profileComponent = new Profile(alreadyWatchedMoviesNumber);

    render(headerElement, this._profileComponent);
    this._menuController.render();
    this._sortController.render();
    this._statisticController.render();

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
    const doesHasMovies = Boolean(movies);
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
    const requests = [this._api.updateMovie(oldMovie.id, newMovie)];
    let deletedCommentId = null;

    if (oldMovie.comments.length > newMovie.comments.length) {
      deletedCommentId = oldMovie.comments.find((commentId, index) => commentId !== newMovie.comments[index]);
      requests.push(this._api.deleteComment(deletedCommentId));
    }

    if (newMovie.localComment) {
      requests.push(this._api.createComment(newMovie.id, newMovie.localComment));
      delete newMovie.localComment;
    }

    Promise.all(requests)
      .then((response) => {
        const commentInfo = response[1];
        const instanceOfChangedMovies = this._shownMoviesInstances.filter(({controller}) => controller.id === oldMovie.id);
        this._moviesModel.updateMovie(oldMovie.id, newMovie);
        const alreadyWatchedMovies = this._moviesModel.movies.filter((movie) => movie.userInfo.isAlreadyWatched);
        let newComments = null;

        if (deletedCommentId) {
          this._moviesModel.comments = this._moviesModel.comments.filter((comment) => Number(comment.id) !== deletedCommentId);
        }

        if (commentInfo.movie) {
          this._moviesModel.updateMovie(oldMovie.id, commentInfo.movie);
          newComments = commentInfo.comments;
          newMovie = commentInfo.movie;
        }

        instanceOfChangedMovies.forEach(({controller}) => {
          controller.update(newMovie, newComments);
        });

        this._menuController.render();
        this._statisticController.update(alreadyWatchedMovies);
        this._profileComponent.updateRating(getUserRank(alreadyWatchedMovies.length));
      })
      .catch((error) => {
        throw error.message;
      });
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
    this._showMovies();
    this._mainMoviesListInit();
  }

  _showMovies() {
    this._statisticController.hideStatistic();
    this._moviesContainerComponent.show();
    this._sortController.showSort();
  }

  _showStatistic() {
    this._moviesContainerComponent.hide();
    this._statisticController.showStatistic();
    this._sortController.hideSort();
    this._mainMoviesListInit();
  }
}
