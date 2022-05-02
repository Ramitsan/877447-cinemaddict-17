import { getRandomInteger, getRandomArray } from "../utils";

const FILM_TITLES = ['Popeye the Sailor Meets Sindbad the Sailor', 'Sagebrush Trail', 'The Dance of Life', 'The Man with the Golden Arm', 'The Great Flamarion'];
const FILM_ALTERNATIVE_TITLES = ['Laziness Who Sold Themselves', 
                                 'Lorem ipsum dolor sit amet', 
                                 'Fusce tristique felis at fermentum pharetra'];
const FILM_AGE_RATING = [0, 6, 12, 16, 18];
const FILM_POSTERS = ['./images/posters/popeye-meets-sinbad.png', 
                      './images/posters/sagebrush-trail.jpg', 
                      './images/posters/the-dance-of-life.jpg', 
                      './images/posters/the-man-with-the-golden-arm.jpg', 
                      './images/posters/the-great-flamarion.jpg'];
const FILM_DIRECTORS = ['Anthony Mann', 'Tom Ford'];
const FILM_WRITERS = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Takeshi Kitano'];
const FILM_ACTORS = ['Morgan Freeman', 'Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'];
const FILM_RELEASE_COUNTRIES = ['USA', 'France', 'Great Britain', 'Finland', 'Canada'];
const FILM_GENRES = ['Drama', 'Cartoon', 'Western', 'Musical', 'Mystery'];
const FILM_DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];

const totalCardCount = 10;
const MIN_RUNTIME = 30;
const MAX_RUNTIME = 120;
const MIN_RATING = 1;
const MAX_RATING = 10;

const generateCardFilmElement = (arr) => {
  let index = getRandomInteger(0, arr.length);
  return arr[index];
};

const generateTotalRating = (min, max) => {
  return (Math.random(min, max) * 10).toFixed(1);
};

const generateBooleanValue = () => {
  return Boolean(getRandomInteger(0, 1));
}

export const generateCard = () => ({
  "id": getRandomInteger(0, totalCardCount),
  "film_info": {
    "title": generateCardFilmElement(FILM_TITLES),
    "alternative_title": generateCardFilmElement(FILM_ALTERNATIVE_TITLES),
    "total_rating": generateTotalRating(MIN_RATING, MAX_RATING),
    "poster": generateCardFilmElement(FILM_POSTERS),
    "age_rating": generateCardFilmElement(FILM_AGE_RATING),
    "director": generateCardFilmElement(FILM_DIRECTORS),
    "writers": getRandomArray(FILM_WRITERS),
    "actors": getRandomArray(FILM_ACTORS),
    "release": {
      "date": "2019-05-11T00:00:00.000Z",
      "release_country":generateCardFilmElement(FILM_RELEASE_COUNTRIES)
    },
    "runtime": getRandomInteger(MIN_RUNTIME, MAX_RUNTIME),
    "genre": getRandomArray(FILM_GENRES),
    "description": generateCardFilmElement(FILM_DESCRIPTIONS)
  },
  "user_details": {
    "watchlist": generateBooleanValue(),
    "already_watched": generateBooleanValue(),
    "watching_date": "2019-04-12T16:12:32.554Z",
    "favorite": generateBooleanValue()
  }
});
