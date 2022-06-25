import ApiService from '../framework/api-service';
import { RequestMethod } from '../const.js';
import { DELAY } from '../const.js';

const wait = async (ms) => new Promise((res) => setTimeout(res,ms));

export default class CommentsApiService extends ApiService {
  getMovieComments = (id) => this._load({ url: `comments/${id}`}).then(ApiService.parseResponse);

  deleteComment = async (commentId) => {
    await wait(DELAY);
    await this._load({
      url: `comments/${commentId}`,
      method: RequestMethod.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  };

  addComment = async(cardId, comment) => {
    await wait(DELAY);
    const response = await this._load({
      url: `comments/${cardId}`,
      method: RequestMethod.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };
}
