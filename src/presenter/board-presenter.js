import { render, remove, RenderPosition } from '../framework/render.js';
import SortingView from '../view/sorting-view.js';
import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import HeadingView from '../view/heading-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import noCardsHeadingView from '../view/no-cards-heading-view.js';
import LoadingView from '../view/loading-view.js';
import CardPresenter from './card-presenter.js';
import { CARD_COUNT_PER_STEP, CARD_COUNT_IN_EXTRA } from '../const.js';
import { sortByDate, sortByRating, sortByDefault } from '../utils/card-utils';
import { filter } from '../utils/filter-utils.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';

const siteMainElement = document.querySelector('.main');

export default class BoardPresenter {
  #boardContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #showMoreButtonComponent = null;
  #noCardsHeadingComponent = null;
  #ratedFilmsCards = [];
  #commentedFilmsCards = [];
  #renderedCardsCount = CARD_COUNT_PER_STEP;

  #filmsSectionComponent = new FilmsSectionView();
  #filmsListComponent = new FilmsListView();
  #loadingComponent = new LoadingView();

  #headingComponent = new HeadingView('All movies. Upcoming');
  #filmsListContainerComponent = new FilmsListContainerView();

  #filmsListExtraRated = new FilmsListExtraView('Top rated');
  #filmsListExtraRatedContainerComponent = new FilmsListContainerView();

  #filmsListExtraCommented = new FilmsListExtraView('Most commented');
  #filmsListExtraCommentedContainerComponent = new FilmsListContainerView();

  #cardPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;
  #openedPresenter = undefined;

  constructor(boardContainer, cardsModel, commentsModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#cardsModel = cardsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#cardsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get cards() {
    this.#filterType = this.#filterModel.filter;
    const cards = this.#cardsModel.cards;
    const filteredCards = filter[this.#filterType](cards);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredCards.sort(sortByDate);
      case SortType.RATING:
        return filteredCards.sort(sortByRating);
      case SortType.DEFAULT:
        return filteredCards.sort(sortByDefault);
    }
    return filteredCards;
  }

  init = () => {
    this.#renderBoard();
  };

  #renderCard = (card) => {
    const cardPresenter = new CardPresenter(this.#filmsListContainerComponent.element, this.#commentsModel, this.#handleViewAction, this.#handleModeChange);
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
    for (let i = 0; i < Math.min(arr.length, CARD_COUNT_IN_EXTRA); i++) {
      render(new FilmCardView(arr[i]), this.#filmsListExtraRatedContainerComponent.element);
    }
  };

  #removeTopRatedBlock = () => {
    remove(this.#filmsListExtraRatedContainerComponent);
  };

  #renderMostCommentedBlock = (arr) => {
    render(this.#filmsListExtraCommented, this.#filmsSectionComponent.element);
    render(this.#filmsListExtraCommentedContainerComponent, this.#filmsListExtraCommented.element);
    for (let i = 0; i < Math.min(arr.length, CARD_COUNT_IN_EXTRA); i++) {
      render(new FilmCardView(arr[i]), this.#filmsListExtraCommentedContainerComponent.element);
    }
  };

  #removeMostCommentedBlock = () => {
    remove(this.#filmsListExtraCommentedContainerComponent);
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
    if(this.#showMoreButtonComponent) {
      remove(this.#showMoreButtonComponent);
    }
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreButtonClickHandler);
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  };

  #renderLoading = () => {
    render(this.#filmsSectionComponent, siteMainElement);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);
    render(this.#loadingComponent, this.#filmsListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderNoCards = () => {
    if(this.#filmsListComponent) {
      remove(this.#filmsListComponent);
    }
    this.#noCardsHeadingComponent = new noCardsHeadingView(this.#filterType);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element, RenderPosition.AFTERBEGIN);
    render(this.#noCardsHeadingComponent, this.#filmsListComponent.element);
  };

  #clearBoard = ({resetRenderedCardCount = false, resetSortType = false} = {}) => {
    const cardCount = this.cards.length;

    this.#cardPresenters.forEach((presenter) => presenter.destroy());
    this.#cardPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#showMoreButtonComponent);

    if (this.#noCardsHeadingComponent) {
      remove(this.#noCardsHeadingComponent);
    }

    this.#removeTopRatedBlock();
    this.#removeMostCommentedBlock();

    if (resetRenderedCardCount) {
      this.#renderedCardsCount = CARD_COUNT_PER_STEP;
    } else {
      this.#renderedCardsCount = Math.min(cardCount, this.#renderedCardsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderBoard = () => {
    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const cards = this.cards;
    const cardCount = cards.length;

    this.#renderSort();

    //отрисовка карточек в основном блоке
    render(this.#filmsSectionComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#filmsSectionComponent.element);

    if (cardCount === 0) {
      this.#renderNoCards();
    } else {
    // Теперь, когда #renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу CARD_COUNT_PER_STEP на свойство #renderedCardCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек
      this.#renderCardList(cards.slice(0, Math.min(cardCount, this.#renderedCardsCount)));
    }

    //рендер блоков Top rated и Most commented
    this.#ratedFilmsCards = this.#cardsModel.cards.slice(0, 2);
    this.#commentedFilmsCards = this.#cardsModel.cards.slice(2, 4);

    this.#renderTopRatedBlock(this.#ratedFilmsCards);
    this.#renderMostCommentedBlock(this.#commentedFilmsCards);
  };

  #clearCardList = () => {
    this.#cardPresenters.forEach((presenter) => presenter.destroy());
    this.#cardPresenters.clear();
    this.#renderedCardsCount = CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderSort = () => {
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, siteMainElement);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#openedPresenter = [...this.#cardPresenters.values()].find((presenter) => presenter.isOpened);
    if(!this.#openedPresenter) {
      this.#filterModel.setFilter(UpdateType.MAJOR, this.#filterModel.filter);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this.#cardsModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_CARD:
        this.#cardsModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this.#cardsModel.deleteCard(updateType, update);
        break;
    }
    if(!this.#openedPresenter) {
      this.#filterModel.setFilter(UpdateType.MAJOR, this.#filterModel.filter);
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#cardPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetRenderedCardCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };
}
