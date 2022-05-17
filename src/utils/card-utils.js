import dayjs from 'dayjs';

// функция отображения дат в человекочитаемом формате
const humanizeDateReleaseForCard = (date) => dayjs(date).format('YYYY');
const humanizeDateReleaseForPopup = (date) => dayjs(date).format('D MMMM YYYY');
const humanizeDateComment = (date) => dayjs(date).format('YYYY/mm/DD hh:mm');

export { humanizeDateReleaseForCard, humanizeDateReleaseForPopup, humanizeDateComment };
