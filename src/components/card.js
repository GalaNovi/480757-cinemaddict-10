import AbstractSmartComponent from './abstract-smart-component';
import {capitalize, formatTime} from '../utils/common';
import {DESCRIPTION_MAX_LENGTH} from '../const';

const createRatingMarkup = (commonRating) => commonRating >= 1 ? `<p class="film-card__rating">${commonRating}</p>` : ``;

const shortenText = (text, characters) => {
  if (text.length > characters) {
    text = `${text.slice(0, characters - 1)}...`;
  }

  return text;
};

const createCardMarkup = (movieData) => {
  const {
    name,
    poster,
    rating: commonRating,
    description,
  } = movieData.movieInfo;

  const {
    isOnTheWatchlist,
    isAlredyWatched,
    isFavorite,
  } = movieData.userInfo;

  const {comments} = movieData;
  const year = new Date(movieData.movieInfo.release.date).getFullYear();
  const commentsNumber = comments.length;
  const duration = formatTime(movieData.movieInfo.duration);
  const genres = movieData.movieInfo.genres.map((genre) => capitalize(genre)).join(` `);
  const ratingMarkup = createRatingMarkup(commonRating);

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
      <p class="film-card__description">${shortenText(description, DESCRIPTION_MAX_LENGTH)}</p>
      <a class="film-card__comments">${commentsNumber} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isOnTheWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isAlredyWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorite ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Card extends AbstractSmartComponent {
  constructor(movieData) {
    super();
    this._movieData = movieData;
  }

  getTemplate() {
    return createCardMarkup(this._movieData);
  }

  setOpenCallback(callback) {
    if (callback) {
      this._openCallback = callback;
    }
    const openingBigCardElements = [
      this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__comments`),
    ];

    openingBigCardElements.forEach((element) => {
      element.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._openCallback();
      });
    });
  }

  setWatchlistButtonCallback(callback) {
    if (callback) {
      this._watchlistButtonCallback = callback;
    }
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._watchlistButtonCallback();
      });
  }

  setWatchedButtonCallback(callback) {
    if (callback) {
      this._watchedButtonCallback = callback;
    }
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._watchedButtonCallback();
      });
  }

  setFavoriteButtonCallback(callback) {
    if (callback) {
      this._favoriteButtonCallback = callback;
    }
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._favoriteButtonCallback();
      });
  }

  recoveryListeners() {
    this.setWatchlistButtonCallback();
    this.setWatchedButtonCallback();
    this.setFavoriteButtonCallback();
    this.setOpenCallback();
  }
}
