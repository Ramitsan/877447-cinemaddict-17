import { generateComment } from '../mock/comment';

export default class CommentsModel {
    comments = Array.from({length: 100}, generateComment);

  getComments = () => this.comments;
}
