import {renderTemplate} from './utils';
import {createProfileTemplate} from './components/profile';
import {createMenuTemplate} from './components/menu';
import {createSortTemplate} from './components/sort';
import {createFilmsContainerTemplate} from './components/films-container';
import {createFilmListTemplate} from './components/film-list';
import {createCardTemplate} from './components/card';
import {createMoreButtonTemplate} from './components/more-button';
import {createExtraFilmListTemplate} from './components/extra-film-list';
import {createFilmModalTemplate} from './components/film-modal';
import {generateCards} from './mock/card';
import {extraFilmHeadings} from './const';

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const movies = generateCards(FILMS_COUNT);
const topRatedMovies = generateCards(EXTRA_FILMS_COUNT);
const mostCommentedMovies = generateCards(EXTRA_FILMS_COUNT);
const alredyWathedMoviesNumber = movies.filter((movie) => movie.movieInfo.isAlredyWatched).length;

renderTemplate(createProfileTemplate(alredyWathedMoviesNumber), headerElement);
renderTemplate(createMenuTemplate(movies), mainElement);
renderTemplate(createSortTemplate(), mainElement);
const filmsContainerElement = renderTemplate(createFilmsContainerTemplate(), mainElement);
const filmListElement = renderTemplate(createFilmListTemplate(), filmsContainerElement).querySelector(`.films-list__container`);
movies.forEach((movie) => renderTemplate(createCardTemplate(movie), filmListElement));
renderTemplate(createMoreButtonTemplate(), filmsContainerElement.querySelector(`.films-list`));
const topRatedListElement = renderTemplate(createExtraFilmListTemplate(extraFilmHeadings[0]), filmsContainerElement).querySelector(`.films-list__container`);
const mostCommentedListElement = renderTemplate(createExtraFilmListTemplate(extraFilmHeadings[1]), filmsContainerElement).querySelector(`.films-list__container`);
topRatedMovies.forEach((movie) => renderTemplate(createCardTemplate(movie), topRatedListElement));
mostCommentedMovies.forEach((movie) => renderTemplate(createCardTemplate(movie), mostCommentedListElement));
document.querySelector(`.footer__statistics p`).textContent = `${movies.length} movies inside`;
renderTemplate(createFilmModalTemplate(movies[0]), bodyElement); // Что бы не мешал.
