import FiltersView from './view/filters-view.js';
import FilmCardView from './view/film-card-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.main');

render(new FiltersView(), siteMainElement);
render(new FilmCardView(), siteMainElement);
