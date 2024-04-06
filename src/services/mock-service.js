import { Handler } from '../../server/src/handler.ts';
import dataCards from '../data-cards.json';
import dataComments from '../data-comments.json';

const handler = new Handler(dataCards, dataComments);
const urls = {
  movies: {
    GET: () => handler.getMovies(),
  },
  comments: {
    GET: (keys) => handler.getComments(Number(keys[1])),
    DELETE: (keys) => handler.deleteComment(Number(keys[1])),
    POST: (keys, body) => handler.postComment(Number(keys[1]), body)
  }
};

export function mockFetch(url, method, body) {
  const parsedUrl = url.split('/');
  const endpoint = urls[parsedUrl[0]]?.[method];
  if(endpoint) {
    return {
      json: () => endpoint(parsedUrl, body),
      status: 200,
      ok: true
    };
  } else {
    return {
      json: () => {},
      status: 404,
      ok: false
    };
  }
}
