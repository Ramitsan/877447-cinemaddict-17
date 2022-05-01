import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import PopupView from './view/popup-view.js';
import {RenderPosition, render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import CardsModel from './model/cards-model.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const cardsModel = new CardsModel();
const boardPresenter = new BoardPresenter();

render(new UserProfileView(), headerElement);
render(new FiltersView(), siteMainElement);
render(new SortingView(), siteMainElement);
render(new FooterStatisticsView(), footerElement);
// render(new PopupView(), footerElement, RenderPosition.AFTEREND);

boardPresenter.init(siteMainElement, cardsModel);
