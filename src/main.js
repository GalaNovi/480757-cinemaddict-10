import MoviesModel from './models/movies';
import {generateMovies} from './mock/movie';
import {PageController} from './controllers/page';


const MOVIES_AMOUNT = 23;
const moviesData = generateMovies(MOVIES_AMOUNT);
const moviesModel = new MoviesModel();
moviesModel.movies = moviesData;
const pageController = new PageController(document.body, moviesModel);

pageController.render();
