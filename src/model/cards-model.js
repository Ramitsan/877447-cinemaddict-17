import Observable from '../framework/observable';

export default class CardsModel extends Observable {
  #cards = [];

  get cards() {
    return this.#cards;
  }

  set cards (cards) {
    this.#cards = cards;
  }

  addCard = (card) => this.#cards.push(card);
}
