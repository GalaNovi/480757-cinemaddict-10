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
  constructor(endPoint, authorizationCode) {
    this._endPoint = endPoint;
    this._authorizationCode = authorizationCode;
  }

  getMovies() {
    this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
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
