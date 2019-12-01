import {createProfileTemplate} from './components/profile';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createFilmsContainerTemplate} from './components/films-container';
import {createFilmListTemplate} from './components/film-list';
import {createCardTemplate} from './components/card';
import {createMoreButtonTemplate} from './components/more-button';
import {createExtraFilmListTemplate} from './components/extra-film-list';
import {createFilmModalTemplate} from './components/film-modal';

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
const EXTRA_FILM_HEADINGS = [`Top rated`, `Most commented`];

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);

renderTemplate(createProfileTemplate(), headerElement);
renderTemplate(createFilterTemplate(), mainElement);
renderTemplate(createSortTemplate(), mainElement);
const filmsContainerElement = renderTemplate(createFilmsContainerTemplate(), mainElement);
const filmListElement = renderTemplate(createFilmListTemplate(), filmsContainerElement).querySelector(`.films-list__container`);
new Array(FILMS_COUNT)
  .fill(``)
  .forEach(() => renderTemplate(createCardTemplate(), filmListElement));
renderTemplate(createMoreButtonTemplate(), filmsContainerElement.querySelector(`.films-list`));
EXTRA_FILM_HEADINGS.forEach((heading) => renderTemplate(createExtraFilmListTemplate(heading, EXTRA_FILMS_COUNT), filmsContainerElement));
renderTemplate(createFilmModalTemplate(), bodyElement).style.display = `none`; // Что бы не мешал.
