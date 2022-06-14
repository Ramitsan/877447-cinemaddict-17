import Observable from '../framework/observable';
import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async () => {
    try {
      await this.#commentsApiService.comments;
    } catch(err) {
      this.#comments = [];
    }
    this._notify(UpdateType.INIT);
  };


  setComments = (updateType, comments) => {
    this.#comments = comments;
    this._notify(updateType, comments);
  };

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, idToDelete) => {
    const index = this.#comments.findIndex((comment) => comment.id === idToDelete);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
