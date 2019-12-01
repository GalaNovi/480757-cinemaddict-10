const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${minutes}m`
};

export {capitalize, formatTime};
