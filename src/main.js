import MoviesModel from './models/movies';
import API from './api.js';
import {PageController} from './controllers/page';

const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const randomString = Math.random().toString(36).substring(2, 10);
const authorizationCode = `Basic ${randomString}`;

const api = new API(END_POINT, authorizationCode);
const moviesModel = new MoviesModel(api);
const pageController = new PageController(document.body, moviesModel);

moviesModel.getMovies()
  .then((movies) => Promise.all(movies.map((movie) => moviesModel.getComments(movie.id))))
  .then(() => pageController.render());
