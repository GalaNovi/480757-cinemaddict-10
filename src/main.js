import {render} from './utils';
// import {createProfileTemplate} from './components/profile';
// import {createMenuTemplate} from './components/menu';
// import {createSortTemplate} from './components/sort';
// import {createMoviesContainerTemplate} from './components/movies-container';
// import {createCardTemplate} from './components/card';
// import {createExtraMovieListTemplate} from './components/extra-movie-list';
import BigCard from './components/big-card';
import {generateCards} from './mock/card';
// import {EXTRA_MOVIES_HEADINGS} from './const';

const MoviesCount = {
  ALL: 22,
  START: 5,
  ADD: 5,
  EXTRA: 2,
};

let shownMoviesCounter = 0;

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

const getExtraMovies = (movies, parameter) => {
  const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
  return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, MoviesCount.EXTRA) : false;
};

const renderMainMovies = (movies, container) => {
  movies.forEach((movie) => render(createCardTemplate(movie), container));
  shownMoviesCounter = shownMoviesCounter + movies.length;
};

const renderLoadButton = (container) => {
  if (shownMoviesCounter !== movies.length) {
    const loadButtonElement = render(createMoreButtonTemplate(), container.querySelector(`.films-list`));

    loadButtonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      renderMainMovies(movies.slice(shownMoviesCounter, shownMoviesCounter + MoviesCount.ADD), filmListElement);
      if (movies.length === shownMoviesCounter) {
        loadButtonElement.remove();
      }
    });
  }
};

const renderExtraMovies = (movies, heading, container) => {
  const doesHasMovies = Boolean(movies.length);
  const extraMovieList = render(createExtraMovieListTemplate(heading), container).querySelector(`.films-list__container`);

  if (doesHasMovies) {
    movies.forEach((movie) => render(createCardTemplate(movie), extraMovieList));
  } else {
    extraMovieList.parentNode.innerHTML = ``;
  }
};

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);
const movies = generateCards(MoviesCount.ALL);
// const topRatedMovies = getExtraMovies(movies, `topRated`);
// const mostCommentedMovies = getExtraMovies(movies, `mostCommented`);
// const alredyWathedMoviesNumber = movies.filter((movie) => movie.movieInfo.isAlredyWatched).length;

// render(createProfileTemplate(alredyWathedMoviesNumber), headerElement);
// render(createMenuTemplate(movies), mainElement);
// render(createSortTemplate(), mainElement);

// const filmsContainerElement = render(createMoviesContainerTemplate(), mainElement);
// const filmListElement = render(createMovieListTemplate(), filmsContainerElement).querySelector(`.films-list__container`);
// renderMainMovies(movies.slice(shownMoviesCounter, MoviesCount.START), filmListElement);
// renderLoadButton(filmsContainerElement);
// renderExtraMovies(topRatedMovies, EXTRA_MOVIES_HEADINGS[0], filmsContainerElement);
// renderExtraMovies(mostCommentedMovies, EXTRA_MOVIES_HEADINGS[1], filmsContainerElement);
// document.querySelector(`.footer__statistics p`).textContent = `${movies.length} movies inside`;

render(bodyElement, new BigCard(movies[0]).getElement()); // Что бы не мешал.
