const EXTRA_MOVIES_HEADINGS = [`Top rated`, `Most commented`];
const DEFAULT_SORT_TYPE = `default`;
const DESCRIPTION_MAX_LENGTH = 140;
const HIDDEN_CLASS = `visually-hidden`;
const FILM_DETAILS_TITLES = [
  `Director`,
  `Writers`,
  `Actors`,
  `Release Date`,
  `Runtime`,
  `Country`,
  `Genre`,
];

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const userRank = {
  20: `Movie Buff`,
  10: `Fun`,
  0: `Novice`,
};

const Timestamp = {
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
};

const RequestType = {
  CREATING_COMMENT: `create comment`,
  DELETING_COMMENT: `deleting comment`,
  SETTING_RATING: `setting rating`,
  WATCHLIST: `watchlist`,
  WATCHED: `watched`,
  FAVORITE: `favirite`,
};

const MoviesAmount = {
  START: 5,
  ADD: 5,
  EXTRA: 2,
};

const MoviesType = {
  MAIN: `main`,
  EXTRA: `extra`,
};

const SRC_IMAGES = [
  `/images/emoji/angry.png`,
  `/images/emoji/puke.png`,
  `/images/emoji/sleeping.png`,
  `/images/emoji/smile.png`,
  `/images/emoji/trophy.png`,
  `/images/icons/icon-favorite.svg`,
  `/images/icons/icon-favorite-active.svg`,
  `/images/icons/icon-watched.svg`,
  `/images/icons/icon-watched-active.svg`,
  `/images/icons/icon-watchlist.svg`,
  `/images/icons/icon-watchlist-active.svg`,
  `/images/posters/made-for-each-other.png`,
  `/images/posters/popeye-meets-sinbad.png`,
  `/images/posters/sagebrush-trail.jpg`,
  `/images/posters/santa-claus-conquers-the-martians.jpg`,
  `/images/posters/the-dance-of-life.jpg`,
  `/images/posters/the-great-flamarion.jpg`,
  `/images/posters/the-man-with-the-golden-arm.jpg`,
];

export {
  EXTRA_MOVIES_HEADINGS,
  DEFAULT_SORT_TYPE,
  FILM_DETAILS_TITLES,
  DESCRIPTION_MAX_LENGTH,
  HIDDEN_CLASS,
  userRank,
  FilterType,
  Timestamp,
  RequestType,
  MoviesAmount,
  MoviesType,
  SRC_IMAGES,
};
