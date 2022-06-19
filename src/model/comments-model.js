import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];
  #card = null;

  constructor(commentsApiService, card) {
    super();
    this.#commentsApiService = commentsApiService;
    this.#card = card;
  }

  getComments = async (id) => await this.#commentsApiService.getMovieComments(id);

  addComment = async (updateType, update, cardId) => {
    const {movie, comments} = await this.#commentsApiService.addComment(cardId, update);
    this.#comments = comments;
    this._notify(updateType, comments);
    return {movie, comments};
  };

  deleteComment = async (updateType, commentId, cardId) => {
    await this.#commentsApiService.deleteComment(commentId);
    const comments = await this.getComments(cardId);
    this._notify(updateType, comments);
  };
}
