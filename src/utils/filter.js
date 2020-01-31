import {FilterType} from '../const';

const filterParameters = {
  watchlist: ({userInfo}) => userInfo.isOnTheWatchlist,
  history: ({userInfo}) => userInfo.isAlreadyWatched,
  favorites: ({userInfo}) => userInfo.isFavorite,
};

export const filterMovies = (moviesData, filterType) => {
  if (filterType === FilterType.ALL) {
    return moviesData;
  } else {
    return moviesData.filter(filterParameters[filterType]);
  }
};
