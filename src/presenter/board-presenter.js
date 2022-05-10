import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import { RenderPosition, render } from '../render.js';
import CommentView from '../view/comment-view.js';

const footerElement = document.querySelector('.footer');
const bodyElement = document.querySelector('body');

export default class BoardPresenter {
  #boardContainer = null;
  #cardsModel = null;
  #commentsModel = null;
  #boardFilmsCards = [];
  #ratedFilmsCards = [];
  #commentedFilmsCards = [];
  #boardComments = [];

  #filmsSectionComponent = new FilmsSectionView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();

  #filmsListExtraRated = new FilmsListExtraView('Top rated');
  #filmsListExtraRatedContainerComponent = new FilmsListContainerView();

  #filmsListExtraCommented = new FilmsListExtraView('Most commented');
  #filmsListExtraCommentedContainerComponent = new FilmsListContainerView();

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
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    for (let i = 0; i < this.#boardFilmsCards.length; i++) {
      this.#renderCard(this.#boardFilmsCards[i]);
    }
    render(new ShowMoreButtonView(), this.#filmsListComponent.element);

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

    // //отрисовка попапа
    // render(new PopupView(this.#boardFilmsCards[0], this.#boardComments), footerElement, RenderPosition.AFTEREND);
    // const commentsList = document.querySelector('.film-details__comments-list');

    // for (let i = 0; i < this.#boardFilmsCards[0].comments.length; i++) {
    //   render(new CommentView(this.#boardComments[0]), commentsList);
    // }

  };

  #renderCard = (card) => {
    const filmCardComponent = new FilmCardView(card);
    const popupComponent = new PopupView(card);

    const commentsList = popupComponent.element.querySelector('.film-details__comments-list');
 
    for (const comment of this.#boardComments) {
      render(new CommentView(comment), commentsList);
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
