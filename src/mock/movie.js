const Titles = [
  `The Shawshank Redemption`,
  `The Godfather`,
  `The Dark Knight`,
  `12 Angry Men`,
  `Schindler's List`,
  `The Lord of the Rings: The Return of the King`,
  `Pulp Fiction`,
  `Il buono, il brutto, il cattivo`,
  `Fight Club`,
  `The Lord of the Rings: The Fellowship of the Ring`,
  `Forrest Gump`,
  `Inception`,
  `Star Wars: Episode V - The Empire Strikes Back`,
  `The Lord of the Rings: The Two Towers`,
  `The Matrix`,
];

const Posters = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`,
];

const Genres = [
  `comedy`,
  `musicle`,
  `western`,
  `drama`,
  `cartoon`,
  `mystery`,
];

const MAX_GENRES_COUNT = 3;
const getRandomBetween = (min, max, demicalPlacesCount = 0) => parseFloat((min + Math.random() * (max - min)).toFixed(demicalPlacesCount));
const getRandomArrayItem = (array) => array[getRandomBetween(0, array.length - 1)];
// const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[i], array[j]];
  }

  return array;
};

const generateTitle = () => getRandomArrayItem(shuffleArray(Titles));
const generatePoster = () => getRandomArrayItem(shuffleArray(Posters));
const generateGenres = () => shuffleArray(Genres).slice(0, getRandomBetween(1, MAX_GENRES_COUNT));
const generateDescription = () => {
  const sentenses = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`.`)
  .map(sentense => sentense.trim());

  return sentenses.slice(0, getRandomBetween(1, 3)).join(`. `).trim();
};

const generateMovie = (index) => {
  return {
    'id': index,
    'movieInfo': {
      'title': generateTitle(),
      'poster': generatePoster(),
      'rating': getRandomBetween(5, 10, 1),
      'year': getRandomBetween(1960, 2019),
      'duration': getRandomBetween(75, 180),
      'genre': generateGenres(),
      'description': generateDescription(),
    }
  };
};

export const generateMovies = (count) => new Array(count).fill(``).map((item, index) => generateMovie(index));
