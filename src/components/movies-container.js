import AbstractComponent from './abstract-component';

const createMoviesContainerMarkup = () => {
  return (
    `<section class="films">
    </div>`
  );
};

export default class MoviesContainer extends AbstractComponent {
  getTemplate() {
    return createMoviesContainerMarkup();
  }
}
