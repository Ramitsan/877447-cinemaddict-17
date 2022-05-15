import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import HeadingView from '../view/heading-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import { render } from '../render.js';
import CommentView from '../view/comment-view.js';
import noCardsHeadingView from '../view/no-cards-heading-view.js';

const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_IN_EXTRA = 2;
const bodyElement = document.querySelector('body');

export default class BoardPresenter {
  #boardContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #boardFilmsCards = [];
  #ratedFilmsCards = [];
  #commentedFilmsCards = [];
  #boardComments = [];
  #renderedCardsCount = CARD_COUNT_PER_STEP;

  #filmsSectionComponent = new FilmsSectionView();
  #filmsListComponent = new FilmsListView();
  #headingComponent = new HeadingView('All movies. Upcoming');
  #filmsListContainerComponent = new FilmsListContainerView();

  #filmsListExtraRated = new FilmsListExtraView('Top rated');
  #filmsListExtraRatedContainerComponent = new FilmsListContainerView();

  #filmsListExtraCommented = new FilmsListExtraView('Most commented');
  #filmsListExtraCommentedContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #noCardsHeadingComponent = new noCardsHeadingView('There are no movies in our database');

  constructor(boardContainer, cardsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardFilmsCards = [...this.#cardsModel.cards];
    this.#ratedFilmsCards = [...this.#cardsModel.cards].slice(0, 2);
    this.#commentedFilmsCards = [...this.#cardsModel.cards].slice(2, 4);
    this.#boardComments = [...this.#commentsModel.comments];

    //отрисовка карточек в основном блоке
    render(this.#filmsSectionComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);

    if (!this.#boardFilmsCards.length) {
      render(this.#noCardsHeadingComponent, this.#filmsListComponent.element);
    } else {
      render(this.#headingComponent, this.#filmsListComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
      for (let i = 0; i < Math.min(this.#boardFilmsCards.length, CARD_COUNT_PER_STEP); i++) {
        this.#renderCard(this.#boardFilmsCards[i]);
      }
      this.#renderShowMoreButton(this.#boardFilmsCards);
      this.#renderTopRatedBlock(this.#ratedFilmsCards);
      this.#renderMostCommentedBlock(this.#commentedFilmsCards);
    }
  };

  #renderTopRatedBlock = (arr) => {
    render(this.#filmsListExtraRated, this.#filmsSectionComponent.element);
    render(this.#filmsListExtraRatedContainerComponent, this.#filmsListExtraRated.element);
    for (let i = 0; i < CARD_COUNT_IN_EXTRA; i++) {
      render(new FilmCardView(arr[i]), this.#filmsListExtraRatedContainerComponent.element);
    }
  };

  #renderMostCommentedBlock = (arr) => {
    render(this.#filmsListExtraCommented, this.#filmsSectionComponent.element);
    render(this.#filmsListExtraCommentedContainerComponent, this.#filmsListExtraCommented.element);
    for (let i = 0; i < CARD_COUNT_IN_EXTRA; i++) {
      render(new FilmCardView(arr[i]), this.#filmsListExtraCommentedContainerComponent.element);
    }
  };

  #renderShowMoreButton = (arr) => {
    if (arr.length > CARD_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

      this.#showMoreButtonComponent.element.addEventListener('click', this.#showMoreButtonClickHandler);
    }
  };

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#boardFilmsCards.slice(this.#renderedCardsCount, this.#renderedCardsCount + CARD_COUNT_PER_STEP).forEach((card) => this.#renderCard(card));
    this.#renderedCardsCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardsCount >= this.#boardFilmsCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #openPopup = (element, cssClassName) => {
    bodyElement.appendChild(element);
    bodyElement.classList.add(cssClassName);
  };

  #closePopup = (element, cssClassName) => {
    bodyElement.removeChild(element);
    bodyElement.classList.remove(cssClassName);
  };

  #renderCard = (card) => {
    const filmCardComponent = new FilmCardView(card);
    const popupComponent = new PopupView(card);

    const commentsList = popupComponent.element.querySelector('.film-details__comments-list');

    const filmComments = new Map();
    for (const item of this.#boardComments) {
      filmComments.set(item.id, item);
    }

    for (const key of filmComments.keys()) {
      for (const cardCommentId of card.comments) {
        if (key === cardCommentId) {
          render(new CommentView(filmComments.get(key)), commentsList);
        }
      }
    }

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#closePopup(popupComponent.element,'hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCardComponent.element.querySelector('.film-card__poster').addEventListener('click', () => {
      this.#openPopup(popupComponent.element, 'hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      this.#closePopup(popupComponent.element, 'hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmCardComponent, this.#filmsListContainerComponent.element);
  };
}
