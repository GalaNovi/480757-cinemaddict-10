import nanoid from 'nanoid';
import Movie from '../models/movie';

const TEMP_COMMENT_AUTHOR = `You`;

const Prefix = {
  MOVIES: `movies:`,
  COMMENTS: `comments:`,
};

const getUpdatedMovies = (store) => {
  const storeMovieIds = Object.keys(store).filter((key) => !key.match(Prefix.COMMENTS));
  const storeMovies = storeMovieIds.map((id) => store[id]);
  const updatedMovies = storeMovies
    .filter((movie) => {
      if (movie.offline) {
        delete movie.offline;
        delete movie.localComment;
        return true;
      }

      return false;
    });

  return updatedMovies;
};

const getStoreComments = (store) => {
  const storeCommentIds = Object.keys(store).filter((key) => key.match(Prefix.COMMENTS));
  const comments = storeCommentIds.map((id) => {
    const movieComments = store[id];
    movieComments.forEach((comment) => {
      comment.movieId = id.replace(Prefix.COMMENTS, ``);
    });

    return movieComments;
  }).flat();

  return comments;
};

const getNewComments = (store) => {
  const storeComments = getStoreComments(store);

  const newComments = storeComments
    .filter((comment) => {
      if (comment.offline) {
        delete comment.id;
        delete comment.author;
        delete comment.offline;
        return true;
      }

      return false;
    });

  return newComments;
};

const getDeletedComments = (store) => {
  return getStoreComments(store).filter((comment) => {
    if (comment.isDeleted) {
      delete comment.isDeleted;
      return true;
    }

    return false;
  });
};

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
          this._store.setItem(`${Prefix.MOVIES}${movie.id}`, movie.toRAW());
        });
    }

    const updatedMovie = Object.assign({}, movie.toRAW());
    const updatedMovieComments = this._store.getItem(`${Prefix.COMMENTS}${movie.id}`)
      .map((comment) => {
        if (comment.id === id) {
          if (comment.offline) {
            return false;
          } else {
            return Object.assign({}, comment, {isDeleted: true});
          }
        }

        return comment;
      })
      .filter((comment) => typeof comment === `object`);

    this._store.setItem(`${Prefix.COMMENTS}${movie.id}`, updatedMovieComments);
    this._store.setItem(`${Prefix.MOVIES}${movie.id}`, updatedMovie);
    this._isSynchronized = false;

    return Promise.resolve();
  }

  createComment(movie, comment) {
    if (this._isOnLine()) {
      return this._api.createComment(movie.id, comment)
        .then(({movie: newMovie, comments}) => {
          this._store.setItem(`${Prefix.MOVIES}${newMovie.id}`, newMovie);
          this._store.setItem(`${Prefix.COMMENTS}${movie.id}`, comments);

          return {newMovie, comments};
        });
    }

    const fakeNewCommentId = nanoid();
    const fakeNewMovie = movie.toRAW();
    fakeNewMovie.comments.push(fakeNewCommentId);
    const fakeNewComment = Object.assign(comment, {
      id: fakeNewCommentId,
      author: TEMP_COMMENT_AUTHOR,
      offline: true,
    });
    const movieComments = this._store.getItem(`${Prefix.COMMENTS}${movie.id}`);
    movieComments.push(fakeNewComment);
    this._store.setItem(`${Prefix.MOVIES}${movie.id}`, Object.assign(fakeNewMovie));
    this._store.setItem(`${Prefix.COMMENTS}${movie.id}`, movieComments);
    this._isSynchronized = false;

    return Promise.resolve({
      newMovie: Movie.parseMovie(fakeNewMovie),
      comments: movieComments,
    });
  }

  sync() {
    if (this._isOnLine()) {
      const store = this._store.getAll();
      const updatedMovies = getUpdatedMovies(store);
      const newComments = getNewComments(store);
      const deletedComments = getDeletedComments(store);

      if (newComments.length) {
        Promise.all(newComments.map((comment) => {
          const movieId = comment.movieId;
          delete comment.movieId;
          this._api.createComment(movieId, comment);
        }));
      }

      if (deletedComments.length) {
        Promise.all(deletedComments.map(({id}) => this._api.deleteComment(id)));
      }

      if (updatedMovies.length) {
        return this._api.sync(updatedMovies)
          .then(({updated}) => {
            const updatedMoviesFromServer = updated;

            updatedMoviesFromServer.forEach((movie) => {
              this._store.setItem(`${Prefix.MOVIES}${movie.id}`, movie);
            });

            this._isSynchronized = true;
            return Promise.resolve();
          });
      }
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
