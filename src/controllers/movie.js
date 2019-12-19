import BigCard from '../components/big-card';
import Card from '../components/card';
import {render, replace} from '../utils/render';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(movieData) {
    const oldCardComponent = this._cardComponent;
    const oldBigCardComponent = this._bigCardComponent;

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

    const onCloseButtonClick = () => {
      closeBigCard();
    };

    this._cardComponent.setOpenHandler((evt) => {
      evt.preventDefault();
      openBigCard();
    });

    this._bigCardComponent.setCloseButtonHandler(onCloseButtonClick);

    [this._cardComponent, this._bigCardComponent].forEach((component) => {
      component.setWatchlistButtonHandler((evt) => {
        evt.preventDefault();
        this._onDataChange(movieData, Object.assign({}, movieData, {
          movieInfo: Object.assign(movieData.movieInfo, {
            isOnTheWatchlist: !movieData.movieInfo.isOnTheWatchlist
          })
        }));
      });

      component.setWatchedButtonHandler((evt) => {
        evt.preventDefault();
        this._onDataChange(movieData, Object.assign({}, movieData, {
          movieInfo: Object.assign(movieData.movieInfo, {
            isAlredyWatched: !movieData.movieInfo.isAlredyWatched
          })
        }));
      });

      component.setFavoriteButtonHandler((evt) => {
        evt.preventDefault();
        this._onDataChange(movieData, Object.assign({}, movieData, {
          movieInfo: Object.assign(movieData.movieInfo, {
            isFavorite: !movieData.movieInfo.isFavorite
          })
        }));
      });
    });

    if (oldCardComponent && oldBigCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._bigCardComponent, oldBigCardComponent);
    } else {
      render(this._container, this._cardComponent);
    }
  }

  removeElements() {
    this._cardComponent.removeElement();
    this._bigCardComponent.removeElement();
  }

  get id() {
    return this._id;
  }
}
