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
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then((response) => response.json());
  }

  createComment() {

  }

  updateMovie(id, newMovieData) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(newMovieData.toRAW()),
      headers: new Headers({'Content-Type': `application/json`}),
    })
    .then((response) => response.json())
    .then(Movie.parseMovie);
  }

  deleteComment(id) {
    if (id) {
      return this._load({
        url: `comments/${id}`,
        method: Method.DELETE,
      });
    } else {
      return null;
    }
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorizationCode);

    return fetch(`${this._endPoint}${url}`, {method, body, headers})
      .then(checkStatus);
  }
}
