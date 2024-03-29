import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import CommentView from './comment-view.js';
import { humanizeDateReleaseForPopup } from '../utils/card-utils.js';
import { getFilmDuration } from '../utils/common.js';

const createPopupTemplate = ({card, comments, commentEmoji, commentText, deletingComments, isSending}) => {
  const { filmInfo, userDetails } = card;
  const { title, totalRating, poster, ageRating, director, writers, actors, release, genre, runtime, description } = filmInfo;
  const { date, releaseCountry } = release;
  const {isWatchlist, isAlreadyWatched, isFavorite} = userDetails;
  const commentsCount = comments.length;

  const filmReleaseDate = date !== null ? humanizeDateReleaseForPopup(date) : '';
  const filmRuntime = getFilmDuration(runtime);

  const createFilmGenresTemplate = (genres) => genres.map((item) => `<span class="film-details__genre">${item}</span>`).join('');
  const filmGenresTemplate = createFilmGenresTemplate(genre);
  const genresCount = genre.length > 1 ? 'Genres' : 'Genre';

  const setActiveControl = (param) => param ? 'film-details__control-button--active' : '';

  const chooseEmoji = commentEmoji ?
    `<img src="./images/emoji/${commentEmoji}.png" width="55" height="55" alt="emoji-${commentEmoji}"></img>`
    : '';

  const deletingCommentsIds = new Set(deletingComments);
  const commentsList = comments.map((comment) => {
    const commentComponent = new CommentView(comment, deletingCommentsIds.has(comment.id), isSending || deletingCommentsIds.size > 0);
    return commentComponent.element.outerHTML;
  }).join('');

  const disabledValue = isSending ? 'disabled' : '';

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
    
              <p class="film-details__age">${ageRating}</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${filmReleaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmRuntime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresCount}</td>
                  <td class="film-details__cell">
                  ${filmGenresTemplate}
                  </td>
                </tr>
              </table>
    
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <button type="button" class="film-details__control-button ${setActiveControl(isWatchlist)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button ${setActiveControl(isAlreadyWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button ${setActiveControl(isFavorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>
    
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
    
            <ul class="film-details__comments-list">${commentsList}               
            </ul>
    
            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">${chooseEmoji}</div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${disabledValue}>${commentText}</textarea>
              </label>
    
              <div class="film-details__emoji-list" ${disabledValue}>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopupView extends AbstractStatefulView {
  constructor(card) {
    super();
    this._state = PopupView.parsePropsToState({card});
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state);
  }

  // метод для сброса введенного текста после закрытия окна
  reset = (card) => {
    this.updateElement (
      PopupView.parsePropsToState(card),
    );
  };

  static parsePropsToState = (props) => ({...props,
    commentEmoji: null,
    commentText: '',
    comments: [],
    scrollTop: null,
    deletingComments: [],
    isSending: false,
  });

  setSending = (isSending) => {
    this.updateElement({isSending});
  };

  setDeleting = (id) => {
    this.updateElement({
      deletingComments: [...this._state.deletingComments, id]
    });
  };

  #chooseEmojiClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      commentEmoji: evt.target.value,
      scrollTop: this.element.scrollTop,
    });

    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => (item.checked = false));
    evt.target.checked = true;

    this.element.scrollTop = this._state.scrollTop;
  };

  #commentTextInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      commentText: evt.target.value,
      scrollTop: this.element.scrollTop,
    });
  };

  updateComments = (comments) => {
    this.updateElement({comments, deletingComments: [], isSending: false});
  };

  updateCard = (card) => {
    this.updateElement(card);
  };

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((item) => item.addEventListener('click', this.#chooseEmojiClickHandler));
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentTextInputHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setClosePopupClickHandler(this._callback.click);
    this.setWatchlistClickHandler(this._callback.addWatchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCommentRemoveHandler(this._callback.removeComment);
    this.setCommentAddHandler(this._callback.addComment);
    this.element.scrollTop = this._state.scrollTop;
  };

  setClosePopupClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupClickHandler);
  };

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.addWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addWatchlistClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #addWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addWatchlistClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  // удаление комментариев
  setCommentRemoveHandler = (callback) => {
    this._callback.removeComment = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((item) => item.addEventListener('click', this.#handleRemoveComment));
  };

  #handleRemoveComment = (evt) => {
    evt.preventDefault();
    this._callback.removeComment(evt.target.dataset.id);
  };

  // добавление комментариев
  setCommentAddHandler = (callback) => {
    this._callback.addComment = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#addCommentHandler);
  };

  #addCommentHandler = (evt) => {
    if (evt.key === 'Enter' && evt.ctrlKey && !this._state.isSending) {
      this._callback.addComment({
        emotion: this._state.commentEmoji,
        comment: this._state.commentText,
      });
      this._setState({scrollTop: this.element.scrollTop,
        commentText: '',
        commentEmoji: null,
      });
    }
  };
}
