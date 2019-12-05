import {Position} from './const';

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const createElement = (templateString) => {
  const template = document.createElement(`template`);
  template.innerHTML = templateString;
  return template.content.firstElementChild;
};

const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFORE:
      container.before(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
  }
};

const getNextItemsIterator = (items) => {
  const ITEMS_PART_AMOUNT = 5;
  const itemsAmount = items.length;
  let previousItemsAmount = 0;

  return {
    next() {
      const value = items.slice(previousItemsAmount, previousItemsAmount + ITEMS_PART_AMOUNT);
      previousItemsAmount += value.length;
      const done = previousItemsAmount === itemsAmount;
      return {value, done};
    }
  };
};

export {capitalize, shuffleArray, createElement, render, getNextItemsIterator};
