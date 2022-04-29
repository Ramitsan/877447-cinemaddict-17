import FiltersView from './view/filters-view.js';
import FilmCardView from './view/film-card-view.js';
import SortingView from './view/sorting-view';
import {render} from './render.js';

const siteMainElement = document.querySelector('.main');

render(new FiltersView(), siteMainElement);
render(new SortingView(), siteMainElement);
render(new FilmCardView(), siteMainElement);
