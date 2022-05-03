import dayjs from 'dayjs';

// генерация случайного числа в заданном интервале, включительно
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = arr[j];
    arr[j] = arr[i];
    arr[i] = swap;
  }
  return arr;
}
// генерация массива случайных элементов из другого массива
const getRandomArray = (arr) => {
  const newArray = arr.slice();
  return shuffle(newArray).splice(0, getRandomInteger(1, newArray.length + 1));
}

// генерация случайного элемента из массива
const generateRandomElement = (arr) => {
  let index = getRandomInteger(0, arr.length - 1);
  return arr[index];
};

//генерация случайного булева значения
const generateBooleanValue = () => {
  return Boolean(getRandomInteger(0, 1));
}

// функция отображения дат в человекочитаемом формате
const humanizeDate = (date) => dayjs(date).format('D MMMM YYYY');

export { getRandomInteger, getRandomArray, generateRandomElement, generateBooleanValue, humanizeDate };
