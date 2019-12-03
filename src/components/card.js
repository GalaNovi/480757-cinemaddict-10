import {capitalize} from '../utils';

const formatTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};

const createRatingMarkup = (rating) => rating >= 1 ? `<p class="film-card__rating">${rating}</p>` : ``;

const createCardTemplate = (movie) => {
  const {comments} = movie;
  const {name, poster, rating, description, isOnTheWatchlist, isAlredyWatched, isFavorite} = movie.movieInfo;
  const year = new Date(movie.movieInfo.release.date).getFullYear();
  const commentsNumber = comments.length;
  const duration = formatTime(movie.movieInfo.duration);
  const genres = movie.movieInfo.genres.map((name) => capitalize(name)).join(` `);
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

export {createCardTemplate, formatTime}
