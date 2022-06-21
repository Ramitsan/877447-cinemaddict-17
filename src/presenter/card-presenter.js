import { render, replace, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import { Mode } from '../const.js';
import {UserAction, UpdateType, TimeLimit} from '../const.js';

const bodyElement = document.querySelector('body');

export default class CardPresenter {
  #commentsModel = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #cardListContainer = null;
  #changeData = null;
  #changeMode = null;
  #handleModelEvent = null;
  #card = null;
  #mode = Mode.DEFAULT;
  #cardComments = [];
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(cardListContainer, commentsModel, changeData, changeMode) {
    this.#cardListContainer = cardListContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
  }

  get isOpened() {
    return this.#mode === Mode.OPENED;
  }

  #requestCurrentCardComments = async () => await this.#commentsModel.getComments(this.#card.id);

  init = async (card) => {
    this.#card = card;

    const prevCardComponent = this.#filmCardComponent;
    const prevPopupComponent = this.#popupComponent;

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

  #openPopup = async () => {
    bodyElement.appendChild(this.#popupComponent.element);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.OPENED;
    this.#changeMode();
    this.#updatePopupComments();
  };

  #closePopup = () => {
    this.#popupComponent.reset(this.#card);
    bodyElement.removeChild(this.#popupComponent.element);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
    this.#changeMode();
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

  #handleRemoveComment = async (id) => {
    this.#handleCommentAction(UserAction.DELETE_COMMENT, UpdateType.MAJOR, {id});
  };

  #handleAddComment = async (comment) => {
    this.#handleCommentAction(UserAction.ADD_COMMENT, UpdateType.MAJOR, {comment});
  };

  #handleCommentAction = async (actionType, updateType, {id, comment}) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this.#popupComponent.setSending(true);
        await this.#commentsModel.addComment(updateType, comment, this.#card.id);
        break;
      case UserAction.DELETE_COMMENT:
        this.#popupComponent.setDeleting(id);
        await this.#commentsModel.deleteComment(updateType, id, this.#card.id);
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleCommentsModelEvent = (updateType, comments) => {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        this.#popupComponent.updateComments(comments);
        break;
      case UpdateType.MAJOR:
        this.#popupComponent.updateComments(comments);
        break;
    }
  };
}
