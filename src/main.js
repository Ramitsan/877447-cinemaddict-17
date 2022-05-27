import { render} from './framework/render.js';
import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filters-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { generateCard } from './mock/card.js';
import BoardPresenter from './presenter/board-presenter.js';
import CardsModel from './model/cards-model.js';
import CommentsModel from './model/comments-model.js';
import {generateFilter} from './mock/filter.js';
import { TOTAL_CARD_COUNT } from './const.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const cardsModel = new CardsModel();
const commentsModel = new CommentsModel();
const boardPresenter = new BoardPresenter(siteMainElement, cardsModel, commentsModel);

render(new UserProfileView(), headerElement);
render(new FooterStatisticsView(), footerElement);

for (let i = 0; i < TOTAL_CARD_COUNT; i++) {
  generateCard(cardsModel, commentsModel);
}

const filters = generateFilter(cardsModel.cards);
render(new FiltersView(filters), siteMainElement);
boardPresenter.init();
