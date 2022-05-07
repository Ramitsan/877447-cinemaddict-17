import { getRandomInteger, generateRandomElement } from '../utils';

const COMMENT_AUTORS = ['Ilya O\'Reilly', 'Margo', 'John Doe', 'Tim Macoveev', 'Queen Elizabeth'];
const COMMENT_TEXTS = ['A film that changed my life, a true masterpiece, post-credit scene was just amazing omg', 'Interesting setting and a good cast', 'Booooooooooring', 'Very very old. Meh', 'Almost two hours? Seriously?'];
const COMMENT_DATES = ['2019-05-11T16:12:32.554Z', '2015-06-10T16:15:25.554Z', '2010-11-25T15:20:45.554Z', '2020-12-15T14:30:32.554Z'];
const COMMENT_EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const MAX_COMMENTS_ID = 100;

export const generateComment = () => ({
  'id': getRandomInteger(1, MAX_COMMENTS_ID),
  'author': generateRandomElement(COMMENT_AUTORS),
  'comment': generateRandomElement(COMMENT_TEXTS),
  'date': generateRandomElement(COMMENT_DATES),
  'emotion': generateRandomElement(COMMENT_EMOTIONS)
});
