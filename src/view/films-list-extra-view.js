import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListExtraTemplate = (heading) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${heading}</h2>
  </section>`
);

export default class FilmsListExtraView extends AbstractView {
  #heading = null;

  constructor(heading) {
    super();
    this.#heading = heading;
  }

  get template() {
    return createFilmsListExtraTemplate(this.#heading);
  }
}
