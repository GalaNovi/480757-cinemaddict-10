import BigCard from '../components/big-card';
import Card from '../components/card';
import {render} from '../utils/render';

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEsqKeyDown = this._onEsqKeyDown.bind(this);
    this._openBigCard = this._openBigCard.bind(this);
    this._closeBigCard = this._closeBigCard.bind(this);
  }

  get id() {
    return this._id;
  }

  render(movieData) {
    this._id = movieData.id;
    this._cardComponent = new Card(movieData);
    this._bigCardComponent = new BigCard(movieData);

    this._cardComponent.setOpenCallback(this._openBigCard);

    this._bigCardComponent.setCloseCallback(this._closeBigCard);

    this._bigCardComponent.setOnEmojiListClickHandler((evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._onDataChange(movieData, Object.assign({}, movieData, {
          localComment: Object.assign(movieData.localComment, {
            emotion: evt.target.getAttribute(`data-emoji`),
          })
        }));
      }
    });

    [this._cardComponent, this._bigCardComponent].forEach((component) => {
      component.setWatchlistButtonCallback(() => {
        this._onDataChange(movieData, Object.assign({}, movieData, {
          userInfo: Object.assign(movieData.userInfo, {
            isOnTheWatchlist: !movieData.userInfo.isOnTheWatchlist
          })
        }));
      });

      component.setWatchedButtonCallback(() => {
        this._onDataChange(movieData, Object.assign({}, movieData, {
          userInfo: Object.assign(movieData.userInfo, {
            personalRating: 0,
            isAlredyWatched: !movieData.userInfo.isAlredyWatched
          })
        }));
      });

      component.setFavoriteButtonCallback(() => {
        this._onDataChange(movieData, Object.assign({}, movieData, {
          userInfo: Object.assign(movieData.userInfo, {
            isFavorite: !movieData.userInfo.isFavorite
          })
        }));
      });
    });

    render(this._container, this._cardComponent);
  }

  removeElements() {
    this._cardComponent.removeElement();
    this._bigCardComponent.removeElement();
  }

  updateComponents(newData) {
    this._cardComponent.update(newData);
    this._bigCardComponent.update(newData);
  }

  setDefaultView() {
    this._closeBigCard();
  }

  _onEsqKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeBigCard();
    }
  }

  _openBigCard() {
    this._onViewChange();
    render(document.body, this._bigCardComponent);
    document.addEventListener(`keydown`, this._onEsqKeyDown);
  }

  _closeBigCard() {
    this._bigCardComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onEsqKeyDown);
  }
}
