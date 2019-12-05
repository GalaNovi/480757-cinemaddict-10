import {createElement} from '../utils';

const createProfileRatingMarkup = (moviesAmount) => {
  let markup = ``;

  if (moviesAmount > 0 && moviesAmount <= 10) {
    markup = `<p class="profile__rating">Novice</p>`;
  } else if (moviesAmount > 10 && moviesAmount <= 20) {
    markup = `<p class="profile__rating">Fan</p>`;
  } else if (moviesAmount > 20) {
    markup = `<p class="profile__rating">Movie Buff</p>`;
  }

  return markup;
};

const createProfileMarkup = (moviesAmount) => {
  const profileRatingMarkup = createProfileRatingMarkup(moviesAmount);

  return (
    `<section class="header__profile profile">
      ${profileRatingMarkup}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(moviesAmount) {
    this._elment = null;
    this._moviesAmount = moviesAmount;
  }

  getTemplate() {
    return createProfileMarkup(this._moviesAmount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
