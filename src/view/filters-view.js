import AbstractView from '../framework/view/abstract-view.js';
import { FilterType, FilterName } from '../const.js';

const createFilterItemTemplate = (filter, isActive) => {
  const { name, count } = filter;
  const filmsCount = name === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`;
  const isFilterActive = isActive ? 'main-navigation__item--active' : '';

  return (
    `<a href="#${name}" class="main-navigation__item ${isFilterActive}">${FilterName[name]} ${filmsCount}</a>`
  );
};

const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return (
    `<nav class="main-navigation"> 
      ${filterItemsTemplate}
    </nav>`
  );
};

export default class FiltersView extends AbstractView {
  #filters = null;
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
