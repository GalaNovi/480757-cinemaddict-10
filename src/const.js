const EXTRA_MOVIES_HEADINGS = [`Top rated`, `Most commented`];
const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];
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

const UserRank = {
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
};

export {
  EXTRA_MOVIES_HEADINGS,
  EMOTIONS, DEFAULT_SORT_TYPE,
  FILM_DETAILS_TITLES,
  DESCRIPTION_MAX_LENGTH,
  HIDDEN_CLASS,
  UserRank,
  FilterType,
  Timestamp,
  RequestType,
};
