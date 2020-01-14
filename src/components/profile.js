import AbstractComponent from './abstract-component';
import {getUserRank} from '../utils/common';

const createProfileMarkup = (moviesAmount) => {
  const userRank = moviesAmount ? getUserRank(moviesAmount) : null;
  return (
    `<section class="header__profile profile">
      ${userRank ? `<p class="profile__rating">${userRank}</p>` : ``}
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
