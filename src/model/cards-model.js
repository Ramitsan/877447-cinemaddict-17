export default class CardsModel {
  cards = [];

  getCards = () => this.cards;
  setCards = (cards) => this.cards = cards;
  addCard = (card) => this.cards.push(card);
}
