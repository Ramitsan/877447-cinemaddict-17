import UserProfileView from './view/user-profile-view.js';
import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const boardPresenter = new BoardPresenter();

render(new UserProfileView(), headerElement);
render(new FiltersView(), siteMainElement);
render(new SortingView(), siteMainElement);

boardPresenter.init(siteMainElement);
