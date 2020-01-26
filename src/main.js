import MoviesModel from './models/movies';
import API from './api.js';
import {generateComments} from './mock/comments';
import {PageController} from './controllers/page';

const URL = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const AUTHORIZATION_CODE = `Basic eo0w590ik29889a`;
const commentsData = generateComments();

const api = new API(URL, AUTHORIZATION_CODE);
const moviesModel = new MoviesModel();

api.getMovies()
  .then((movies) => {
    moviesModel.movies = movies;
    return movies;
  })
  .then((movies) => Promise.all(movies.map((movie) => api.getComments(movie.id))))
  .then((comments) => console.log(comments));
