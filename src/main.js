import MoviesModel from './models/movies';
import {generateMovies} from './mock/movie';
import {generateComments} from './mock/comments';
import {PageController} from './controllers/page';

const MOVIES_AMOUNT = 123;
const moviesData = generateMovies(MOVIES_AMOUNT);
const commentsData = generateComments();
const moviesModel = new MoviesModel();
moviesModel.movies = moviesData;
moviesModel.comments = commentsData;
const pageController = new PageController(document.body, moviesModel);

pageController.render();
