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

const getUserRank = (moviesAmount) => {
  return moviesAmount ?
    userRank[Object.keys(userRank).reverse().find((key) => moviesAmount > key || moviesAmount === 0)] :
    userRank[0];
};

const removeMainPreloader = () => {
  const preloader = document.querySelector(`.preloader-wrapper`);
  const preloaderElement = document.querySelector(`.preloader-element`);
  preloaderElement.style.transition = `opacity 0.5s`;
  preloader.style.transition = `opacity 1s`;
  preloaderElement.style.opacity = `0`;
  preloader.style.opacity = `0`;

  setTimeout(() => {
    preloader.remove();
  }, 1000);
};

export {capitalize, getNextItemsIterator, formatTime, getUserRank, removeMainPreloader};
