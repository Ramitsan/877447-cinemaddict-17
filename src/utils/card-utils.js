import dayjs from 'dayjs';

// Функция, которая обрезает текстовое содержимое, если оно превышает заданное число символов
function getCropDescription(description, symbolsCountDefault = 140) {
  const chars = [];
  let symbolsCountCurrent = 0;
  for (const char of description) {
    symbolsCountCurrent++;
    if (symbolsCountCurrent < symbolsCountDefault) {
      chars.push(char);
    } else {
      break;
    }
  }

  const newDescription = chars.join('');
  return symbolsCountCurrent >= symbolsCountDefault ? `${newDescription}...` : `${newDescription}`;
}


// функция отображения дат в человекочитаемом формате
const humanizeDateReleaseForCard = (date) => dayjs(date).format('YYYY');
const humanizeDateReleaseForPopup = (date) => dayjs(date).format('D MMMM YYYY');
const humanizeDateComment = (date) => dayjs(date).format('YYYY/mm/DD hh:mm');

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
};

// сортировка по датам в порядке убывания
const sortByDate = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.filmInfo.release.date, cardB.filmInfo.release.date);

  return weight ?? dayjs(cardB.filmInfo.release.date).diff(dayjs(cardA.filmInfo.release.date));
};

// сортировка по рейтингу в порядке убывания
const sortByRating = (cardA, cardB) => cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;

// сортировка по дефолту
// логическое выражение с оператором "<" вернет true или false
// умножением на 2 приводим его к числу
// вычитаем 1
const sortByDefault = (cardA, cardB) => (cardB.id < cardA.id) * 2 - 1;

export { getCropDescription, humanizeDateReleaseForCard, humanizeDateReleaseForPopup, humanizeDateComment, sortByDate, sortByRating, sortByDefault };
