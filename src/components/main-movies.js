import AbstractComponent from './abstract-component';

const createMainMoviesMarkup = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
      <button class="films-list__show-more">Show more</button>
    </section>`
  );
};

export default class MainMovies extends AbstractComponent {
  getTemplate() {
    return createMainMoviesMarkup();
  }

  setLoadButtonCallback(callback) {
    this.getElement().querySelector(`.films-list__show-more`)
      .addEventListener(`click`, callback);
  }

  toggleShowLoadButton(areAllMoviesShown) {
    const loadMoreButton = this.getElement().querySelector(`.films-list__show-more`);
    if (areAllMoviesShown) {
      loadMoreButton.style.display = `none`;
    } else {
      loadMoreButton.style.display = ``;
    }
  }

  getMoviesList() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
