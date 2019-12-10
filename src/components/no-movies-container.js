import AbstractComponent from './abstract-component';

const createNoMoviesContainerMarkup = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </div>`
  );
};

export default class NoMoviesContainer extends AbstractComponent {
  getTemplate() {
    return createNoMoviesContainerMarkup();
  }
}
