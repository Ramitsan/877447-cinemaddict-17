import { render, remove } from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
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
import { sortByDate, sortByRating } from '../utils/card-utils';
import { SortType } from '../const.js';

const siteMainElement = document.querySelector('.main');

export default class BoardPresenter {
  #boardContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #ratedFilmsCards = [];
  #commentedFilmsCards = [];
  #renderedCardsCount = CARD_COUNT_PER_STEP;

  #sortComponent = new SortingView();
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

  #cardPresenters = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(boardContainer, cardsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  get cards() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#cardsModel.cards].sort(sortByDate);
      case SortType.RATING:
        return [...this.#cardsModel.cards].sort(sortByRating);
    }
    return this.#cardsModel.cards;
  }

  init = () => {
    this.#ratedFilmsCards = [...this.#cardsModel.cards].slice(0, 2);
    this.#commentedFilmsCards = [...this.#cardsModel.cards].slice(2, 4);

    this.#renderSort();
    this.#renderBoard();
  };

  #renderCard = (card) => {
    const cardPresenter = new CardPresenter(this.#filmsListContainerComponent.element, this.#commentsModel, this.#handleCardChange, this.#handleModeChange);
    cardPresenter.init(card);
    this.#cardPresenters.set(card.id, cardPresenter);
  };

  #renderCards = (cards) => {
    cards.forEach((card) => this.#renderCard(card));
  };

  #renderCardList = () => {
    const cardsCount = this.cards.length;
    const cards = this.cards.slice(0, Math.min(cardsCount, CARD_COUNT_PER_STEP));

    render(this.#headingComponent, this.#filmsListComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    this.#renderCards(cards);

    if (cardsCount > CARD_COUNT_PER_STEP) {
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

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();

    const cardsCount = this.cards.length;
    const newRenderedCardsCount = Math.min(cardsCount, this.#renderedCardsCount + CARD_COUNT_PER_STEP);
    const cards = this.cards.slice(this.#renderedCardsCount, newRenderedCardsCount);

    this.#renderCards(cards);
    this.#renderedCardsCount = newRenderedCardsCount;

    if (this.#renderedCardsCount >= cardsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickHandler);
  };

  #renderBoard = () => {
    //отрисовка карточек в основном блоке
    render(this.#filmsSectionComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);

    if (!this.cards) {
      render(this.#noCardsHeadingComponent, this.#filmsListComponent.element);
    } else {
      this.#renderCardList();
      this.#renderShowMoreButton(this.cards);
      this.#renderTopRatedBlock(this.#ratedFilmsCards);
      this.#renderMostCommentedBlock(this.#commentedFilmsCards);
    }
  };

  #clearCardList = () => {
    this.#cardPresenters.forEach((presenter) => presenter.destroy());
    this.#cardPresenters.clear();
    this.#renderedCardsCount = CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderSort = () => {
    render(this.#sortComponent, siteMainElement);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearCardList();
    this.#renderCardList();
  };

  #handleModeChange = () => {
    this.#cardPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleCardChange = (updatedCard) => {
    this.#cardPresenters.get(updatedCard.id).init(updatedCard);
  };
}
