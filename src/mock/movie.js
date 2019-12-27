import {shuffleArray} from '../utils/common';
import {EMOTIONS} from '../const';

const MAX_DESCRIPTION_SENTENSES = 6;
const MAX_GENRES = 3;
const MIN_ACTORS = 2;
const MAX_ACTORS = 4;
const MAX_WRITERS = 3;
const getRandomBetween = (min, max, demicalPlacesCount = 0) => Number(parseFloat((min + Math.random() * (max - min)) + 0.01).toFixed(demicalPlacesCount));
const getRandomArrayItem = (array) => array[getRandomBetween(0, array.length - 1)];
const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const ageLimits = new Set([0, 6, 12, 16, 18]);

const titles = new Set([
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
]);

const posters = new Set([
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
]);

const directors = new Set([
  `Quentin Tarantino`,
  `Christopher Nolan`,
  `Joel Coen`,
  `Frank Darabont`,
  `Sergio Leone`,
  `Wes Anderson`,
  `Martin Scorsese`,
  `Damien Chazelle`,
  `Drew Goddard`,
  `Ridley Scott`,
  `James Ponsoldt`,
]);

const genres = new Set([
  `comedy`,
  `musicle`,
  `western`,
  `drama`,
  `cartoon`,
  `mystery`,
]);

const comments = new Set([
  {
    id: 1,
    author: `Tim Macoveev`,
    text: `Very good film! Not sorry for the time spent.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(EMOTIONS),
  },
  {
    id: 2,
    author: `Mike Chakman`,
    text: `Which movie is good? Yes, this is nonsense! The acting is terrible. Blooper on a blooper. Graphics sucks.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(EMOTIONS),
  },
  {
    id: 3,
    author: `ChinWag`,
    text: `The book was like that))) Cool like))) I can’t remember the name)))`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(EMOTIONS),
  },
  {
    id: 4,
    author: `derroys`,
    text: `Awesome movie, one of the favorite in our family, great actors. Adore. I recommend.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(EMOTIONS),
  },
  {
    id: 5,
    author: `Darkmus`,
    text: `Good, funny film, why do sofa critics give such low ratings? :(`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(EMOTIONS),
  },
  {
    id: 6,
    author: `DarGi`,
    text: `Surprisingly enjoyed watching this movie)`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(EMOTIONS),
  },
  {
    id: 7,
    author: `Barathrum`,
    text: `A very pleasant psychological-ironic film, it looks in one breath. Cool story, a logical and interesting plot, a wonderful selection of actors. I looked with pleasure.`,
    date: Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    emotion: getRandomArrayItem(EMOTIONS),
  },
]);

const writers = new Set([
  `Anthony Mann`,
  `Stanley Kubrick`,
  `Martin Scorsese`,
  `Steven Spielberg`,
  `David Lynch`,
  `Quentin Tarantino`,
  `Woody Allen`,
  `Paul Thomas Anderson`,
  `Christopher Nolan`,
  `Ridley Scott`,
  `James Ponsoldt`,
]);

const actors = new Set([
  `Jack Nicholson`,
  `Marlon Brando`,
  `Robert De Niro`,
  `Al Pacino`,
  `Tom Hanks`,
  `Julia Roberts`,
  `Sandra Bullock`,
  `Demi Moore`,
  `Meg Ryan`,
  `Julia Ormond`,
  `Jennifer Aniston`,
  `Denzel Washington`,
]);

const countries = new Set([
  `USA`,
  `Italy`,
  `Russia`,
  `France`,
  `England`,
  `Belgium`,
  `India`,
]);

const generateAgeLimit = () => getRandomArrayItem(Array.from(ageLimits));
const generateTitle = () => getRandomArrayItem(Array.from(titles));
const generatePoster = () => getRandomArrayItem(Array.from(posters));
const generateGenres = () => shuffleArray(Array.from(genres)).slice(0, getRandomBetween(1, MAX_GENRES));
const generateComments = () => shuffleArray(Array.from(comments)).slice(0, getRandomBetween(0, comments.size));
const generateDirector = () => getRandomArrayItem(Array.from(directors));
const generateWriters = () => shuffleArray(Array.from(writers)).slice(0, getRandomBetween(1, MAX_WRITERS));
const generateActors = () => shuffleArray(Array.from(actors)).slice(0, getRandomBetween(MIN_ACTORS, MAX_ACTORS));
const generateCountry = () => getRandomArrayItem(Array.from(countries));
const generateReleaseDate = () => new Date(`${getRandomBetween(1960, 2019)}, ${getRandomBetween(1, 12)}, ${getRandomBetween(1, 28)}`).getTime();
const generateWatchingDate = () => new Date(`2019, ${getRandomBetween(1, 12)}, ${getRandomBetween(1, 28)}`).getTime();

const generateDescription = () => {
  const sentenses = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`. `)
  .map((sentense, i, array) => i !== array.length - 1 ? `${sentense}.` : sentense);

  return sentenses.slice(0, getRandomBetween(1, MAX_DESCRIPTION_SENTENSES)).join(` `).trim();
};

const generateMovie = (index) => {
  return {
    id: index,
    localComment: {
      comment: null,
      date: null,
      emotion: EMOTIONS[getRandomBetween(0, 7)],
    },
    comments: generateComments(),
    movieInfo: {
      ageLimit: generateAgeLimit(),
      name: generateTitle(),
      originalName: generateTitle(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      release: {
        date: generateReleaseDate(),
        country: generateCountry(),
      },
      poster: generatePoster(),
      rating: getRandomBetween(0, 9, 1),
      duration: getRandomBetween(75, 180),
      genres: generateGenres(),
      description: generateDescription(),
    },
    userInfo: {
      personalRating: getRandomBetween(0, 9),
      isOnTheWatchlist: getRandomBoolean(),
      isAlredyWatched: true,
      isFavorite: getRandomBoolean(),
      watchingDate: generateWatchingDate(),
    },
  };
};

export const generateMovies = (count) => new Array(count).fill(``).map((item, index) => generateMovie(index));
