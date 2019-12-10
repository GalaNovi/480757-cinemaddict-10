const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
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

const formatTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`;
};

export {capitalize, shuffleArray, getNextItemsIterator, formatTime};
