
import Profile from './components/profile';
import Menu from './components/menu';
import Sort from './components/sort';
import MoviesContainer from './components/movies-container';
import NoMoviesContainer from './components/no-movies-container';
import Card from './components/card';
import BigCard from './components/big-card';
import ExtraMovies from './components/extra-movies';
import {getNextItemsIterator} from './utils/common';
import {render} from './utils/render';
import {generateCards} from './mock/card';
import {EXTRA_MOVIES_HEADINGS} from './const';

const MOVIES_AMOUNT = 23;
const EXTRA_MOVIES_AMOUNT = 2;
const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const moviesData = generateCards(MOVIES_AMOUNT);
const alredyWathedMoviesNumber = moviesData.filter((movie) => movie.movieInfo.isAlredyWatched).length;
const moviesContainerComponent = new MoviesContainer();
const moviesListElement = moviesContainerComponent.getElement().querySelector(`.films-list__container`);
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
const iterator = getNextItemsIterator(moviesData);
const {value: moviesForRender, done: hasNoMoviesForRender} = iterator.next();

const getExtraMovies = (movies, parameter) => {
  const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
  return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, EXTRA_MOVIES_AMOUNT) : false;
};

const topRatedMovies = getExtraMovies(moviesData, `topRated`);
const mostCommentedMovies = getExtraMovies(moviesData, `mostCommented`);

const renderMovieCard = (container, movie) => {
  const card = new Card(movie);
  const bigCard = new BigCard(movie);

  const onEsqKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closeBigCard();
    }
  };

  const openBigCard = () => {
    render(bodyElement, bigCard);
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
};

const renderMainMovies = (container, movies) => {
  movies.forEach((movie) => renderMovieCard(container, movie));
};

const onLoadButtonClick = (evt) => {
  evt.preventDefault();
  const {value, done} = iterator.next();

  if (value) {
    renderMainMovies(moviesListElement, value);
  }

  if (done) {
    evt.target.remove();
  }
};

const initLoadButton = () => {
  if (!hasNoMoviesForRender) {
    moviesContainerComponent.setLoadButtonHandler(onLoadButtonClick);
  } else {
    moviesContainerComponent.sremoveLoadButton();
  }
};

const renderExtraMovies = (movies, heading) => {
  const doesHasMovies = Boolean(movies.length);
  const extraMoviesComponent = new ExtraMovies(heading, moviesContainerComponent);
  const extraMoviesListElement = extraMoviesComponent.getElement().querySelector(`.films-list__container`);

  if (doesHasMovies) {
    movies.forEach((movie) => renderMovieCard(extraMoviesListElement, movie));
  } else {
    extraMoviesComponent.getElement().innerHTML = ``;
  }

  render(moviesContainerComponent, extraMoviesComponent);
};

render(headerElement, new Profile(alredyWathedMoviesNumber));
render(mainElement, new Menu(moviesData));
render(mainElement, new Sort());

if (moviesData.length) {
  renderMainMovies(moviesListElement, moviesForRender);
  initLoadButton();
  render(mainElement, moviesContainerComponent);
  renderExtraMovies(topRatedMovies, EXTRA_MOVIES_HEADINGS[0]);
  renderExtraMovies(mostCommentedMovies, EXTRA_MOVIES_HEADINGS[1]);
} else {
  render(mainElement, new NoMoviesContainer());
}

document.querySelector(`.footer__statistics p`).textContent = `${moviesData.length} movies inside`;
