import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import CommentView from '../view/comment-view.js';

const bodyElement = document.querySelector('body');

export default class CardPresenter {
  #commentsModel = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #commentsList = null;
  #filmComments = null;
  #cardListContainer = null;
  #allComments = [];

  constructor(cardListContainer, commentsModel) {
    this.#cardListContainer = cardListContainer;
    this.#commentsModel = commentsModel;
  }

  init = (card) => {
    this.#allComments = [...this.#commentsModel.comments];
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
    this.#filmCardComponent.setClickHandler(this.#openPopup);
    this.#popupComponent.setClickHandler(this.#closePopup);

    render(this.#filmCardComponent, this.#cardListContainer);
  };

  #openPopup = () => {
    bodyElement.appendChild(this.#popupComponent.element);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #closePopup = () => {
    bodyElement.removeChild(this.#popupComponent.element);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
