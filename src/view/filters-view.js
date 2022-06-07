import AbstractView from '../framework/view/abstract-view.js';
import { FilterType, FilterName } from '../const.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;
  const filmsCount = name === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`;
  const isFilterActive = currentFilterType ? 'main-navigation__item--active' : '';

  return (
    `<a href="#${name}" class="main-navigation__item ${isFilterActive}">${FilterName[name]} ${filmsCount}</a>`
  );
};

const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return (
    `<nav class="main-navigation"> 
      ${filterItemsTemplate}
    </nav>`
  );
};

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.setFilterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
