import {createProfileTemplate} from './components/profile';
import {createMenuTemplate} from './components/menu';
import {createSortTemplate} from './components/sort';
import {createFilmsContainerTemplate} from './components/films-container';
import {createFilmListTemplate} from './components/film-list';
import {createCardTemplate} from './components/card';
import {createMoreButtonTemplate} from './components/more-button';
import {createExtraFilmListTemplate} from './components/extra-film-list';
import {createFilmModalTemplate} from './components/film-modal';
import {generateMovies} from './mock/movie';

const createElement = (templateString) => {
  const template = document.createElement(`template`);
  template.innerHTML = templateString;
  return template.content.firstElementChild;
};

const renderTemplate = (template, element) => {
  const childElement = createElement(template);
  return element.appendChild(childElement);
};

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const ExtraFilmHeadings = [`Top rated`, `Most commented`];

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const movies = generateMovies(FILMS_COUNT);
const topRatedMovies = generateMovies(EXTRA_FILMS_COUNT);
const mostCommentedMovies = generateMovies(EXTRA_FILMS_COUNT);

renderTemplate(createProfileTemplate(), headerElement);
renderTemplate(createMenuTemplate(), mainElement);
renderTemplate(createSortTemplate(), mainElement);
const filmsContainerElement = renderTemplate(createFilmsContainerTemplate(), mainElement);
const filmListElement = renderTemplate(createFilmListTemplate(), filmsContainerElement).querySelector(`.films-list__container`);
movies.forEach((movie) => renderTemplate(createCardTemplate(movie), filmListElement));
renderTemplate(createMoreButtonTemplate(), filmsContainerElement.querySelector(`.films-list`));
const topRatedListElement = renderTemplate(createExtraFilmListTemplate(ExtraFilmHeadings[0]), filmsContainerElement).querySelector(`.films-list__container`);
const mostCommentedListElement = renderTemplate(createExtraFilmListTemplate(ExtraFilmHeadings[1]), filmsContainerElement).querySelector(`.films-list__container`);
topRatedMovies.forEach((movie) => renderTemplate(createCardTemplate(movie), topRatedListElement));
mostCommentedMovies.forEach((movie) => renderTemplate(createCardTemplate(movie), mostCommentedListElement));

renderTemplate(createFilmModalTemplate(), bodyElement).style.display = `none`; // Что бы не мешал.
