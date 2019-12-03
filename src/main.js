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

const FILMS_COUNT = 5;
const EXTRA_MOVIES_COUNT = 2;
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
  return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, EXTRA_MOVIES_COUNT) : false;
};

const renderExtraMovies = (topRatedMovies, mostCommentedMovies) => {
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
const movies = generateCards(FILMS_COUNT);
const topRatedMovies = getExtraMovies(movies, `topRated`);
const mostCommentedMovies = getExtraMovies(movies, `mostCommented`);
const alredyWathedMoviesNumber = movies.filter((movie) => movie.movieInfo.isAlredyWatched).length;

renderTemplate(createProfileTemplate(alredyWathedMoviesNumber), headerElement);
renderTemplate(createMenuTemplate(movies), mainElement);
renderTemplate(createSortTemplate(), mainElement);
const filmsContainerElement = renderTemplate(createMoviesContainerTemplate(), mainElement);
const filmListElement = renderTemplate(createMovieListTemplate(), filmsContainerElement).querySelector(`.films-list__container`);
movies.forEach((movie) => renderTemplate(createCardTemplate(movie), filmListElement));
renderTemplate(createMoreButtonTemplate(), filmsContainerElement.querySelector(`.films-list`));
const topRatedListElement = renderTemplate(createExtraMovieListTemplate(extraFilmHeadings[0]), filmsContainerElement).querySelector(`.films-list__container`);
const mostCommentedListElement = renderTemplate(createExtraMovieListTemplate(extraFilmHeadings[1]), filmsContainerElement).querySelector(`.films-list__container`);
renderExtraMovies(topRatedMovies, mostCommentedMovies);
document.querySelector(`.footer__statistics p`).textContent = `${movies.length} movies inside`;
renderTemplate(createBigCardTemplate(movies[0]), bodyElement).style.display = `none`; // Что бы не мешал.
