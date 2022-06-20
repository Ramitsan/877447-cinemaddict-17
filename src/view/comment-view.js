import he from 'he';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDateComment} from '../utils/card-utils.js';

const createCommentTemplate = (comment, isDeleting, isBlocked) => {
  const { id, author, comment: commentText, date, emotion } = comment;
  const commentDate = date !== null ? humanizeDateComment(date) : '';

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
       <p class="film-details__comment-text">${he.encode(commentText)}</p>
       <p class="film-details__comment-info">    
         <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button type="button" class="film-details__comment-delete" data-id="${id}" ${isBlocked ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
    </li>`
  );
};

export default class CommentView extends AbstractView {
  #comment = null;
  #isDeleting = false;
  #isBlocked = false;

  constructor(comment, isDeleting = false, isBlocked = false) {
    super();
    this.#comment = comment;
    this.#isDeleting = isDeleting;
    this.#isBlocked = isBlocked;
  }

  get template() {
    return createCommentTemplate(this.#comment, this.#isDeleting, this.#isBlocked);
  }
}
