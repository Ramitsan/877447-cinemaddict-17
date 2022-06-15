import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import { Mode } from '../const.js';
import {UserAction, UpdateType} from '../const.js';
import CardsModel from '../model/cards-model.js';

const bodyElement = document.querySelector('body');

export default class CardPresenter {
  #commentsModel = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #filmComments = null;
  #cardListContainer = null;
  #changeData = null;
  #changeMode = null;
  #newCommentComponent = null;
  #handleModelEvent = null;
  #card = null;
  #mode = Mode.DEFAULT;
  #cardComments = [];

  constructor(cardListContainer, commentsModel, changeData, changeMode) {
    this.#cardListContainer = cardListContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
  }

  #requestCurrentCardComments = async () => await this.#commentsModel.getComments(this.#card.id);

  init = async (card) => {
    this.#card = card;

    const prevCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

    // this.#filmComments = new Map();
    // for (const item of this.comments) {
    //   this.#filmComments.set(item.id, item);
    // }

    this.#filmCardComponent = new FilmCardView(card);
    this.#popupComponent = new PopupView(card);

    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCardComponent.setClickHandler(this.#openPopup);
    this.#popupComponent.setClosePopupClickHandler(this.#closePopup);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setCommentRemoveHandler(this.#handleRemoveComment);
    this.#popupComponent.setCommentAddHandler(this.#handleAddComment);

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
      this.#updatePopupComments();
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
      this.#popupComponent.reset(this.#card);// метод для сброса введенного текста после закрытия окна
      this.#closePopup();
    }
  };

  #openPopup = async () => {
    this.#changeMode();
    bodyElement.appendChild(this.#popupComponent.element);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.OPENED;
    this.#updatePopupComments();
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

  #updatePopupComments = async () => {
    this.#cardComments = await this.#requestCurrentCardComments();
    this.#popupComponent.updateComments(this.#cardComments);
  };

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      {...this.#card,  userDetails: {...this.#card.userDetails, isWatchlist: !this.#card.userDetails.isWatchlist}},
    );
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      {...this.#card, userDetails: {...this.#card.userDetails, isAlreadyWatched: !this.#card.userDetails.isAlreadyWatched}},
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      {...this.#card, userDetails: {...this.#card.userDetails, isFavorite: !this.#card.userDetails.isFavorite}},
    );
  };

  #handleRemoveComment = async (idToDelete) => {
    await this.#commentsModel.deleteComment(UpdateType.MAJOR, idToDelete, this.#card.id);
    const newComments = this.#card.comments.filter((id) => id !== idToDelete);
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      {...this.#card, comments: newComments},
    );
  };

  #handleAddComment = async (newComment) => {
    const {movie} = await this.#commentsModel.addComment(UpdateType.MAJOR, newComment, this.#card.id);
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      CardsModel.adaptToClient(movie),
    );
  };

  #handleCommentsModelEvent = (updateType, {comments}) => {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        this.#popupComponent.updateComments(comments);
        break;
      case UpdateType.MAJOR:
        break;
    }
  };
}
