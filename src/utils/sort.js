import {DEFAULT_SORT_TYPE} from '../const';

const sortParameters = {
  date: (a, b) => new Date(b.movieInfo.release.date).getTime() - new Date(a.movieInfo.release.date).getTime(),
  rating: (a, b) => b.movieInfo.rating - a.movieInfo.rating,
};

export const sortMovies = (moviesData, sortType) => {
  if (sortType === DEFAULT_SORT_TYPE) {
    return moviesData;
  }

  return moviesData.sort(sortParameters[sortType]);
};
