export default class HackModel {
  #cardsApiService = null;
  #commentsApiService = null;
  #cards = [];

  constructor(cardsApiService, commentsApiService) {
    this.#cardsApiService = cardsApiService;
    this.#commentsApiService = commentsApiService;
  }

  getComments = async (id) => await this.#commentsApiService.getMovieComments(id);

  getCards = async () => {
    try {
      const cards = await this.#cardsApiService.movies;
      return cards;
    } catch(err) {
      return [];
    }
  };

  getData = async () => {
    const cards = await this.getCards();
    const comments = [];
    for (const card of cards) {
      await new Promise(res => {
        setTimeout(() => {
          res();
        }, 500)
      })
      const comment = await this.getComments(card.id);
      comments.push(comment);
    } 
    console.log(cards);
    console.log(comments);
  }
}