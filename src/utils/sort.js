import {DEFAULT_SORT_TYPE} from '../const';

const sortParameters = {
  date: (a, b) => b.movieInfo.release.date - a.movieInfo.release.date,
  rating: (a, b) => b.movieInfo.rating - a.movieInfo.rating,
};

export const sortMovies = (moviesData, sortType) => {
  if (sortType === DEFAULT_SORT_TYPE) {
    return moviesData.slice();
  } else {
    return moviesData.slice().sort(sortParameters[sortType]);
  }
};
