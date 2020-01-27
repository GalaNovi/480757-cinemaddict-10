import BigCard from '../components/big-card';
import Card from '../components/card';
import MovieModel from '../models/movie';
import {render} from '../utils/render';

export class MovieController {
  constructor(container, onDataChange, onViewChange, onCloseBigCard) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCloseBigCard = onCloseBigCard;

    this._onEsqKeyDown = this._onEsqKeyDown.bind(this);
    this._openBigCard = this._openBigCard.bind(this);
    this._closeBigCard = this._closeBigCard.bind(this);
    this._onCtrlEnterDown = this._onCtrlEnterDown.bind(this);
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

    this._bigCardComponent.setOnUserRatingClickCallback((userRating) => {
      this._onDataChange(this._movieData, Object.assign({}, this._movieData, {
        userInfo: Object.assign({}, this._movieData.userInfo, {
          personalRating: userRating
        })
      }));
    });

    [this._cardComponent, this._bigCardComponent].forEach((component) => {
      component.setWatchlistButtonCallback(() => {
        const newMovieData = MovieModel.clone(this._movieData);
        newMovieData.userInfo.isOnTheWatchlist = !this._movieData.userInfo.isOnTheWatchlist;
        this._onDataChange(this._movieData, newMovieData);
      });

      component.setWatchedButtonCallback(() => {
        const newMovieData = MovieModel.clone(this._movieData);
        newMovieData.userInfo.isAlreadyWatched = !this._movieData.userInfo.isAlreadyWatched;
        newMovieData.userInfo.watchingDate = newMovieData.userInfo.isAlreadyWatched ? new Date().toISOString() : new Date(0).toISOString();
        this._onDataChange(this._movieData, newMovieData);
      });

      component.setFavoriteButtonCallback(() => {
        const newMovieData = MovieModel.clone(this._movieData);
        newMovieData.userInfo.isFavorite = !this._movieData.userInfo.isFavorite;
        this._onDataChange(this._movieData, newMovieData);
      });
    });

    render(this._container, this._cardComponent);
  }

  removeElements() {
    this._cardComponent.removeElement();
    this._bigCardComponent.removeElement();
  }

  update(newMovieData, comments) {
    this._movieData = newMovieData;
    this._cardComponent.update(newMovieData, comments);
    this._bigCardComponent.update(newMovieData, comments);
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

  _onCtrlEnterDown(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === `Enter`) {
      evt.preventDefault();
      const commentFieldElement = this._bigCardComponent.getElement().querySelector(`.film-details__comment-input`);
      const dateValue = new Date().toISOString();
      const emotionImageElement = this._bigCardComponent.getElement().querySelector(`.film-details__add-emoji-label img`);

      if (commentFieldElement.value && emotionImageElement) {
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
    document.addEventListener(`keydown`, this._onCtrlEnterDown);
    this._bigCardComponent.rerender();
  }

  _closeBigCard() {
    this._bigCardComponent.resetNewComment();
    this._bigCardComponent.getElement().remove();
    document.removeEventListener(`keydown`, this._onEsqKeyDown);
    document.removeEventListener(`keydown`, this._onCtrlEnterDown);
    this._onCloseBigCard();
  }
}
