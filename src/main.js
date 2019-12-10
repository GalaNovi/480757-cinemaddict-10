import {generateCards} from './mock/card';
import {PageController} from './controllers/page-controller';

const MOVIES_AMOUNT = 23;
const moviesData = generateCards(MOVIES_AMOUNT);
const pageController = new PageController(document.body);

pageController.render(moviesData);
