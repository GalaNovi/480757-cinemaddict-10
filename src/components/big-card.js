import AbstractSmartComponent from './abstract-smart-component';
import {capitalize, formatTime} from '../utils/common';
import {MONTHS, FILM_DETAILS_TITLES} from '../const';

const USER_RATING_SCORES_AMOUNT = 9;

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

const createRatingMarkup = (commonRating, isAlredyWatched, personalRating) => {
  return (
    `${commonRating >= 1 ? `<p class="film-details__total-rating">${commonRating}</p>` : ``}
    ${isAlredyWatched && personalRating >= 1 ? `<p class="film-details__user-rating">Your rate ${personalRating}</p>` : ``}`
  );
};

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

const createUserRatingScoresMarkup = () => {
  let allMarkup = ``;

  for (let i = 1; i <= USER_RATING_SCORES_AMOUNT; i++) {
    const itemMarkup = (
      `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}"${i === USER_RATING_SCORES_AMOUNT ? ` checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>\n`
    );
    allMarkup += itemMarkup;
  }

  return allMarkup;
};

const createUserRatingFormMarkup = (movieData) => {
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
              ${createUserRatingScoresMarkup()}
            </div>
          </section>
        </div>
      </section>
    </div>`
  );
};

const getNewCommentMarkup = (localComment) => {
  const {comment, emotion} = localComment;
  return (
    `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji">` : ``}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">
          ${comment ? comment : ``}
        </textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping" data-emoji="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face" data-emoji="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning" data-emoji="puke">
        <label class="film-details__emoji-label" for="emoji-gpuke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning" data-emoji="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`
  );
};

const getFilmDetailsMarkup = (filmDetails) => {
  return FILM_DETAILS_TITLES.map((title, index) => (
    `<tr class="film-details__row">
      <td class="film-details__term">${title}</td>
      <td class="film-details__cell">${filmDetails[index]}</td>
    </tr>`
  )).join(`\n`);
};

const createBigCardMarkup = (movieData) => {
  const {
    poster,
    ageLimit,
    name,
    originalName,
    rating: commonRating,
    director,
    release,
    duration,
    genres,
    description,
  } = movieData.movieInfo;

  const {
    personalRating,
    isOnTheWatchlist,
    isAlredyWatched,
    isFavorite,
  } = movieData.userInfo;

  const {localComment} = movieData;

  const {comments} = movieData;
  const ratingMarkup = createRatingMarkup(commonRating, isAlredyWatched, personalRating);
  const writers = movieData.movieInfo.writers.join(`, `);
  const actors = movieData.movieInfo.actors.join(`, `);
  const date = new Date(release.date);
  const releaseDate = `${date.getDate()} ${MONTHS[date.getMonth() - 1]} ${date.getFullYear()}`;
  const country = release.country;
  const genresMarkup = genres.map((genre) => `<span class="film-details__genre">${capitalize(genre)}</span>`).join(``);
  const commentsMarkup = comments.map((comment) => createCommentsMarkup(comment)).join(``);
  const userRatingFormMarkup = createUserRatingFormMarkup(movieData);
  const newCommentMarkup = getNewCommentMarkup(localComment);
  const filmDetailsMarkup = getFilmDetailsMarkup([director, writers, actors, releaseDate, formatTime(duration), country, genresMarkup]);

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
                ${filmDetailsMarkup}
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

        ${isAlredyWatched && !personalRating ? userRatingFormMarkup : ``}

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            ${newCommentMarkup}
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
  }

  getTemplate() {
    return createBigCardMarkup(this._movieData);
  }

  setCloseCallback(callback) {
    if (callback) {
      this._closeCallback = callback;
    }
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._closeCallback();
      });
  }

  setWatchlistButtonCallback(callback) {
    if (callback) {
      this._watchlistButtonCallback = callback;
    }
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._watchlistButtonCallback();
      });
  }

  setWatchedButtonCallback(callback) {
    if (callback) {
      this._watchedButtonCallback = callback;
    }
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._watchedButtonCallback();
      });
  }

  setFavoriteButtonCallback(callback) {
    if (callback) {
      this._favoriteButtonCallback = callback;
    }
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._favoriteButtonCallback();
      });
  }

  setOnEmojiListClickCallback(callback) {
    if (callback) {
      this._onEmojiListClickCallback = callback;
    }

    this.getElement().querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          this._onEmojiListClickCallback(evt.target);
        }
      });
  }

  recoveryListeners() {
    this.setWatchlistButtonCallback();
    this.setWatchedButtonCallback();
    this.setFavoriteButtonCallback();
    this.setCloseCallback();
    this.setOnEmojiListClickCallback();
  }
}
