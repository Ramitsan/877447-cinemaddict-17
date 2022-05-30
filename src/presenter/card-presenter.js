import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import CommentView from '../view/comment-view.js';
import { Mode } from '../const.js';

const bodyElement = document.querySelector('body');

export default class CardPresenter {
  #commentsModel = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #commentsList = null;
  #filmComments = null;
  #cardListContainer = null;
  #changeData = null;
  #changeMode = null;

  #card = null;
  #mode = Mode.DEFAULT;
  #allComments = [];

  constructor(cardListContainer, commentsModel, changeData, changeMode) {
    this.#cardListContainer = cardListContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (card) => {
    this.#allComments = [...this.#commentsModel.comments];
    this.#card = card;

    const prevCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmCardComponent = new FilmCardView(card);
    this.#popupComponent = new PopupView(card);

    this.#commentsList = this.#popupComponent.element.querySelector('.film-details__comments-list');

    this.#filmComments = new Map();
    for (const item of this.#allComments) {
      this.#filmComments.set(item.id, item);
    }

    for (const cardCommentId of card.comments) {
      if(this.#filmComments.has(cardCommentId)) {
        render(new CommentView(this.#filmComments.get(cardCommentId)), this.#commentsList);
      }
    }

    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCardComponent.setClickHandler(this.#openPopup);
    this.#popupComponent.setClickHandler(this.#closePopup);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this.#filmCardComponent, this.#cardListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#cardListContainer.contains(prevCardComponent.element)) {
      replace(this.#filmCardComponent, prevCardComponent);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  };

  #openPopup = () => {
    this.#changeMode();
    bodyElement.appendChild(this.#popupComponent.element);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.OPENED;
  };

  #closePopup = () => {
    bodyElement.removeChild(this.#popupComponent.element);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);

    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#card,  userDetails: {...this.#card.userDetails, isWatchlist: !this.#card.userDetails.isWatchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#card, userDetails: {...this.#card.userDetails, isAlreadyWatched: !this.#card.userDetails.isAlreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#card, userDetails: {...this.#card.userDetails, isFavorite: !this.#card.userDetails.isFavorite}});
  };
}
