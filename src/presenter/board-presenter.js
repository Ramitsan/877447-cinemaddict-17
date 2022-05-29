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
import { updateItem } from '../utils/common.js';
import { sortByDate, sortByRating } from '../utils/card-utils';
import { SortType } from '../const.js';

const siteMainElement = document.querySelector('.main');

export default class BoardPresenter {
  #boardContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #boardFilmsCards = [];
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
  #sourcedBoardCards = [];

  constructor(boardContainer, cardsModel, commentsModel) {
    this.#boardContainer = boardContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#boardFilmsCards = [...this.#cardsModel.cards];
    this.#sourcedBoardCards = [...this.#cardsModel.cards]; // сохраняем исходный массив для сортировки
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

  #renderCards = (from, to) => {
    this.#boardFilmsCards
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
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

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#renderCards(this.#renderedCardsCount, this.#renderedCardsCount + CARD_COUNT_PER_STEP);
    this.#renderedCardsCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardsCount >= this.#boardFilmsCards.length) {
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

    if (!this.#boardFilmsCards.length) {
      render(this.#noCardsHeadingComponent, this.#filmsListComponent.element);
    } else {
      this.#renderCardList();
      this.#renderShowMoreButton(this.#boardFilmsCards);
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

  #sortCards = (sortType) => {
    // Этот исходный массив задач необходим, потому что для сортировки мы будем мутировать исходный массив в свойстве #boardCards
    switch (sortType) {
      case SortType.DATE:
        this.#boardFilmsCards.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#boardFilmsCards.sort(sortByRating);
        break;
      default:
        // А когда пользователь захочет "вернуть всё, как было", мы просто запишем в #boardCards исходный массив
        this.#boardFilmsCards = [...this.#sourcedBoardCards];
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortCards(sortType);
    this.#clearCardList();
    this.#renderCardList();
  };

  #handleModeChange = () => {
    this.#cardPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleCardChange = (updatedCard) => {
    this.#boardFilmsCards = updateItem(this.#boardFilmsCards, updatedCard);
    this.#sourcedBoardCards = updateItem(this.#sourcedBoardCards, updatedCard);
    this.#cardPresenters.get(updatedCard.id).init(updatedCard);
  };
}
