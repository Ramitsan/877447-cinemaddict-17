import { generateCard } from "../mock/card"; 

export default class CardsModel {
  cards = Array.from({length: 5}, generateCard);

  getCards = () => this.cards;
}
