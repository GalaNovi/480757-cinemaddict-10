import {FilterType} from '../const';

const filterParametens = {
  watchlist: ({userInfo}) => userInfo.isOnTheWatchlist,
  history: ({userInfo}) => userInfo.isAlredyWatched,
  favorites: ({userInfo}) => userInfo.isFavorite,
};

export const filterMovies = (moviesData, filterType) => {
  if (filterType === FilterType.ALL) {
    return moviesData;
  } else {
    return moviesData.filter(filterParametens[filterType]);
  }
};
