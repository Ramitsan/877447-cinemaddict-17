import { render, remove } from '../framework/render.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import HeadingView from '../view/heading-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import noCardsHeadingView from '../view/no-cards-heading-view.js';
import CardPresenter from './card-presenter.js';
import { CARD_COUNT_PER_STEP, CARD_COUNT_IN_EXTRA } from '../const.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #boardFilmsCards = [];
  #ratedFilmsCards = [];
  #commentedFilmsCards = [];
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

  #cardPresenter = new Map();

  constructor(boardContainer, cardsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardFilmsCards = [...this.#cardsModel.cards];
    this.#ratedFilmsCards = [...this.#cardsModel.cards].slice(0, 2);
    this.#commentedFilmsCards = [...this.#cardsModel.cards].slice(2, 4);

    this.#renderBoard();
  };

  #renderCard = (card) => {
    const cardPresenter = new CardPresenter(this.#filmsListContainerComponent.element, this.#commentsModel, this.#handleCardChange, this.#handleModeChange);
    cardPresenter.init(card);
    this.#cardPresenter.set(card.id, cardPresenter);
  };

  #renderCards = (from, to) => {
    this.#boardFilmsCards
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
  };

  #clearCardList = () => {
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    this.#renderedCardsCount = CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderCardList = () => {
    render(this.#headingComponent, this.#filmsListComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderCards(0, Math.min(this.#boardFilmsCards.length, CARD_COUNT_PER_STEP));

    if (this.#boardFilmsCards.length > CARD_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
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

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickHandler);
  };

  #handleModeChange = () => {
    this.#cardPresenter.forEach((presenter) => presenter.resetView());
  };

  // обработчик изменений в карточке фильма
  #handleCardChange = (updatedCard) => {
    this.#boardFilmsCards = updateItem(this.#boardFilmsCards, updatedCard);
    this.#cardPresenter.get(updatedCard.id).init(updatedCard);
  };

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#renderCards(this.#renderedCardsCount, this.#renderedCardsCount + CARD_COUNT_PER_STEP);
    this.#renderedCardsCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardsCount >= this.#boardFilmsCards.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderBoard = () => {
    //отрисовка карточек в основном блоке
    render(this.#filmsSectionComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);

    if (!this.#boardFilmsCards.length) {
      render(this.#noCardsHeadingComponent, this.#filmsListComponent.element);
    } else {
      this.#renderCardList();
      this.#renderShowMoreButton(this.#boardFilmsCards);
      this.#renderTopRatedBlock(this.#ratedFilmsCards);
      this.#renderMostCommentedBlock(this.#commentedFilmsCards);
    }
  };
}
