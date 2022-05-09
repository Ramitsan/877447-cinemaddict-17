import { createElement } from '../render.js';

const createFilmsListExtraTemplate = (heading) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
  </section>`
);

export default class FilmsListExtraView {
  constructor(heading) {
    this.heading = heading;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this.heading);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
