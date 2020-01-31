import MoviesModel from './models/movies';
import API from './api.js';
import {PageController} from './controllers/page';

const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const AUTHORIZATION_CODE = `Basic lijarlbjgpjoidbverfjig`;

const api = new API(END_POINT, AUTHORIZATION_CODE);
const moviesModel = new MoviesModel(api);
const pageController = new PageController(document.body, moviesModel);

moviesModel.getMovies()
  .then((movies) => Promise.all(movies.map((movie) => moviesModel.getComments(movie.id))))
  .then(() => pageController.render());
