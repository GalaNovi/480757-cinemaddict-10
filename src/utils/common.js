import moment from 'moment';
import {userRank} from '../const';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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

const getRandomBetween = (min, max, decimalPlacesCount = 0) => Number(parseFloat((min + Math.random() * (max - min)) + 0.01).toFixed(decimalPlacesCount));

const getUserRank = (moviesAmount) => {
  return moviesAmount ?
    userRank[Object.keys(userRank).reverse().find((key) => moviesAmount > key || moviesAmount === 0)] :
    userRank[0];
};

export {capitalize, getNextItemsIterator, formatTime, getRandomBetween, getUserRank};
