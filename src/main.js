import {renderTemplate} from './utils';
import {createProfileTemplate} from './components/profile';
import {createMenuTemplate} from './components/menu';
import {createSortTemplate} from './components/sort';
import {createMoviesContainerTemplate} from './components/movies-container';
import {createMovieListTemplate} from './components/movie-list';
import {createCardTemplate} from './components/card';
import {createMoreButtonTemplate} from './components/more-button';
import {createExtraMovieListTemplate} from './components/extra-movie-list';
import {createBigCardTemplate} from './components/big-card';
import {generateCards} from './mock/card';
import {extraFilmHeadings} from './const';

const MoviesCount = {
  ALL: 22,
  START: 5,
  ADD: 5,
  EXTRA: 2,
};

let shownMoviesCounter = 0;

const extraMoviesParameters = {
  'topRated': {
    'filter': ({movieInfo}) => movieInfo.rating >= 1,
    'sort': (a, b) => b.movieInfo.rating - a.movieInfo.rating,
  },
  'mostCommented': {
    'filter': ({comments}) => comments.length >= 1,
    'sort': (a, b) => b.comments.length - a.comments.length,
  },
};

const getExtraMovies = (movies, parameter) => {
  const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
  return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, MoviesCount.EXTRA) : false;
};

const renderMainMovies = (movies, container) => {
  movies.forEach((movie) => renderTemplate(createCardTemplate(movie), container));
  shownMoviesCounter = shownMoviesCounter + movies.length;
};

const renderLoadButton = (container) => {
  if (shownMoviesCounter !== movies.length) {
    const loadButtonElement = renderTemplate(createMoreButtonTemplate(), container.querySelector(`.films-list`));

    loadButtonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      renderMainMovies(movies.slice(shownMoviesCounter, shownMoviesCounter + MoviesCount.ADD), filmListElement);
      if (movies.length === shownMoviesCounter) {
        loadButtonElement.remove();
      }
    });
  }
};

const renderExtraMovies = (topRatedMovies, mostCommentedMovies, container) => {
  let topRatedListElement;
  let mostCommentedListElement;

  if (topRatedMovies || mostCommentedMovies) {
    topRatedListElement = renderTemplate(createExtraMovieListTemplate(extraFilmHeadings[0]), container).querySelector(`.films-list__container`);
    mostCommentedListElement = renderTemplate(createExtraMovieListTemplate(extraFilmHeadings[1]), container).querySelector(`.films-list__container`);
  }
  if (topRatedMovies) {
    topRatedMovies.forEach((movie) => renderTemplate(createCardTemplate(movie), topRatedListElement));
  }

  if (mostCommentedMovies) {
    mostCommentedMovies.forEach((movie) => renderTemplate(createCardTemplate(movie), mostCommentedListElement));
  }
};

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const movies = generateCards(MoviesCount.ALL);
const topRatedMovies = getExtraMovies(movies, `topRated`);
const mostCommentedMovies = getExtraMovies(movies, `mostCommented`);
const alredyWathedMoviesNumber = movies.filter((movie) => movie.movieInfo.isAlredyWatched).length;

renderTemplate(createProfileTemplate(alredyWathedMoviesNumber), headerElement);
renderTemplate(createMenuTemplate(movies), mainElement);
renderTemplate(createSortTemplate(), mainElement);


const filmsContainerElement = renderTemplate(createMoviesContainerTemplate(), mainElement);
const filmListElement = renderTemplate(createMovieListTemplate(), filmsContainerElement).querySelector(`.films-list__container`);
renderMainMovies(movies.slice(shownMoviesCounter, MoviesCount.START), filmListElement);
renderLoadButton(filmsContainerElement);
renderExtraMovies(topRatedMovies, mostCommentedMovies, filmsContainerElement);
document.querySelector(`.footer__statistics p`).textContent = `${movies.length} movies inside`;

renderTemplate(createBigCardTemplate(movies[0]), bodyElement).style.display = `none`; // Что бы не мешал.
