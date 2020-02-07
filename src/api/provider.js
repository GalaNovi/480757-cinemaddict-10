import nanoid from 'nanoid';
import Movie from '../models/movie';

const TEMP_COMMENT_AUTHOR = `You`;

const Prefix = {
  MOVIES: `movies:`,
  COMMENTS: `comments:`,
};

const getSyncedMovies = (movies) => movies
  .filter(({success}) => success)
  .map(({payload}) => payload.task);

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
    this._isSynchronized = true;
  }

  getMovies() {
    if (this._isOnLine()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItem(`${Prefix.MOVIES}${movie.id}`, movie.toRAW()));
          return movies;
        });
    }

    const store = this._store.getAll();
    const storeMovieIds = Object.keys(store).filter((key) => !key.match(Prefix.COMMENTS));
    const storeMovies = storeMovieIds.map((id) => store[id]);
    this._isSynchronized = false;

    return Promise.resolve(Movie.parseMovies(storeMovies));
  }

  getComments(movieId) {
    if (this._isOnLine()) {
      return this._api.getComments(movieId)
        .then((comments) => {
          this._store.setItem(`${Prefix.COMMENTS}${movieId}`, comments);
          return comments;
        });
    }

    const movieComments = this._store.getAll()[`${Prefix.COMMENTS}${movieId}`];
    this._isSynchronized = false;

    return Promise.resolve(movieComments);
  }

  updateMovie(id, newMovieData) {
    if (this._isOnLine()) {
      return this._api.updateMovie(id, newMovieData)
        .then((movie) => {
          this._store.setItem(`${Prefix.MOVIES}${id}`, movie);
        });
    }

    const fakeNewMovie = Object.assign({}, newMovieData, {offline: true});
    this._store.setItem(`${Prefix.MOVIES}${id}`, fakeNewMovie);
    this._isSynchronized = false;

    return Promise.resolve(newMovieData);
  }

  deleteComment(movie, id) {
    if (this._isOnLine()) {
      return this._api.deleteComment(id)
        .then(() => {
          this._store.removeItem(`${Prefix.COMMENTS}${id}`);
          this._store.setItem(`${Prefix.MOVIES}${movie.id}`, movie);
        });
    }

    const updatedMovie = Object.assign({}, movie, {offline: true});
    this._store.removeItem(`${Prefix.COMMENTS}${id}`);
    this._store.setItem(`${Prefix.MOVIES}${movie.id}`, updatedMovie);
    this._isSynchronized = false;

    return Promise.resolve();
  }

  createComment(movie, comment) {
    if (this._isOnLine()) {
      return this._api.createComment(movie, comment)
        .then(({movie: newMovie, comments}) => {
          this._store.setItem(`${Prefix.MOVIES}${newMovie.id}`, newMovie);
          this._store.setItem(`${Prefix.COMMENTS}${movie.id}`, comments);

          return {newMovie, comments};
        });
    }

    const fakeNewCommentId = nanoid();
    const fakeNewMovie = movie;
    fakeNewMovie.comments.push(fakeNewCommentId);
    const fakeNewComment = Object.assign(comment, {
      id: fakeNewCommentId,
      author: TEMP_COMMENT_AUTHOR,
    });
    const movieComments = this._store.getItem(`${Prefix.COMMENTS}${movie.id}`);
    movieComments.push(fakeNewComment);
    this._store.setItem(`${Prefix.MOVIES}${movie.id}`, Object.assign(fakeNewMovie, {offline: true}));
    this._store.setItem(`${Prefix.COMMENTS}${movie.id}`, movieComments);
    this._isSynchronized = false;

    return Promise.resolve({
      movie: fakeNewMovie,
      comments: movieComments,
    });
  }

  sync() {
    if (this._isOnLine()) {
      const store = this._store.getAll();
      const storeMovieIds = Object.keys(store).filter((key) => !key.match(Prefix.COMMENTS));
      const storeMovies = storeMovieIds.map((id) => store[id]);

      return this._api.sync(storeMovies)
        .then((response) => {
          storeMovies.filter((movie) => movie.offline).forEach((movie) => {
            this._store.removeItem(movie.id);
          });

          const updatedMovies = getSyncedMovies(response.updated);

          updatedMovies.forEach((movie) => {
            this._store.setItem(movie.id, movie);
          });

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
