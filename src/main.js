import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import FilmsCountView from './view/films-count-view.js';
import PopupView from './view/popup-view.js';
import {RenderPosition, render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const boardPresenter = new BoardPresenter();

render(new UserProfileView(), headerElement);
render(new FiltersView(), siteMainElement);
render(new SortingView(), siteMainElement);
render(new FilmsCountView(), footerStatisticsElement);
render(new PopupView(), footerElement, RenderPosition.AFTEREND);

boardPresenter.init(siteMainElement);
