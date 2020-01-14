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

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = Boolean(parentElement && newElement && oldElement);

  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export {createElement, render, replace, Position};
