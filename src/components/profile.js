import AbstractComponent from './abstract-component';
import {getUserRank} from '../utils/common';

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
  return (
    `<section class="header__profile profile">
      ${moviesAmount ? `<p class="profile__rating">${getUserRank(moviesAmount)}</p>` : ``}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(moviesAmount) {
    super();
    this._moviesAmount = moviesAmount;
  }

  getTemplate() {
    return createProfileMarkup(this._moviesAmount);
  }
}
