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

const renderTemplate = (template, element) => {
  const childElement = createElement(template);
  return element.appendChild(childElement);
};

export {capitalize, shuffleArray, renderTemplate};
