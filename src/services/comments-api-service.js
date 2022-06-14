import ApiService from '../framework/api-service';
import { RequestMethod } from '../const.js';

export default class CommentsApiService extends ApiService {
  getMovieComments = (card) => {
    const response = this._load({ url: `comments/${card.id}` }).then(ApiService.parseResponse);
    return response;
  };

  deleteComment = async (comment) => {
    await this._load({
      url: `comments/${comment.id}`,
      method: RequestMethod.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  };

  addComment = async(card, comment) => {
    const response = await this._load({
      url: `comments/${card.id}`,
      method: RequestMethod.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };
}
