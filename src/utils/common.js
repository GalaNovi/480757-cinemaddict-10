import moment from 'moment';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getNextItemsIterator = (items, itemsPartAmount, startItemsAmount) => {
  const itemsAmount = items.length;
  let previousItemsAmount = 0;

  return {
    next() {
      const value = items.slice(previousItemsAmount, startItemsAmount);
      startItemsAmount += itemsPartAmount;
      previousItemsAmount += value.length;
      const done = previousItemsAmount === itemsAmount;
      return {value, done};
    }
  };
};

const formatTime = (duration) => {
  const time = moment.duration(duration, `minutes`);
  return `${time.hours()}h ${time.minutes()}m`;
};

const getRandomBetween = (min, max, demicalPlacesCount = 0) => Number(parseFloat((min + Math.random() * (max - min)) + 0.01).toFixed(demicalPlacesCount));
const getRandomArrayItem = (array) => array[getRandomBetween(0, array.length - 1)];

export {capitalize, shuffleArray, getNextItemsIterator, formatTime, getRandomBetween, getRandomArrayItem};
