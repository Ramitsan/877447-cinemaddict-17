import { getRandomInteger, getRandomArray } from "../utils";

const FILM_TITLE = ['Popeye the Sailor Meets Sindbad the Sailor', 'Sagebrush Trail', 'The Dance of Life', 'The Man with the Golden Arm', 'The Great Flamarion'];
const FILM_POSTER = ['./images/posters/popeye-meets-sinbad.png', './images/posters/sagebrush-trail.jpg', './images/posters/the-dance-of-life.jpg', './images/posters/the-man-with-the-golden-arm.jpg', './images/posters/the-great-flamarion.jpg'];
const FILM_DIRECTOR = ['Anthony Mann', 'Tom Ford'];
const FILM_WRITERS = ['Anne Wigton', 'Heinz Herald', 'Richard Weil', 'Takeshi Kitano'];
const FILM_ACTORS = ['Morgan Freeman', 'Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'];
const FILM_GENRE = ['Drama', 'Cartoon', 'Western', 'Musical', 'Mystery'];
const FILM_DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];


const generateCardFilmElement = (arr) => {
  let index = getRandomInteger(0, arr.length);
  return arr[index];
};

export const generateCard = () => ({
  "film_info": {
    "title": generateCardFilmElement(FILM_TITLE),
    "alternative_title": "Laziness Who Sold Themselves",
    "total_rating": 5.3,
    "poster": generateCardFilmElement(FILM_POSTER),
    "age_rating": 0,
    "director": generateCardFilmElement(FILM_DIRECTOR),
    "writers": getRandomArray(FILM_WRITERS),
    "actors": getRandomArray(FILM_ACTORS),
    "release": {
      "date": "2019-05-11T00:00:00.000Z",
      "release_country": "Finland"
    },
    "runtime": 77,
    "genre": getRandomArray(FILM_GENRE),
    "description": generateCardFilmElement(FILM_DESCRIPTION)
  }
});
