import Movie from '../models/movie';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
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

  updateMovie(id, newMovieData) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(newMovieData),
      headers: new Headers({'Content-Type': `application/json`}),
    })
    .then((response) => response.json());
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
    });
  }

  createComment(movie, comment) {
    return this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': `application/json`}),
    })
    .then((response) => response.json())
    .then((response) => {
      response.movie = Movie.parseMovie(response.movie);
      return response;
    });
  }

  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorizationCode);

    return fetch(`${this._endPoint}${url}`, {method, body, headers})
      .then(checkStatus);
  }
}
