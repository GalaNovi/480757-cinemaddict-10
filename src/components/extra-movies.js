import AbstractComponent from './abstract-component';

const createExtraMoviesMarkup = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class ExtraMovies extends AbstractComponent {
  constructor(heading) {
    super();
    this._heading = heading;
  }

  getTemplate() {
    return createExtraMoviesMarkup(this._heading);
  }
}
