import MoviesModel from './models/movies';
import API from './api.js';
import {PageController} from './controllers/page';

const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const AUTHORIZATION_CODE = `Basic eo0w590ik29889alkj`;

const api = new API(END_POINT, AUTHORIZATION_CODE);
const moviesModel = new MoviesModel();
const pageController = new PageController(document.body, moviesModel, api);

api.getMovies()
  .then((movies) => {
    moviesModel.movies = movies;
    return Promise.all(movies.map((movie) => api.getComments(movie.id)));
  })
  .then((comments) => {
    moviesModel.comments = comments.flat();
    pageController.render();
  });
