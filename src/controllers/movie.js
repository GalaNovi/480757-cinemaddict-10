import BigCard from '../components/big-card';
import Card from '../components/card';
import {render} from '../utils/render';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(movieData) {
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
      this._bigCardComponent.setCloseButtonHandler(onCloseButtonClick);
    });

    this._cardComponent.setWatchlistButtonHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(movieData, Object.assign({}, movieData, {
        movieInfo: Object.assign(movieData.movieInfo, {
          isOnTheWatchlist: !movieData.movieInfo.isOnTheWatchlist
        })
      }));
    });

    render(this._container, this._cardComponent);
  }

  removeElements() {
    this._cardComponent.removeElement();
    this._bigCardComponent.removeElement();
  }
}
