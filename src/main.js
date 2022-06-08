import { render} from './framework/render.js';
import UserProfileView from './view/user-profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { generateCard } from './mock/card.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CardsModel from './model/cards-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filters-model.js';
import { TOTAL_CARD_COUNT } from './const.js';
import { UpdateType } from './const.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const cardsModel = new CardsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteMainElement, cardsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, cardsModel);

render(new UserProfileView(), headerElement);
render(new FooterStatisticsView(), footerElement);

filterPresenter.init();
boardPresenter.init();
const cards = [];
for (let i = 0; i < TOTAL_CARD_COUNT; i++) {
  cards.push(generateCard(commentsModel));
}

cardsModel.setCards(UpdateType.MAJOR, cards);
