import {createCardTemplate} from './card';

export const createExtraFilmListTemplate = (heading) => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
    <div class="films-list__container"></div>
  </section>`;
};
