import { generateComment } from '../mock/comment';

export default class CommentsModel {
  comments = [];

  setComments = (arr) => {
    this.comments = arr;
  }

  getComments = () => this.comments;

  addComment = (comment) => {
    this.comments.push(comment);
  }
}
