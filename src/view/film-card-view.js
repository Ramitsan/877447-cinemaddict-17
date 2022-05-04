import { createElement } from '../render.js';
import { humanizeDate } from "../utils";

const createFilmCardTemplate = (card) => {
  const { film_info: { title, total_rating, poster, release: {date}, genre, runtime, description} } = card;
  const commentsCount = card.comments.length;

  const filmReleaseDate = date !== null ? humanizeDate(date) : '';

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${total_rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmReleaseDate}</span>
        <span class="film-card__duration">${runtime}m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${commentsCount} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
    </div>
  </article>`
  );
}

export default class FilmCardView {
  constructor(card, comment) {
    this.card = card;
  }
  getTemplate() {
    return createFilmCardTemplate(this.card);
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
