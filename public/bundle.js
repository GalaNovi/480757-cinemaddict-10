/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");


class AbstractComponent {
  constructor() {
    this._element = null;

    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this.removeElement = this.removeElement.bind(this);
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this.getElement().remove();
    this._element = null;
  }

  set element(value) {
    this._element = value;
  }
}


/***/ }),

/***/ "./src/components/abstract-smart-component.js":
/*!****************************************************!*\
  !*** ./src/components/abstract-smart-component.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractSmartComponent; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


class AbstractSmartComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.element = null;
    const newElement = this.getElement();
    if (parent) {
      parent.replaceChild(newElement, oldElement);
    }
    this.recoveryListeners();
  }

  update(newData) {
    this._movieData = newData;
    this.rerender();
  }
}


/***/ }),

/***/ "./src/components/big-card.js":
/*!************************************!*\
  !*** ./src/components/big-card.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BigCard; });
/* harmony import */ var _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-smart-component */ "./src/components/abstract-smart-component.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");




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
  return _const__WEBPACK_IMPORTED_MODULE_2__["FILM_DETAILS_TITLES"].map((title, index) => (
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
  const releaseDate = `${date.getDate()} ${_const__WEBPACK_IMPORTED_MODULE_2__["MONTHS"][date.getMonth() - 1]} ${date.getFullYear()}`;
  const country = release.country;
  const genresMarkup = genres.map((genre) => `<span class="film-details__genre">${Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(genre)}</span>`).join(``);
  const commentsMarkup = comments.map((comment) => createCommentsMarkup(comment)).join(``);
  const userRatingFormMarkup = createUserRatingFormMarkup(movieData);
  const newCommentMarkup = getNewCommentMarkup(localComment);
  const filmDetailsMarkup = getFilmDetailsMarkup([director, writers, actors, releaseDate, Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__["formatTime"])(duration), country, genresMarkup]);

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

class BigCard extends _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
/* harmony import */ var _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-smart-component */ "./src/components/abstract-smart-component.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");



const createRatingMarkup = (commonRating) => commonRating >= 1 ? `<p class="film-card__rating">${commonRating}</p>` : ``;

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
  const duration = Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__["formatTime"])(movieData.movieInfo.duration);
  const genres = movieData.movieInfo.genres.map((genre) => Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(genre)).join(` `);
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

class Card extends _abstract_smart_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/components/extra-movies.js":
/*!****************************************!*\
  !*** ./src/components/extra-movies.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtraMovies; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createExtraMoviesMarkup = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

class ExtraMovies extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(heading) {
    super();
    this._heading = heading;
  }

  getTemplate() {
    return createExtraMoviesMarkup(this._heading);
  }

  getMoviesListElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}


/***/ }),

/***/ "./src/components/main-movies.js":
/*!***************************************!*\
  !*** ./src/components/main-movies.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainMovies; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createMainMoviesMarkup = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
      <button class="films-list__show-more">Show more</button>
    </section>`
  );
};

class MainMovies extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._isNeedSetHandler = true;
  }

  getTemplate() {
    return createMainMoviesMarkup();
  }

  setCallback(callback) {
    this._callback = callback;

    if (this._isNeedSetHandler) {
      this.getElement().querySelector(`.films-list__show-more`)
        .addEventListener(`click`, () => this._callback());
    }

    this._isNeedSetHandler = false;
  }

  toggleShowLoadButton(areAllMoviesShown) {
    const loadMoreButton = this.getElement().querySelector(`.films-list__show-more`);
    if (areAllMoviesShown) {
      loadMoreButton.classList.toggle(`visually-hidden`);
    }
  }

  getMoviesList() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}


/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");




const filterParameters = {
  all: ``,
  watchlist: (movie) => movie.movieInfo.isOnTheWatchlist,
  history: (movie) => movie.movieInfo.isAlredyWatched,
  favorites: (movie) => movie.movieInfo.isFavorite,
};

const createFilterMarkup = (filter, movies) => {
  const activeClass = filter === `all` ? ` main-navigation__item--active` : ``;
  const counterMarkup = filter === `all` ? `All movies` : `${Object(_utils_common__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(filter)} <span class="main-navigation__item-count">${movies.filter(filterParameters[filter]).length}</span>`;

  return (
    `<a href="#${filter}" class="main-navigation__item${activeClass}">
      ${counterMarkup}
    </a>`
  );
};

const createMenuMarkup = (moviesData) => {
  const filtersMarkup = _const__WEBPACK_IMPORTED_MODULE_2__["FILTERS"].map((filter) => createFilterMarkup(filter, moviesData)).join(``);

  return (
    `<nav class="main-navigation">
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

class Menu extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(moviesData) {
    super();
    this._moviesData = moviesData;
  }

  getTemplate() {
    return createMenuMarkup(this._moviesData);
  }
}


/***/ }),

/***/ "./src/components/movies-container.js":
/*!********************************************!*\
  !*** ./src/components/movies-container.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MoviesContainer; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createMoviesContainerMarkup = () => {
  return (
    `<section class="films">
    </div>`
  );
};

class MoviesContainer extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createMoviesContainerMarkup();
  }
}


/***/ }),

/***/ "./src/components/no-movies-container.js":
/*!***********************************************!*\
  !*** ./src/components/no-movies-container.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoMoviesContainer; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createNoMoviesContainerMarkup = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </div>`
  );
};

class NoMoviesContainer extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createNoMoviesContainerMarkup();
  }
}


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Profile; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createProfileRatingMarkup = (moviesAmount) => {
  let markup = ``;

  if (moviesAmount > 0 && moviesAmount <= 10) {
    markup = `<p class="profile__rating">Novice</p>`;
  } else if (moviesAmount > 10 && moviesAmount <= 20) {
    markup = `<p class="profile__rating">Fan</p>`;
  } else if (moviesAmount > 20) {
    markup = `<p class="profile__rating">Movie Buff</p>`;
  }

  return markup;
};

const createProfileMarkup = (moviesAmount) => {
  const profileRatingMarkup = createProfileRatingMarkup(moviesAmount);

  return (
    `<section class="header__profile profile">
      ${profileRatingMarkup}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class Profile extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(moviesAmount) {
    super();
    this._moviesAmount = moviesAmount;
  }

  getTemplate() {
    return createProfileMarkup(this._moviesAmount);
  }
}


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sort; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const SORT_LINK_ACTIVE_CLASS = `sort__button--active`;
const sortParameters = {
  date: (a, b) => b.movieInfo.release.date - a.movieInfo.release.date,
  rating: (a, b) => b.movieInfo.rating - a.movieInfo.rating,
};

const createSortMarkup = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="date">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="rating">Sort by rating</a></li>
    </ul>`
  );
};

class Sort extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._sortType = `default`;
    this._sortLinkActive = this.getElement().querySelector(`.${SORT_LINK_ACTIVE_CLASS}`);
  }

  get sortType() {
    return this._sortType;
  }

  getTemplate() {
    return createSortMarkup();
  }

  sortData(data) {
    if (this._sortType === `default`) {
      return data.slice();
    } else {
      return data.slice().sort(sortParameters[this._sortType]);
    }
  }

  setCallback(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A`) {
        evt.preventDefault();
        const sortLink = evt.target;
        const sortType = sortLink.getAttribute(`data-sort-type`);
        this._setCurrentSortType(sortLink, sortType);
        callback();
      }
    });
  }

  _setCurrentSortType(newSortLink, newSortType) {
    this._changeActiveSortLink(newSortLink);
    this._sortType = newSortType;
  }

  _changeActiveSortLink(newSortLink) {
    this._sortLinkActive.classList.remove(SORT_LINK_ACTIVE_CLASS);
    newSortLink.classList.add(SORT_LINK_ACTIVE_CLASS);
    this._sortLinkActive = newSortLink;
  }
}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: EXTRA_MOVIES_HEADINGS, FILTERS, EMOTIONS, MONTHS, Position, FILM_DETAILS_TITLES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTRA_MOVIES_HEADINGS", function() { return EXTRA_MOVIES_HEADINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTERS", function() { return FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMOTIONS", function() { return EMOTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTHS", function() { return MONTHS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILM_DETAILS_TITLES", function() { return FILM_DETAILS_TITLES; });
const EXTRA_MOVIES_HEADINGS = [`Top rated`, `Most commented`];
const FILTERS = [`all`, `watchlist`, `history`, `favorites`];
const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];
const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `Jule`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
const FILM_DETAILS_TITLES = [
  `Director`,
  `Writers`,
  `Actors`,
  `Release Date`,
  `Runtime`,
  `Country`,
  `Genres`,
];

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};




/***/ }),

/***/ "./src/controllers/movie.js":
/*!**********************************!*\
  !*** ./src/controllers/movie.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovieController; });
/* harmony import */ var _components_big_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/big-card */ "./src/components/big-card.js");
/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/card */ "./src/components/card.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");




class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEsqKeyDown = this._onEsqKeyDown.bind(this);
    this._openBigCard = this._openBigCard.bind(this);
    this._closeBigCard = this._closeBigCard.bind(this);
  }

  get id() {
    return this._id;
  }

  render(movieData) {
    this._id = movieData.id;
    this._cardComponent = new _components_card__WEBPACK_IMPORTED_MODULE_1__["default"](movieData);
    this._bigCardComponent = new _components_big_card__WEBPACK_IMPORTED_MODULE_0__["default"](movieData);

    this._cardComponent.setOpenCallback(this._openBigCard);

    this._bigCardComponent.setCloseCallback(this._closeBigCard);

    this._bigCardComponent.setOnEmojiListClickCallback((clickedElement) => {
      this._onDataChange(movieData, Object.assign({}, movieData, {
        localComment: Object.assign(movieData.localComment, {
          emotion: clickedElement.getAttribute(`data-emoji`),
        })
      }));
    });

    [this._cardComponent, this._bigCardComponent].forEach((component) => {
      component.setWatchlistButtonCallback(() => {
        this._onDataChange(movieData, Object.assign({}, movieData, {
          userInfo: Object.assign(movieData.userInfo, {
            isOnTheWatchlist: !movieData.userInfo.isOnTheWatchlist
          })
        }));
      });

      component.setWatchedButtonCallback(() => {
        this._onDataChange(movieData, Object.assign({}, movieData, {
          userInfo: Object.assign(movieData.userInfo, {
            personalRating: 0,
            isAlredyWatched: !movieData.userInfo.isAlredyWatched
          })
        }));
      });

      component.setFavoriteButtonCallback(() => {
        this._onDataChange(movieData, Object.assign({}, movieData, {
          userInfo: Object.assign(movieData.userInfo, {
            isFavorite: !movieData.userInfo.isFavorite
          })
        }));
      });
    });

    Object(_utils_render__WEBPACK_IMPORTED_MODULE_2__["render"])(this._container, this._cardComponent);
  }

  removeElements() {
    this._cardComponent.removeElement();
    this._bigCardComponent.removeElement();
  }

  updateComponents(newData) {
    this._cardComponent.update(newData);
    this._bigCardComponent.update(newData);
  }

  setDefaultView() {
    this._closeBigCard();
  }

  _onEsqKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeBigCard();
    }
  }

  _openBigCard() {
    this._onViewChange();
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_2__["render"])(document.body, this._bigCardComponent);
    document.addEventListener(`keydown`, this._onEsqKeyDown);
  }

  _closeBigCard() {
    this._bigCardComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onEsqKeyDown);
  }
}


/***/ }),

/***/ "./src/controllers/page.js":
/*!*********************************!*\
  !*** ./src/controllers/page.js ***!
  \*********************************/
/*! exports provided: PageController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageController", function() { return PageController; });
/* harmony import */ var _components_main_movies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/main-movies */ "./src/components/main-movies.js");
/* harmony import */ var _components_extra_movies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/extra-movies */ "./src/components/extra-movies.js");
/* harmony import */ var _components_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/menu */ "./src/components/menu.js");
/* harmony import */ var _components_movies_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/movies-container */ "./src/components/movies-container.js");
/* harmony import */ var _components_no_movies_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/no-movies-container */ "./src/components/no-movies-container.js");
/* harmony import */ var _components_profile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/profile */ "./src/components/profile.js");
/* harmony import */ var _components_sort__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/sort */ "./src/components/sort.js");
/* harmony import */ var _controllers_movie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/movie */ "./src/controllers/movie.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../const */ "./src/const.js");












const START_MOVIES_AMOUNT = 5;
const ADD_MOVIES_AMOUNT = 5;
const EXTRA_MOVIES_AMOUNT = 2;
const MAIN_MOVIES_NAME = `main`;
const EXTRA_MOVIES_NAME = `extra`;

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

class PageController {
  constructor(container) {
    this._container = container;
    this._extraMoviesAmount = EXTRA_MOVIES_AMOUNT;
    this._renderedMoviesAmount = START_MOVIES_AMOUNT;
    this._moviesContainerComponent = new _components_movies_container__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this._mainMoviesComponent = new _components_main_movies__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._sortComponent = new _components_sort__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this._shownMoviesInstances = [];
    this._moviesData = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(moviesData) {
    const headerElement = this._container.querySelector(`.header`);
    const mainElement = this._container.querySelector(`.main`);
    const alredyWatchedMoviesNumber = moviesData.filter((movie) => movie.movieInfo.isAlredyWatched).length;
    const topRatedMovies = this._getExtraMovies(moviesData, `topRated`);
    const mostCommentedMovies = this._getExtraMovies(moviesData, `mostCommented`);

    Object(_utils_render__WEBPACK_IMPORTED_MODULE_9__["render"])(headerElement, new _components_profile__WEBPACK_IMPORTED_MODULE_5__["default"](alredyWatchedMoviesNumber));
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_9__["render"])(mainElement, new _components_menu__WEBPACK_IMPORTED_MODULE_2__["default"](moviesData));
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_9__["render"])(mainElement, this._sortComponent);

    if (moviesData.length) {
      Object(_utils_render__WEBPACK_IMPORTED_MODULE_9__["render"])(this._moviesContainerComponent, this._mainMoviesComponent);
      this._mainMoviesListInit(moviesData);
      Object(_utils_render__WEBPACK_IMPORTED_MODULE_9__["render"])(mainElement, this._moviesContainerComponent);
      this._sortComponent.setCallback(() => {
        this._mainMoviesListInit(moviesData);
      });
      this._renderExtraMovies(topRatedMovies, _const__WEBPACK_IMPORTED_MODULE_10__["EXTRA_MOVIES_HEADINGS"][0]);
      this._renderExtraMovies(mostCommentedMovies, _const__WEBPACK_IMPORTED_MODULE_10__["EXTRA_MOVIES_HEADINGS"][1]);
    } else {
      Object(_utils_render__WEBPACK_IMPORTED_MODULE_9__["render"])(mainElement, new _components_no_movies_container__WEBPACK_IMPORTED_MODULE_4__["default"]());
    }

    this._container.querySelector(`.footer__statistics p`).textContent = `${moviesData.length} movies inside`;
  }

  _renderMovieCard(movieData, container = this._mainMoviesComponent.getMoviesList()) {
    const movieController = new _controllers_movie__WEBPACK_IMPORTED_MODULE_7__["default"](container, this._onDataChange, this._onViewChange);
    const movieInstance = {
      type: MAIN_MOVIES_NAME,
      controller: movieController,
    };

    if (container !== this._mainMoviesComponent.getMoviesList()) {
      movieInstance.type = EXTRA_MOVIES_NAME;
    }

    this._shownMoviesInstances.push(movieInstance);
    movieController.render(movieData);
  }

  _renderMainMovies(iterator) {
    const {value: moviesForRender, done: hasNoMoviesForRender} = iterator.next();
    moviesForRender.forEach((movieData) => this._renderMovieCard(movieData));
    this._mainMoviesComponent.toggleShowLoadButton(hasNoMoviesForRender);
  }

  _getExtraMovies(movies, parameter) {
    const extraMovies = movies.filter(extraMoviesParameters[parameter].filter);
    return extraMovies.length ? extraMovies.sort(extraMoviesParameters[parameter].sort).slice(0, this._extraMoviesAmount) : false;
  }

  _renderExtraMovies(movies, heading) {
    const doesHasMovies = Boolean(movies.length);

    if (doesHasMovies) {
      const extraMoviesComponent = new _components_extra_movies__WEBPACK_IMPORTED_MODULE_1__["default"](heading);
      const extraMoviesListElement = extraMoviesComponent.getMoviesListElement();
      movies.forEach((movie) => this._renderMovieCard(movie, extraMoviesListElement));
      Object(_utils_render__WEBPACK_IMPORTED_MODULE_9__["render"])(this._moviesContainerComponent, extraMoviesComponent);
    }
  }

  _mainMoviesListInit(moviesData) {
    this._clearMainMovies();
    const moviesForRender = this._sortComponent.sortData(moviesData);
    const iterator = Object(_utils_common__WEBPACK_IMPORTED_MODULE_8__["getNextItemsIterator"])(moviesForRender, ADD_MOVIES_AMOUNT, this._renderedMoviesAmount);
    this._renderMainMovies(iterator);
    this._mainMoviesComponent.setCallback(() => {
      this._renderMainMovies(iterator);
      this._renderedMoviesAmount += ADD_MOVIES_AMOUNT;
    });
  }

  _clearMainMovies() {
    const movieInstanceForClean = this._shownMoviesInstances.filter((item) => item.type === MAIN_MOVIES_NAME);
    movieInstanceForClean.forEach((item) => item.controller.removeElements());
    this._shownMoviesInstances = this._shownMoviesInstances.filter((item) => item.type === EXTRA_MOVIES_NAME);
  }

  _onDataChange(oldData, newData) {
    const instanceOfChangedMovies = this._shownMoviesInstances.filter(({controller}) => controller.id === oldData.id);
    instanceOfChangedMovies.forEach(({controller}) => {
      controller.updateComponents(newData);
    });
  }

  _onViewChange() {
    this._shownMoviesInstances.forEach(({controller}) => controller.setDefaultView());
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mock_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mock/card */ "./src/mock/card.js");
/* harmony import */ var _controllers_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/page */ "./src/controllers/page.js");



const MOVIES_AMOUNT = 23;
const moviesData = Object(_mock_card__WEBPACK_IMPORTED_MODULE_0__["generateCards"])(MOVIES_AMOUNT);
const pageController = new _controllers_page__WEBPACK_IMPORTED_MODULE_1__["PageController"](document.body);

pageController.render(moviesData);


/***/ }),

/***/ "./src/mock/card.js":
/*!**************************!*\
  !*** ./src/mock/card.js ***!
  \**************************/
/*! exports provided: generateCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCards", function() { return generateCards; });
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");



const MAX_DESCRIPTION_SENTENSES = 6;
const MAX_GENRES = 3;
const MIN_ACTORS = 2;
const MAX_ACTORS = 4;
const MAX_WRITERS = 3;
const getRandomBetween = (min, max, demicalPlacesCount = 0) => Number(parseFloat((min + Math.random() * (max - min)) + 0.01).toFixed(demicalPlacesCount));
const getRandomArrayItem = (array) => array[getRandomBetween(0, array.length - 1)];
const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const ageLimits = new Set([0, 6, 12, 16, 18]);

const titles = new Set([
  `The Shawshank Redemption`,
  `The Godfather`,
  `The Dark Knight`,
  `12 Angry Men`,
  `Schindler's List`,
  `The Lord of the Rings: The Return of the King`,
  `Pulp Fiction`,
  `Il buono, il brutto, il cattivo`,
  `Fight Club`,
  `The Lord of the Rings: The Fellowship of the Ring`,
  `Forrest Gump`,
  `Inception`,
  `Star Wars: Episode V - The Empire Strikes Back`,
  `The Lord of the Rings: The Two Towers`,
  `The Matrix`,
]);

const posters = new Set([
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
]);

const directors = new Set([
  `Quentin Tarantino`,
  `Christopher Nolan`,
  `Joel Coen`,
  `Frank Darabont`,
  `Sergio Leone`,
  `Wes Anderson`,
  `Martin Scorsese`,
  `Damien Chazelle`,
  `Drew Goddard`,
  `Ridley Scott`,
  `James Ponsoldt`,
]);

const genres = new Set([
  `comedy`,
  `musicle`,
  `western`,
  `drama`,
  `cartoon`,
  `mystery`,
]);

const comments = new Set([
  {
    id: 1,
    author: `Tim Macoveev`,
    text: `Very good film! Not sorry for the time spent.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(_const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
  },
  {
    id: 2,
    author: `Mike Chakman`,
    text: `Which movie is good? Yes, this is nonsense! The acting is terrible. Blooper on a blooper. Graphics sucks.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(_const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
  },
  {
    id: 3,
    author: `ChinWag`,
    text: `The book was like that))) Cool like))) I can’t remember the name)))`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(_const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
  },
  {
    id: 4,
    author: `derroys`,
    text: `Awesome movie, one of the favorite in our family, great actors. Adore. I recommend.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(_const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
  },
  {
    id: 5,
    author: `Darkmus`,
    text: `Good, funny film, why do sofa critics give such low ratings? :(`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(_const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
  },
  {
    id: 6,
    author: `DarGi`,
    text: `Surprisingly enjoyed watching this movie)`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(_const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
  },
  {
    id: 7,
    author: `Barathrum`,
    text: `A very pleasant psychological-ironic film, it looks in one breath. Cool story, a logical and interesting plot, a wonderful selection of actors. I looked with pleasure.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(_const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
  },
]);

const writers = new Set([
  `Anthony Mann`,
  `Stanley Kubrick`,
  `Martin Scorsese`,
  `Steven Spielberg`,
  `David Lynch`,
  `Quentin Tarantino`,
  `Woody Allen`,
  `Paul Thomas Anderson`,
  `Christopher Nolan`,
  `Ridley Scott`,
  `James Ponsoldt`,
]);

const actors = new Set([
  `Jack Nicholson`,
  `Marlon Brando`,
  `Robert De Niro`,
  `Al Pacino`,
  `Tom Hanks`,
  `Julia Roberts`,
  `Sandra Bullock`,
  `Demi Moore`,
  `Meg Ryan`,
  `Julia Ormond`,
  `Jennifer Aniston`,
  `Denzel Washington`,
]);

const countries = new Set([
  `USA`,
  `Italy`,
  `Russia`,
  `France`,
  `England`,
  `Belgium`,
  `India`,
]);

const generateAgeLimit = () => getRandomArrayItem(Array.from(ageLimits));
const generateTitle = () => getRandomArrayItem(Array.from(titles));
const generatePoster = () => getRandomArrayItem(Array.from(posters));
const generateGenres = () => Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["shuffleArray"])(Array.from(genres)).slice(0, getRandomBetween(1, MAX_GENRES));
const generateComments = () => Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["shuffleArray"])(Array.from(comments)).slice(0, getRandomBetween(0, comments.size));
const generateDirector = () => getRandomArrayItem(Array.from(directors));
const generateWriters = () => Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["shuffleArray"])(Array.from(writers)).slice(0, getRandomBetween(1, MAX_WRITERS));
const generateActors = () => Object(_utils_common__WEBPACK_IMPORTED_MODULE_0__["shuffleArray"])(Array.from(actors)).slice(0, getRandomBetween(MIN_ACTORS, MAX_ACTORS));
const generateCountry = () => getRandomArrayItem(Array.from(countries));
const generateReleaseDate = () => new Date(`${getRandomBetween(1960, 2019)}, ${getRandomBetween(1, 12)}, ${getRandomBetween(1, 28)}`).getTime();
const generateWatchingDate = () => new Date(`2019, ${getRandomBetween(1, 12)}, ${getRandomBetween(1, 28)}`).getTime();

const generateDescription = () => {
  const sentenses = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`. `)
  .map((sentense, i, array) => i !== array.length - 1 ? `${sentense}.` : sentense);

  return sentenses.slice(0, getRandomBetween(1, MAX_DESCRIPTION_SENTENSES)).join(` `).trim();
};

const generateCard = (index) => {
  return {
    id: index,
    localComment: {
      comment: null,
      date: null,
      emotion: _const__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"][getRandomBetween(0, 7)],
    },
    comments: generateComments(),
    movieInfo: {
      ageLimit: generateAgeLimit(),
      name: generateTitle(),
      originalName: generateTitle(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      release: {
        date: generateReleaseDate(),
        country: generateCountry(),
      },
      poster: generatePoster(),
      rating: getRandomBetween(0, 9, 1),
      duration: getRandomBetween(75, 180),
      genres: generateGenres(),
      description: generateDescription(),
    },
    userInfo: {
      personalRating: getRandomBetween(0, 9),
      isOnTheWatchlist: getRandomBoolean(),
      isAlredyWatched: true,
      isFavorite: getRandomBoolean(),
      watchingDate: generateWatchingDate(),
    },
  };
};

const generateCards = (count) => new Array(count).fill(``).map((item, index) => generateCard(index));


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: capitalize, shuffleArray, getNextItemsIterator, formatTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return capitalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleArray", function() { return shuffleArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextItemsIterator", function() { return getNextItemsIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getNextItemsIterator = (items, itemsPartAmount, startItemsAmount) => {
  const itemsAmount = items.length;
  let previousItemsAmount = 0;

  return {
    next() {
      const value = items.slice(previousItemsAmount, startItemsAmount);
      startItemsAmount += itemsPartAmount;
      previousItemsAmount += value.length;
      const done = previousItemsAmount === itemsAmount;
      return {value, done};
    }
  };
};

const formatTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};




/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: createElement, render, replace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _components_abstract_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/abstract-component */ "./src/components/abstract-component.js");



const createElement = (templateString) => {
  const template = document.createElement(`template`);
  template.innerHTML = templateString;
  return template.content.firstElementChild;
};

const render = (instanceContainer, instanceElement, place = _const__WEBPACK_IMPORTED_MODULE_0__["Position"].BEFOREEND) => {
  let container = instanceContainer;
  let element = instanceElement;

  if (instanceContainer instanceof _components_abstract_component__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    container = instanceContainer.getElement();
  }

  if (instanceElement instanceof _components_abstract_component__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    element = instanceElement.getElement();
  }

  switch (place) {
    case _const__WEBPACK_IMPORTED_MODULE_0__["Position"].BEFOREEND:
      container.append(element);
      break;
    case _const__WEBPACK_IMPORTED_MODULE_0__["Position"].AFTERBEGIN:
      container.prepend(element);
      break;
    case _const__WEBPACK_IMPORTED_MODULE_0__["Position"].BEFORE:
      container.before(element);
      break;
    case _const__WEBPACK_IMPORTED_MODULE_0__["Position"].AFTER:
      container.after(element);
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = Boolean(parentElement && newElement && oldElement);

  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map