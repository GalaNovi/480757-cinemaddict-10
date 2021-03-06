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
import {EXTRA_MOVIES_HEADINGS, RequestType, MoviesAmount, MoviesType, SRC_IMAGES} from '../const';

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

const renderHiddenBlockWithImages = (srcImages) => {
  const blockElement = document.createElement(`div`);
  blockElement.setAttribute(`style`, `display: none;`);
  srcImages.forEach((imageSrc) => {
    const imageElement = document.createElement(`img`);
    imageElement.setAttribute(`src`, imageSrc);
    blockElement.appendChild(imageElement);
  });

  render(document.body, blockElement);
};

export class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._extraMoviesAmount = MoviesAmount.EXTRA;
    this._renderedMoviesAmount = MoviesAmount.START;
    this._moviesContainerComponent = new MoviesContainer();
    this._mainMoviesComponent = new MainMovies();
    this._shownMoviesInstances = [];
    this._moviesData = [];
    this._extraMoviesComponents = [];
    this._isDataExchange = false;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onCloseBigCard = this._onCloseBigCard.bind(this);
    this._showMovies = this._showMovies.bind(this);
    this._showStatistic = this._showStatistic.bind(this);
    this._getDataExchangeStatus = this._getDataExchangeStatus.bind(this);

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

    renderHiddenBlockWithImages(SRC_IMAGES);
    this._container.querySelector(`.footer__statistics p`).textContent = `${allMovies.length} movies inside`;
  }

  _renderMovieCard(movieData, container = this._mainMoviesComponent.getMoviesList()) {
    const comments = this._moviesModel.comments;
    const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._onCloseBigCard, this._getDataExchangeStatus);
    const movieInstance = {
      type: MoviesType.MAIN,
      controller: movieController,
    };

    if (container !== this._mainMoviesComponent.getMoviesList()) {
      movieInstance.type = MoviesType.EXTRA;
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
    this._clearMovies(MoviesType.MAIN);
    const moviesData = this._moviesModel.getMoviesForRender();
    const iterator = getNextItemsIterator(moviesData, MoviesAmount.ADD, this._renderedMoviesAmount);
    this._renderMainMovies(iterator);
    this._mainMoviesComponent.setCallback(() => {
      this._renderMainMovies(iterator);
      this._renderedMoviesAmount += MoviesAmount.ADD;
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
    this._clearMovies(MoviesType.EXTRA);
    this._extraMoviesComponents.forEach((component) => component.removeElement());
    this._extraMoviesComponents = [];
  }

  _isExtraMoviesRatingChange() {
    const currentExtraMoviesIdsString = this._shownMoviesInstances
      .filter((item) => item.type === MoviesType.EXTRA)
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

  _onDataChange(oldMovie, newMovie, movieController) {
    this._isDataExchange = true;
    let requestType = null;

    if (oldMovie.comments.length > newMovie.comments.length) {
      requestType = RequestType.DELETING_COMMENT;
      const deletedCommentId = oldMovie.comments.find((commentId, index) => commentId !== newMovie.comments[index]);
      movieController.blockDeletedCommentButton();

      this._moviesModel.deleteComment(newMovie, deletedCommentId)
        .then(() => this._updatePage(oldMovie, newMovie))
        .catch(() => {
          this._onRequestError(movieController, requestType);
          movieController.unBlockDeletedCommentButton();
        });

    } else if (newMovie.localComment) {
      requestType = RequestType.CREATING_COMMENT;
      movieController.blockCommentField();

      this._moviesModel.createComment(newMovie, newMovie.localComment)
        .then(() => this._updatePage(oldMovie, newMovie))
        .catch(() => this._onRequestError(movieController, requestType))
        .then(() => movieController.unBlockCommentField());

    } else {
      if (oldMovie.userInfo.isOnTheWatchlist !== newMovie.userInfo.isOnTheWatchlist) {
        requestType = RequestType.WATCHLIST;
      } else if (oldMovie.userInfo.isAlreadyWatched !== newMovie.userInfo.isAlreadyWatched) {
        requestType = RequestType.WATCHED;
      } else if (oldMovie.userInfo.isFavorite !== newMovie.userInfo.isFavorite) {
        requestType = RequestType.FAVORITE;
      } else {
        requestType = RequestType.SETTING_RATING;
      }

      this._moviesModel.updateMovie(oldMovie.id, newMovie)
        .then(() => this._updatePage(oldMovie, newMovie))
        .catch(() => this._onRequestError(movieController, requestType));
    }
  }

  _getDataExchangeStatus() {
    return this._isDataExchange;
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

  _onRequestError(movieController, requestType) {
    this._isDataExchange = false;
    movieController.shake(requestType);
  }

  _updateInstanses(oldMovie, newMovie) {
    const instanceOfChangedMovies = this._shownMoviesInstances.filter(({controller}) => controller.id === oldMovie.id);
    instanceOfChangedMovies.forEach(({controller}) => {
      const updatedMovie = this._moviesModel.getMovie(newMovie.id);
      const updatedComments = this._moviesModel.getMovieComments(newMovie.id);
      controller.update(updatedMovie, updatedComments);
    });
    this._isDataExchange = false;
  }

  _updatePage(oldMovie, newMovie) {
    const alreadyWatchedMovies = this._moviesModel.movies.filter((movie) => movie.userInfo.isAlreadyWatched);

    this._menuController.render();
    this._statisticController.update(alreadyWatchedMovies);
    this._profileComponent.updateRating(getUserRank(alreadyWatchedMovies.length));
    this._updateInstanses(oldMovie, newMovie);
  }
}
