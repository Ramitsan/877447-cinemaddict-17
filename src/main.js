import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import FilmsCountView from './view/films-count-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const boardPresenter = new BoardPresenter();

render(new UserProfileView(), headerElement);
render(new FiltersView(), siteMainElement);
render(new SortingView(), siteMainElement);
render(new FilmsCountView(), footerStatisticsElement);

boardPresenter.init(siteMainElement);
