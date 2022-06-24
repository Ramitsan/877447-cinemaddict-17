// функция перевода минут в часы и минуты
const getFilmDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return hours >= 1 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export { getFilmDuration };
