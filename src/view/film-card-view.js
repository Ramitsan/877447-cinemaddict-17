import AbstractView from '../framework/view/abstract-view.js';
import { getCropDescription, humanizeDateReleaseForCard } from '../utils/card-utils.js';
import { getFilmDuration } from '../utils/common.js';

const createFilmCardTemplate = (card) => {
  const { filmInfo, userDetails} = card;
  const { title, totalRating, poster, release, genre, runtime, description} = filmInfo;
  const { date } = release;
  const {isWatchlist, isAlreadyWatched, isFavorite} = userDetails;

  const cropDescription = getCropDescription(description);

  const commentsCount = card.comments.length;

  const filmReleaseDate = date !== null ? humanizeDateReleaseForCard(date) : '';
  const filmRuntime = getFilmDuration(runtime);

  const setActiveControl = (param) => param ? 'film-card__controls-item--active' : '';

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmReleaseDate}</span>
        <span class="film-card__duration">${filmRuntime}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${cropDescription}</p>
      <span class="film-card__comments">${commentsCount} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${setActiveControl(isWatchlist)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${setActiveControl(isAlreadyWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${setActiveControl(isFavorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createFilmCardTemplate(this.#card);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#clickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.addWatchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addWatchlistClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #addWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addWatchlistClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
