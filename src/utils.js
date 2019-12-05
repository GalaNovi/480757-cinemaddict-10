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

export {capitalize, shuffleArray, createElement, render};
