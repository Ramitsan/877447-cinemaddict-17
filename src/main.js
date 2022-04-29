import FiltersView from './view/filters-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.main');

render(new FiltersView(), siteMainElement);