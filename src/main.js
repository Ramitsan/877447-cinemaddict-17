import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { generateCard } from './mock/card.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import CardsModel from './model/cards-model.js';
import CommentsModel from './model/comments-model.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const cardsModel = new CardsModel();
const commentsModel = new CommentsModel();
const boardPresenter = new BoardPresenter();

render(new UserProfileView(), headerElement);
render(new FiltersView(), siteMainElement);
render(new SortingView(), siteMainElement);
render(new FooterStatisticsView(), footerElement);

for (let i = 0; i < 5; i++) {
  generateCard(cardsModel, commentsModel);
}

boardPresenter.init(siteMainElement, cardsModel, commentsModel);
