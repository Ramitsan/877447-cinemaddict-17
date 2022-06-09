import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #comments = [];

  get comments() {
    return this.#comments;
  }

  setComments = (updateType, comments) => {
    this.#comments = comments;
    this._notify(updateType, comments);
  };

  addComment = (comment) => {
    this.comments.push(comment);
  };
}
