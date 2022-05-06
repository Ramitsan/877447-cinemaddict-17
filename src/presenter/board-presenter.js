import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js'
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupView from '../view/popup-view.js';
import {RenderPosition, render} from '../render.js';

const footerElement = document.querySelector('.footer');
const cardCount = 5;

export default class BoardPresenter {
  filmsSectionComponent = new FilmsSectionView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();
  
  filmsListExtraRated = new FilmsListExtraView('Top rated'); 
  filmsListExtraRatedContainerComponent = new FilmsListContainerView();

  filmsListExtraCommented = new FilmsListExtraView('Most commented');
  filmsListExtraCommentedContainerComponent = new FilmsListContainerView(); 

  init = (boardContainer, cardsModel, commentsModel) => {
    this.boardContainer = boardContainer;
    this.cardsModel = cardsModel;  
    this.boardFilmsCards = [...this.cardsModel.getCards()];
    this.ratedFilmsCards = [...this.cardsModel.getCards()].slice(0,2);
    this.commentedFilmsCards = [...this.cardsModel.getCards()].slice(2,4);

    this.commentsModel = commentsModel;
    this.boardComments = [...this.commentsModel.getComments()];   

    // console.log(this.boardFilmsCards);
    // console.log(this.boardComments);

    render(this.filmsSectionComponent, this.boardContainer);
    render(this.filmsListComponent, this.filmsSectionComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());  

    for (let i = 0; i < this.boardFilmsCards.length; i++) {
      render(new FilmCardView(this.boardFilmsCards[i]), this.filmsListContainerComponent.getElement());
    }
    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());

    render(this.filmsListExtraRated, this.filmsSectionComponent.getElement());
    render(this.filmsListExtraRatedContainerComponent, this.filmsListExtraRated.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.ratedFilmsCards[i]), this.filmsListExtraRatedContainerComponent.getElement());
    }

    render(this.filmsListExtraCommented, this.filmsSectionComponent.getElement());
    render(this.filmsListExtraCommentedContainerComponent, this.filmsListExtraCommented.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.commentedFilmsCards[i]), this.filmsListExtraCommentedContainerComponent.getElement());
    }
    
render(new PopupView(this.boardFilmsCards[0], this.boardComments), footerElement, RenderPosition.AFTEREND);    
  };
}
