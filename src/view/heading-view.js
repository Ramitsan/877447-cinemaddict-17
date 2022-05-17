import AbstractView from '../framework/view/abstract-view.js';

const createHeadingTemplate = (heading) => (
  `<h2 class="films-list__title visually-hidden">${heading}</h2>`
);

export default class HeadingView extends AbstractView {
  #heading = null;

  constructor(heading) {
    super();
    this.#heading = heading;
  }

  get template() {
    return createHeadingTemplate(this.#heading);
  }
}
