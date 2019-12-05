
import Profile from './components/profile';
import Menu from './components/menu';
import Sort from './components/sort';
import MoviesContainer from './components/movies-container';
import Card from './components/card';
import BigCard from './components/big-card';
import ExtraMovies from './components/extra-movies';
import {render} from './utils';
import {generateCards} from './mock/card';
import {EXTRA_MOVIES_HEADINGS} from './const';

const MoviesCount = {
  ALL: 22,
  START: 5,
  ADD: 5,
  EXTRA: 2,
};
const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const moviesData = generateCards(MoviesCount.ALL);
const alredyWathedMoviesNumber = moviesData.filter((movie) => movie.movieInfo.isAlredyWatched).length;
const moviesContainerComponent = new MoviesContainer();
const moviesListElement = moviesContainerComponent.getElement().querySelector(`.films-list__container`);
const loadButtonElement = moviesContainerComponent.getElement().querySelector(`.films-list__show-more`);
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
let shownMoviesCounter = 0;

const getExtraMovies = (movies, parameter) => {
  const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
  return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, MoviesCount.EXTRA) : false;
};

const topRatedMovies = getExtraMovies(moviesData, `topRated`);
const mostCommentedMovies = getExtraMovies(moviesData, `mostCommented`);

const renderMovieCard = (container, movieData) => {
  const card = new Card(movieData);
  const bigCard = new BigCard(movieData);
  const bigCardCloseElement = bigCard.getElement().querySelector(`.film-details__close-btn`);
  const openingBigCardElements = [
    card.getElement().querySelector(`.film-card__poster`),
    card.getElement().querySelector(`.film-card__title`),
    card.getElement().querySelector(`.film-card__comments`),
  ];

  const onEsqKeyDown = (evt) => {
    evt.preventDefault();
    closeBigCard();
  };

  const openBigCard = () => {
    render(bodyElement, bigCard.getElement());
    document.addEventListener(`keydown`, onEsqKeyDown);
  };

  const closeBigCard = () => {
    bigCard.getElement().remove();
    document.removeEventListener(`keydown`, onEsqKeyDown);
  };

  const onCloseElementClick = () => {
    closeBigCard();
  };

  openingBigCardElements.forEach((element) => {
    element.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      openBigCard();
      bigCardCloseElement.addEventListener(`click`, onCloseElementClick);
    });
  });

  render(container, card.getElement())
};

const renderMainMovies = (container, moviesForRender) => {
  moviesForRender.forEach((movieForRender) => renderMovieCard(container, movieForRender));
  shownMoviesCounter += moviesForRender.length;
};

const initLoadButton = (button, moviesForRender) => {
  if (shownMoviesCounter !== moviesData.length) {

    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      renderMainMovies(moviesListElement, moviesForRender.slice(shownMoviesCounter, shownMoviesCounter + MoviesCount.ADD));
      if (moviesForRender.length === shownMoviesCounter) {
        button.remove();
      }
    });
  }
};

const renderExtraMovies = (moviesForRender, heading) => {
  const doesHasMovies = Boolean(moviesForRender.length);
  const extraMoviesComponent = new ExtraMovies(heading, moviesContainerComponent);
  const extraMoviesListElement = extraMoviesComponent.getElement().querySelector(`.films-list__container`);

  if (doesHasMovies) {
    moviesForRender.forEach((movieForRender) => renderMovieCard(extraMoviesListElement, movieForRender));
  } else {
    extraMoviesComponent.getElement().innerHTML = ``;
  }

  render(moviesContainerComponent.getElement(), extraMoviesComponent.getElement());
};

render(headerElement, new Profile(alredyWathedMoviesNumber).getElement());
render(mainElement, new Menu(moviesData).getElement());
render(mainElement, new Sort().getElement());

renderMainMovies(moviesListElement, moviesData.slice(shownMoviesCounter, MoviesCount.START));
initLoadButton(loadButtonElement, moviesData, moviesListElement);
render(mainElement, moviesContainerComponent.getElement());
renderExtraMovies(topRatedMovies, EXTRA_MOVIES_HEADINGS[0]);
renderExtraMovies(mostCommentedMovies, EXTRA_MOVIES_HEADINGS[1]);
document.querySelector(`.footer__statistics p`).textContent = `${moviesData.length} movies inside`;
