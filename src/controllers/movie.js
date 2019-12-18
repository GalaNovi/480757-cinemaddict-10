import BigCard from '../components/big-card';
import Card from '../components/card';
import {render} from '../utils/render';

export default class MovieController {
  constructor(container) {
    this._container = container;
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

    const onOpeningElementClick = (evt) => {
      evt.preventDefault();
      openBigCard();
      this._bigCardComponent.setCloseButtonHandler(onCloseButtonClick);
    };

    this._cardComponent.setOpenHandler(onOpeningElementClick);

    render(this._container, this._cardComponent);
  }

  removeElements() {
    this._cardComponent.removeElement();
    this._bigCardComponent.removeElement();
  }
}
