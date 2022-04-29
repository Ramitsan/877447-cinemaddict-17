import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../render.js';

const cardCount = 5;

export default class BoardPresenter {
  FilmsSectionComponent = new FilmsSectionView();
  FilmsListComponent = new FilmsListView();
  FilmsListContainerComponent = new FilmsListContainerView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.FilmsSectionComponent, this.boardContainer);
    render(this.FilmsListComponent, this.FilmsSectionComponent.getElement());
    render(new FilmsListTitleView(), this.FilmsListComponent.getElement());
    render(this.FilmsListContainerComponent, this.FilmsListComponent.getElement());

    for (let i = 0; i < cardCount; i++) {
      render(new FilmCardView(), this.FilmsListContainerComponent.getElement());
    }
  };
}
