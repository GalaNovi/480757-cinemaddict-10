import BigCard from '../components/big-card';
import Card from '../components/card';
import {render, replace} from '../utils/render';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(movieData) {
    this._id = movieData.id;
    this._cardComponent = new Card(movieData);
    this._bigCardComponent = new BigCard(movieData);

    const onEsqKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closeBigCard();
      }
    };

    const openBigCard = () => {
      render(document.body, this._bigCardComponent);
      document.addEventListener(`keydown`, onEsqKeyDown);
    };

    const closeBigCard = () => {
      this._bigCardComponent.getElement().remove();
      document.removeEventListener(`keydown`, onEsqKeyDown);
    };

    this._cardComponent.setOpenCallback(openBigCard);

    this._bigCardComponent.setCloseCallback(closeBigCard);

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

  get id() {
    return this._id;
  }
}
