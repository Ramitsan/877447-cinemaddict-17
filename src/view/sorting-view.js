import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortingTemplate = () => (
  `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`
);

export default class SortingView extends AbstractView {
  get template() {
    return createSortingTemplate();
  }

  setSortTypeClickHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }

    const sortType = evt.target.dataset.sortType;
    evt.preventDefault();
    this._callback.sortTypeChange(sortType);
  };
}
