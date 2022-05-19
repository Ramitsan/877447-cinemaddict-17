import AbstractView from '../framework/view/abstract-view.js';

const createNoCardsHeadingTemplate = (noCardsHeading) => (
  `<h2 class="films-list__title">${noCardsHeading}</h2>`
);

export default class noCardsHeadingView extends AbstractView {
  #noCardsHeading = null;

  constructor(noCardsHeading) {
    super();
    this.#noCardsHeading = noCardsHeading;
  }

  get template() {
    return createNoCardsHeadingTemplate(this.#noCardsHeading);
  }
}
