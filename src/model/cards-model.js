export default class CardsModel {
  #cards = [];

  get cards() {
    return this.#cards;
  }

  set cards (cards) {
    this.#cards = cards;
  }

  addCard = (card) => this.#cards.push(card);
}
