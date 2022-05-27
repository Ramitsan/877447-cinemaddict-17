import dayjs from 'dayjs';

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

const sortByRating = (cardA, cardB) => cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;

export { humanizeDateReleaseForCard, humanizeDateReleaseForPopup, humanizeDateComment, sortByDate, sortByRating };
