import { createElement } from '../render.js';

const createHeadingTemplate = (heading) => (
  `<h2 class="films-list__title visually-hidden">${heading}</h2>`
);

export default class HeadingView {
  #element = null;
  #heading = null;

  constructor(heading) {
    this.#heading = heading;
  }

  get template() {
    return createHeadingTemplate(this.#heading);
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
