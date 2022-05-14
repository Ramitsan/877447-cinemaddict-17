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

  init = (boardContainer, cardsModel, commentsModel) => {
    this.#boardContainer = boardContainer;
    this.#cardsModel = cardsModel;
    this.#boardFilmsCards = [...this.#cardsModel.cards];
    this.#ratedFilmsCards = [...this.#cardsModel.cards].slice(0, 2);
    this.#commentedFilmsCards = [...this.#cardsModel.cards].slice(2, 4);

    this.#commentsModel = commentsModel;
    this.#boardComments = [...this.#commentsModel.comments];

    //отрисовка карточек в основном блоке
    render(this.#filmsSectionComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);

    if (this.#boardFilmsCards.length === 0) {
      render(this.#noCardsHeadingComponent, this.#filmsListComponent.element);
    } else {
      render(this.#headingComponent, this.#filmsListComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
      for (let i = 0; i < Math.min(this.#boardFilmsCards.length, CARD_COUNT_PER_STEP); i++) {
        this.#renderCard(this.#boardFilmsCards[i]);
      }

      //показ кнопки "Show More"
      if (this.#boardFilmsCards.length > CARD_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#showMoreButtonClickHandler);
      }

      //отрисовка карточек в блоке "Top rated"
      render(this.#filmsListExtraRated, this.#filmsSectionComponent.element);
      render(this.#filmsListExtraRatedContainerComponent, this.#filmsListExtraRated.element);
      for (let i = 0; i < 2; i++) {
        render(new FilmCardView(this.#ratedFilmsCards[i]), this.#filmsListExtraRatedContainerComponent.element);
      }

      //отрисовка карточек в блоке "Most commented"
      render(this.#filmsListExtraCommented, this.#filmsSectionComponent.element);
      render(this.#filmsListExtraCommentedContainerComponent, this.#filmsListExtraCommented.element);
      for (let i = 0; i < 2; i++) {
        render(new FilmCardView(this.#commentedFilmsCards[i]), this.#filmsListExtraCommentedContainerComponent.element);
      }
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

    const openPopup = () => {
      bodyElement.appendChild(popupComponent.element);
      bodyElement.classList.add('hide-overflow');
    };

    const closePopup = () => {
      bodyElement.removeChild(popupComponent.element);
      bodyElement.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCardComponent.element.querySelector('.film-card__poster').addEventListener('click', () => {
      openPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmCardComponent, this.#filmsListContainerComponent.element);
  };
}
