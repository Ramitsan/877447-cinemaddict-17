import { createElement } from '../render.js';

const createNoCardsHeadingTemplate = (noCardsHeading) => (
  `<h2 class="films-list__title">${noCardsHeading}</h2>`
);

export default class noCardsHeadingView {
  #element = null;
  #noCardsHeading = null;

  constructor(noCardsHeading) {
    this.#noCardsHeading = noCardsHeading;
  }

  get template() {
    return createNoCardsHeadingTemplate(this.#noCardsHeading);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
