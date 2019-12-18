import AbstractComponent from './abstract-component';
import {capitalize, formatTime} from '../utils/common';

const createRatingMarkup = (rating) => rating >= 1 ? `<p class="film-card__rating">${rating}</p>` : ``;

const createCardMarkup = (movieData) => {
  const {
    name,
    poster,
    rating,
    description,
    isOnTheWatchlist,
    isAlredyWatched,
    isFavorite
  } = movieData.movieInfo;

  const {comments} = movieData;
  const year = new Date(movieData.movieInfo.release.date).getFullYear();
  const commentsNumber = comments.length;
  const duration = formatTime(movieData.movieInfo.duration);
  const genres = movieData.movieInfo.genres.map((genre) => capitalize(genre)).join(` `);
  const ratingMarkup = createRatingMarkup(rating);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      ${ratingMarkup}
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="${poster}" alt="${name}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isOnTheWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isAlredyWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorite ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(movieData) {
    super();
    this._movieData = movieData;
  }

  getTemplate() {
    return createCardMarkup(this._movieData);
  }

  setOpenHandler(handler) {
    const openingBigCardElements = [
      this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__comments`),
    ];

    openingBigCardElements.forEach((element) => {
      element.addEventListener(`click`, handler);
    });
  }

  setWatchlistButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
