import Observable from '../framework/observable';
import { UpdateType } from '../const.js';

export default class CardsModel extends Observable {
  #cardsApiService = null;
  #cards = [];

  constructor(cardsApiService) {
    super();
    this.#cardsApiService = cardsApiService;
  }

  get cards() {
    return this.#cards;
  }

  init = async () => {
    try {
      const cards = await this.#cardsApiService.movies;
      this.#cards = cards.map(CardsModel.adaptToClient);
    } catch(err) {
      this.#cards = [];
    }
    this._notify(UpdateType.INIT);
  };

  setCards = (updateType, cards) => {
    this.#cards = cards;
    this._notify(updateType, cards);
  };

  updateCard = (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      update,
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addCard = (updateType, update) => {
    this.#cards = [
      update,
      ...this.#cards,
    ];

    this._notify(updateType, update);
  };

  deleteCard = (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType);
  };

  static adaptToClient = (card) => {
    const adaptedCard = {
      ...card,
      filmInfo: {
        ...card['film_info'],
        alternativeTitle: card['film_info']['alternative_title'],
        ageRating: card['film_info']['age_rating'],
        totalRating: card['film_info']['total_rating'],
        release: {
          date: card['film_info']['release']['date'],
          releaseCountry: card['film_info']['release']['release_country'],
        }
      },
      userDetails: {
        ...card['user_details'],
        isWatchlist: card['user_details']['watchlist'],
        isAlreadyWatched: card['user_details']['already_watched'],
        watchingDate: card['user_details']['watching_date'] !== null ? new Date(card['user_details']['watching_date']) : card['user_details']['watching_date'],
        isFavorite: card['user_details']['favorite'],
      },
    };

    // Ненужные ключи мы удаляем
    delete adaptedCard['film_info'];
    delete adaptedCard.filmInfo['alternative_title'];
    delete adaptedCard.filmInfo['age_rating'];
    delete adaptedCard.filmInfo['total_rating'];
    delete adaptedCard.filmInfo.release['release_country'];
    delete adaptedCard['user_details'];
    delete adaptedCard.userDetails['watchlist'];
    delete adaptedCard.userDetails['already_watched'];
    delete adaptedCard.userDetails['watching_date'];
    delete adaptedCard.userDetails['favorite'];
    return adaptedCard;
  };
}
