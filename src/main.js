import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.main');
const boardPresenter = new BoardPresenter();

render(new FiltersView(), siteMainElement);
render(new SortingView(), siteMainElement);

boardPresenter.init(siteMainElement);
