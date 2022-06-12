import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoCardsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNoCardsHeadingTemplate = (filterType) => {
  const noCardTextValue = NoCardsTextType[filterType];

  return (
    `<h2 class="films-list__title">${noCardTextValue}</h2>`
  );
};

export default class noCardsHeadingView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoCardsHeadingTemplate(this.#filterType);
  }
}
