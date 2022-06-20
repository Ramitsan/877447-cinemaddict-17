import ApiService from '../framework/api-service';
import { RequestMethod } from '../const.js';

const wait = async (ms) => new Promise((res) => setTimeout(res,ms));

export default class CommentsApiService extends ApiService {
  getMovieComments = (id) => {
    const response = this._load({ url: `comments/${id}` }).then(ApiService.parseResponse);
    return response;
  };

  deleteComment = async (commentId) => {
    await wait(5000);
    await this._load({
      url: `comments/${commentId}`,
      method: RequestMethod.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  };

  addComment = async(cardId, comment) => {
    await wait(5000);
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
