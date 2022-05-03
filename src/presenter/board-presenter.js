import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import {RenderPosition, render} from '../render.js';

const footerElement = document.querySelector('.footer');
const cardCount = 5;

export default class BoardPresenter {
  FilmsSectionComponent = new FilmsSectionView();
  FilmsListComponent = new FilmsListView();
  FilmsListContainerComponent = new FilmsListContainerView();

  init = (boardContainer, cardsModel) => {
    this.boardContainer = boardContainer;
    this.cardsModel = cardsModel;
    this.boardCards = [...this.cardsModel.getCards()];

    console.log(this.boardCards);

    render(this.FilmsSectionComponent, this.boardContainer);
    render(this.FilmsListComponent, this.FilmsSectionComponent.getElement());
    render(new FilmsListTitleView(), this.FilmsListComponent.getElement());
    render(this.FilmsListContainerComponent, this.FilmsListComponent.getElement());
    render(new PopupView(this.boardCards[0]), footerElement, RenderPosition.AFTEREND);

    for (let i = 0; i < this.boardCards.length; i++) {
      render(new FilmCardView(this.boardCards[i]), this.FilmsListContainerComponent.getElement());
    }
    render(new ShowMoreButtonView(), this.FilmsListComponent.getElement());
  };
}
