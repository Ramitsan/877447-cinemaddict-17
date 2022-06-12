import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortingTemplate = (currentSortType) => (
  `<ul class="sort">
      <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortingView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortingTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'A') {
      return;
    }

    this.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');

    const sortType = evt.target.dataset.sortType;
    evt.preventDefault();
    this._callback.sortTypeChange(sortType);
  };
}
