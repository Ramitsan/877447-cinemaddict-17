import { createElement } from '../render.js';

const createFilmsListExtraTemplate = (heading) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
  </section>`
);

export default class FilmsListExtraView {
  #element = null;
  #heading = null;

  constructor(heading) {
    this.#heading = heading;
  }

  get template() {
    return createFilmsListExtraTemplate(this.#heading);
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
