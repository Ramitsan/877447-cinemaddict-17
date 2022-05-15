import { getRandomInteger, getRandomArray, generateRandomElement, generateBooleanValue } from '../utils';
import { generateComment } from './comment';

const FILM_TITLES = ['Popeye the Sailor Meets Sindbad the Sailor', 'Sagebrush Trail', 'The Dance of Life', 'The Man with the Golden Arm', 'The Great Flamarion'];
const FILM_ALTERNATIVE_TITLES = ['Laziness Who Sold Themselves', 'Lorem ipsum dolor sit amet', 'Fusce tristique felis at fermentum pharetra'];
const FILM_AGE_RATING = ['0+', '6+', '12+', '16+', '18+'];
const FILM_POSTERS = ['12chairs.jpg', '12night.jpg', 'afonya.jpg', 'assa.jpg', 'avengers.jpg', 'ballada.jpg', 'captive.jpg', 'garage.jpg', 'gentlemen.jpg', 'girl-without-adress.jpg', 'intractable.jpg', 'irony-of-fate.jpg', 'iwalk.jpg', 'kapucin.jpg', 'miror.jpg', 'moscu.jpg', 'ostrov.jpg', 'reb.jpg', 'sadko.jpg', 'solaris.jpg', 'stalker.jpg', 'the-diamond-arm.jpg', 'tigers.jpg', 'welcome.jpg', 'white-nights.jpg', 'white-sun.jpg', 'сinderella.jpg', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'the-dance-of-life.jpg', 'the-man-with-the-golden-arm.jpg', 'the-great-flamarion.jpg', 'made-for-each-other.png', 'santa-claus-conquers-the-martians.jpg'];
const FILM_DIRECTORS = ['Anthony Mann', 'Tom Ford'];
const FILM_WRITERS = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Takeshi Kitano'];
const FILM_ACTORS = ['Morgan Freeman', 'Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'];
const FILM_RELEASE_COUNTRIES = ['USA', 'France', 'Great Britain', 'Finland', 'Canada'];
const FILM_DATES_RELISES = ['1975-08-11T00:00:00.000Z', '1936-10-03T00:00:00.000Z', '1965-09-25T00:00:00.000Z', '1971-03-08T00:00:00.000Z', '1948-12-31T00:00:00.000Z'];
const FILM_GENRES = ['Drama', 'Cartoon', 'Western'];
const FILM_DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const FILM_DATES_WATCHING = ['2019-04-12T16:12:32.554Z', '2015-08-23T15:20:35.554Z', '2020-10-30T20:15:45.554Z'];

const totalCardCount = 10;
const MIN_RUNTIME = 30;
const MAX_RUNTIME = 120;
// const MIN_RATING = 1;
// const MAX_RATING = 10;
const MIN_COUNT_COMMENTS = 1;
const MAX_COUNT_COMMENTS = 7;

const generateTotalRating = () => (Math.random() * 10).toFixed(1);

export const generateCard = (cardsModel, commentsModel) => {
  const COMMENTS_COUNT = getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);
  const commentsId = [];

  for (let i = 0; i < COMMENTS_COUNT; i++) {
    const comment = generateComment();
    commentsId.push(comment.id);
    commentsModel.addComment(comment);
  }

  const card = {
    'id': getRandomInteger(0, totalCardCount),
    'comments': commentsId,
    'filmInfo': {
      'title': generateRandomElement(FILM_TITLES),
      'alternativeTitle': generateRandomElement(FILM_ALTERNATIVE_TITLES),
      'totalRating': generateTotalRating(),
      'poster': generateRandomElement(FILM_POSTERS),
      'ageRating': generateRandomElement(FILM_AGE_RATING),
      'director': generateRandomElement(FILM_DIRECTORS),
      'writers': getRandomArray(FILM_WRITERS),
      'actors': getRandomArray(FILM_ACTORS),
      'release': {
        'date': generateRandomElement(FILM_DATES_RELISES),
        'releaseCountry': generateRandomElement(FILM_RELEASE_COUNTRIES)
      },
      'runtime': getRandomInteger(MIN_RUNTIME, MAX_RUNTIME),
      'genre': getRandomArray(FILM_GENRES),
      'description': generateRandomElement(FILM_DESCRIPTIONS)
    },
    'userDetails': {
      'watchlist': generateBooleanValue(),
      'alreadyWatched': generateBooleanValue(),
      'watching_date': generateRandomElement(FILM_DATES_WATCHING),
      'favorite': generateBooleanValue()
    }
  };

  cardsModel.addCard(card);
};
