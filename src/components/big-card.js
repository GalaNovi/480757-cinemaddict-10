import AbstractSmartComponent from './abstract-smart-component';
import {capitalize, formatTime} from '../utils/common';
import {MONTHS} from '../const';

const getCommentTimeAgoText = (dateTime) => {
  const secondsAgo = Math.floor((Date.now() - dateTime) / 1000);
  const minutesAgo = Math.floor((Date.now() - dateTime) / 1000 / 60);
  const hoursAgo = Math.floor((Date.now() - dateTime) / 1000 / 60 / 60);
  const daysAgo = Math.floor((Date.now() - dateTime) / 1000 / 60 / 60 / 24);

  if (secondsAgo < 60) {
    return `now`;
  } else if (minutesAgo <= 3) {
    return `a minute ago`;
  } else if (minutesAgo < 60) {
    return `a few minutes ago`;
  } else if (hoursAgo < 2) {
    return `a hour ago`;
  } else if (hoursAgo < 24) {
    return `a few hours ago`;
  } else if (daysAgo === 1) {
    return `a day ago`;
  } else if (daysAgo === 2) {
    return `a two days ago`;
  } else {
    return `more then two days ago`;
  }
};

const createRatingMarkup = (rating) => rating >= 1 ? `<p class="film-details__total-rating">${rating}</p>` : ``;

const createCommentsMarkup = (comment) => {
  const {author, text, date, emotion} = comment;
  const commentTimeAgoText = getCommentTimeAgoText(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentTimeAgoText}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createUserRatingMarkup = (movieData) => {
  const {poster, name} = movieData.movieInfo;

  return (
    `<div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${name}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked="">
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

const createBigCardMarkup = (movieData) => {
  const {
    poster,
    ageLimit,
    name,
    originalName,
    rating,
    director,
    release,
    duration,
    genres,
    description,
    isOnTheWatchlist,
    isAlredyWatched,
    isFavorite
  } = movieData.movieInfo;

  const {comments} = movieData;
  const ratingMarkup = createRatingMarkup(rating);
  const writers = movieData.movieInfo.writers.join(`, `);
  const actors = movieData.movieInfo.actors.join(`, `);
  const date = new Date(release.date);
  const releaseDate = `${date.getDate()} ${MONTHS[date.getMonth() - 1]} ${date.getFullYear()}`;
  const country = release.country;
  const genresMarkup = genres.map((genre) => `<span class="film-details__genre">${capitalize(genre)}</span>`).join(``);
  const commentsMarkup = comments.map((comment) => createCommentsMarkup(comment)).join(``);
  const userRatingMarkup = createUserRatingMarkup(movieData);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageLimit}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${originalName}</p>
                </div>

                <div class="film-details__rating">
                  ${ratingMarkup}
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatTime(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresMarkup}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist"${isOnTheWatchlist ? ` checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched"${isAlredyWatched ? ` checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"${isFavorite ? ` checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class BigCard extends AbstractSmartComponent {
  constructor(movieData) {
    super();
    this._movieData = movieData;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createBigCardMarkup(this._movieData);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  setCloseButtonHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  setWatchlistButtonCallback(callback) {
    this._watchlistButtonCallback = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._watchlistButtonCallback();
      });
  }

  setWatchedButtonCallback(callback) {
    this._watchedButtonCallback = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._watchedButtonCallback();
      });
  }

  setFavoriteButtonCallback(callback) {
    this._favoriteButtonCallback = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._favoriteButtonCallback();
      });
  }

  _subscribeOnEvents() {
    this.setWatchlistButtonCallback(this._watchlistButtonCallback);
    this.setWatchedButtonCallback(this._watchedButtonCallback);
    this.setFavoriteButtonCallback(this._favoriteButtonCallback);
  }
}
