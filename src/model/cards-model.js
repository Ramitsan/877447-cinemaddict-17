import Observable from '../framework/observable';

export default class CardsModel extends Observable {
  #cards = [];

  get cards() {
    return this.#cards;
  }

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
}
