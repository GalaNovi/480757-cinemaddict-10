import MoviesModel from './models/movies';
import CommentsModel from './models/comments';
import {generateMovies} from './mock/movie';
import {generateComments} from './mock/comments';
import {PageController} from './controllers/page';

const MOVIES_AMOUNT = 23;
const moviesData = generateMovies(MOVIES_AMOUNT);
const commentsData = generateComments();
const commentsModel = new CommentsModel();
commentsModel.comments = commentsData;
const moviesModel = new MoviesModel(commentsModel);
moviesModel.movies = moviesData;
const pageController = new PageController(document.body, moviesModel, commentsModel);

pageController.render();
