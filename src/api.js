import Movie from './models/movie';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(url, authorizationCode) {
    this._url = url;
    this._authorizationCode = authorizationCode;
  }

  getMovies() {
    return this._load({url: `${this._url}movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(movieId) {
    return this._load({url: `${this._url}comments/${movieId}`})
      .then((response) => response.json());
  }

  createComment() {

  }

  updateComment() {

  }

  deleteComment() {

  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorizationCode);

    return fetch(url, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
}
