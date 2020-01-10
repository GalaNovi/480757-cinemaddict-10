import BigCard from '../components/big-card';
import Card from '../components/card';
import { render } from '../utils/render';

export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEsqKeyDown = this._onEsqKeyDown.bind(this);
    this._openBigCard = this._openBigCard.bind(this);
    this._closeBigCard = this._closeBigCard.bind(this);
    this._onCtrlEnderDown = this._onCtrlEnderDown.bind(this);
  }

  get id() {
    return this._id;
  }

  render(movieData, comments) {
    this._id = movieData.id;
    this._movieData = movieData;
    this._cardComponent = new Card(this._movieData);
    this._bigCardComponent = new BigCard(this._movieData, comments);

    this._cardComponent.setOpenCallback(this._openBigCard);
    this._bigCardComponent.setCloseCallback(this._closeBigCard);
    this._bigCardComponent.setOnEmojiListClickHandler();

    this._bigCardComponent.setOnDeleteCommentClickCallback((commentId) => {
      this._onDataChange(this._movieData, Object.assign({}, this._movieData, {
        comments: this._movieData.comments.filter((id) => id !== commentId)
      }));
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

  updateComponents(newMovieData, comments) {
    this._cardComponent.update(newMovieData, comments);
    this._bigCardComponent.update(newMovieData, comments);
  }

  updateMovieData(newMovieData) {
    this._movieData = newMovieData;
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

  _onCtrlEnderDown(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === `Enter`) {
      evt.preventDefault();
      const commentFieldElement = this._bigCardComponent.getElement().querySelector(`.film-details__comment-input`);
      const dateValue = new Date().toISOString();
      const emotionImageElement = this._bigCardComponent.getElement().querySelector(`.film-details__add-emoji-label img`);

      if (commentFieldElement && emotionImageElement) {
        this._onDataChange(this._movieData, Object.assign({}, this._movieData, {
          localComment: {
            comment: commentFieldElement.value,
            date: dateValue,
            emotion: emotionImageElement.getAttribute(`data-emoji`),
          }
        }));
      }
    }
  }

  _openBigCard() {
    this._onViewChange();
    render(document.body, this._bigCardComponent);
    document.addEventListener(`keydown`, this._onEsqKeyDown);
    document.addEventListener(`keydown`, this._onCtrlEnderDown);
  }

  _closeBigCard() {
    this._bigCardComponent.resetNewComment();
    this._bigCardComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onEsqKeyDown);
    document.removeEventListener(`keydown`, this._onCtrlEnderDown);
  }
}
