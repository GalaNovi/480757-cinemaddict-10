import MoviesModel from './models/movies';
import API from './api.js';
import {PageController} from './controllers/page';

const randomString = Math.random().toString(36).substring(2, 10);
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const authorization_code = `Basic ${randomString}`;

const api = new API(END_POINT, authorization_code);
const moviesModel = new MoviesModel(api);
const pageController = new PageController(document.body, moviesModel);

moviesModel.getMovies()
  .then((movies) => Promise.all(movies.map((movie) => moviesModel.getComments(movie.id))))
  .then(() => pageController.render());
