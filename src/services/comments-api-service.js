import ApiService from '../framework/api-service';
import { RequestMethod } from '../const.js';

export default class CommentsApiService extends ApiService {
  getMovieComments = (id) => {
    const response = this._load({ url: `comments/${id}` }).then(ApiService.parseResponse);
    return response;
  };

  deleteComment = async (commentId) => {
    await this._load({
      url: `comments/${commentId}`,
      method: RequestMethod.DELETE,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
  };

  addComment = async(cardId, comment) => {
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
