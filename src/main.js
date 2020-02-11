import MoviesModel from './models/movies';
import Api from './api/index';
import Store from './api/store';
import Provider from './api/provider';
import {PageController} from './controllers/page';
import {removeMainPreloader} from './utils/common';

const StoreHeading = {
  PREFIX: `cinemaddict-localstorage`,
  VERSION: `v1`,
};

const storeName = `${StoreHeading.PREFIX}-${StoreHeading.VERSION}`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict/`;
const AUTHORIZATION_CODE = `Basic kjasrhgfkuGiYUUfIYtfjytf`;

const api = new Api(END_POINT, AUTHORIZATION_CODE);
const store = new Store(storeName, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MoviesModel(apiWithProvider);
const pageController = new PageController(document.body, moviesModel);

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .catch(() => {
      throw Error(`ServiceWorker NOT REGISTERED`);
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync();
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});

moviesModel.getMovies()
  .then((movies) => Promise.all(movies.map((movie) => moviesModel.getComments(movie.id))))
  .then(() => {
    pageController.render();
    removeMainPreloader();
  });
