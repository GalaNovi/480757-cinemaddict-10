const EXTRA_MOVIES_HEADINGS = [`Top rated`, `Most commented`];
const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];
const DEFAULT_SORT_TYPE = `default`;
const DESCRIPTION_MAX_LENGTH = 140;
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

export {
  EXTRA_MOVIES_HEADINGS,
  EMOTIONS, DEFAULT_SORT_TYPE,
  FILM_DETAILS_TITLES,
  FilterType,
  DESCRIPTION_MAX_LENGTH,
  UserRank,
};
