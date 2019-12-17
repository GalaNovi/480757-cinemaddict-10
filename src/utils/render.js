import {Position} from '../const';
import AbstractComponent from '../components/abstract-component';

const createElement = (templateString) => {
  const template = document.createElement(`template`);
  template.innerHTML = templateString;
  return template.content.firstElementChild;
};

const render = (instanceContainer, instanceElement, place = Position.BEFOREEND) => {
  let container = instanceContainer;
  let element = instanceElement;

  if (instanceContainer instanceof AbstractComponent) {
    container = instanceContainer.getElement();
  }

  if (instanceElement instanceof AbstractComponent) {
    element = instanceElement.getElement();
  }

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

export {createElement, render};
