import AbstractComponent from './abstract-component';

const createMoviesContainerMarkup = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
        <button class="films-list__show-more">Show more</button>
      </section>
    </div>`
  );
};

export default class MoviesContainer extends AbstractComponent {
  getTemplate() {
    return createMoviesContainerMarkup();
  }

  getMoviesListElement() {
    return this.getElement().querySelector(`.films-list__container`);
  }

  setLoadButtonHandler(handler) {
    this.getElement().querySelector(`.films-list__show-more`)
      .addEventListener(`click`, handler);
  }

  removeLoadButton() {
    this.getElement().querySelector(`.films-list__show-more`).remove();
  }
}
