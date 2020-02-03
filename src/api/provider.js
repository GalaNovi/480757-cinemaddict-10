import nanoid from 'nanoid';
import Movie from '../models/movie';

const COMMENTS_PREFIX = `comments:`;

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
          movies.forEach((movie) => this._store.setItem(movie.id, movie.toRAW()));
          return movies;
        }
      );
    }

    const store = this._store.getAll();
    const storeMovieIds = Object.keys(store).filter((key) => !key.match(COMMENTS_PREFIX));
    const storeMovies = storeMovieIds.map((id) => store[id]);
    this._isSynchronized = false;

    return Promise.resolve(Movie.parseMovies(storeMovies));
  }

  getComments(movieId) {
    if (this._isOnLine()) {
      return this._api.getComments(movieId)
        .then((comments) => {
          this._store.setItem(`${COMMENTS_PREFIX}${movieId}`, comments);
          return comments;
        }
      );
    }

    const movieComments = this._store.getAll()[`${COMMENTS_PREFIX}${movieId}`];
    this._isSynchronized = false;

    return Promise.resolve(movieComments);
  }

  updateMovie(id, newMovieData) {
    if (this._isOnLine()) {
      return this._api.updateMovie(id, newMovieData)
        .then((movie) => {
          this._store.setItem(id, movie);
        });
    }

    const fakeNewMovie = Object.assign({}, newMovieData, {offline: true});
    this._store.setItem(id, fakeNewMovie);
    this._isSynchronized = false;

    return Promise.resolve(newMovieData);
  }

  deleteComment(movie, id) {
    if (this._isOnLine()) {
      return this._api.deleteComment(id)
        .then(() => {
          this._store.removeItem(`${COMMENTS_PREFIX}${id}`);
          this._store.setItem(movie.id, movie);
        });
    }

    this._store.removeItem(`${COMMENTS_PREFIX}${id}`);
    this._store.setItem(movie.id, Object.assign({}, movie, {offline: true}));
    this._isSynchronized = false;

    return Promise.resolve();
  }

  createComment(movie, comment) {
    if (this._isOnLine()) {
      return this._api.createComment(movie, comment)
        .then(({movie, comments}) => {
          this._store.setItem(movie.id, movie);
          this._store.setItem(`${COMMENTS_PREFIX}${movie.id}`, comments);

          return {movie, comments};
        });
    }

    const fakeNewCommentId = nanoid();
    const fakeNewMovie = Movie.parseMovie(movie).comments.push(fakeNewCommentId);
    const fakeNewComment = Object.assign({}, comment, {id: fakeNewCommentId});
    const commentsWithFake = this._store.getItem(`${COMMENTS_PREFIX}${movie.id}`).push(fakeNewComment);
    this._store.setItem(movie.id, Object.assign({}, fakeNewMovie, {offline: true}));
    this._store.setItem(`${COMMENTS_PREFIX}${movie.id}`, commentsWithFake);
    this._isSynchronized = false;

    return Promise.resolve({
      movie: fakeNewMovie,
      comments: commentsWithFake,
    });
  }

  sync() {
    if (this._isOnLine()) {
      const store = this._store.getAll();
      const storeMovieIds = Object.keys(store).filter((key) => !key.match(COMMENTS_PREFIX));
      const storeMovies = storeMovieIds.map((id) => store[id]);
      console.log(storeMovies);

      return this._api.sync(storeMovies)
        .then((response) => {
          console.log(response);
          storeMovies.filter((movie) => movie.offline).forEach((movie) => {
            this._store.removeItem(movie.id);
          });

          const createdMovies = getSyncedMovies(response.created);
          const updatedMovies = getSyncedMovies(response.updated);

          [...createdMovies, ...updatedMovies].forEach((movie) => {
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
