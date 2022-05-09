export default class CommentsModel {
  #comments = [];

  set comments(arr) {
    this.#comments = arr;
  }

  get comments() {
    return this.#comments;
  }

  addComment = (comment) => {
    this.comments.push(comment);
  };
}
