import {shuffleArray} from '../utils';
import {emotions} from '../const';

const MAX_DESCRIPTION_SENTENSES = 6;
const MAX_GENRES = 3;
const MIN_ACTORS = 2;
const MAX_ACTORS = 4;
const MAX_WRITERS = 3;
const getRandomBetween = (min, max, demicalPlacesCount = 0) => (parseFloat((min + Math.random() * (max - min)) + 0.01).toFixed(demicalPlacesCount));
const getRandomArrayItem = (array) => array[getRandomBetween(0, array.length - 1)];
const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const ageLimits = [0, 6, 12, 16, 18];

const titles = [
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

const posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const directors = [
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
];

const genres = [
  `comedy`,
  `musicle`,
  `western`,
  `drama`,
  `cartoon`,
  `mystery`,
];

const comments = [
  {
    'author': `Tim Macoveev`,
    'text': `Very good film! Not sorry for the time spent.`,
    'date': Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    'emotion': getRandomArrayItem(emotions),
  },
  {
    'author': `Mike Chakman`,
    'text': `Which movie is good? Yes, this is nonsense! The acting is terrible. Blooper on a blooper. Graphics sucks.`,
    'date': Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    'emotion': getRandomArrayItem(emotions),
  },
  {
    'author': `ChinWag`,
    'text': `The book was like that))) Cool like))) I can’t remember the name)))`,
    'date': Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    'emotion': getRandomArrayItem(emotions),
  },
  {
    'author': `derroys`,
    'text': `Awesome movie, one of the favorite in our family, great actors. Adore. I recommend.`,
    'date': Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    'emotion': getRandomArrayItem(emotions),
  },
  {
    'author': `Darkmus`,
    'text': `Good, funny film, why do sofa critics give such low ratings? :(`,
    'date': Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    'emotion': getRandomArrayItem(emotions),
  },
  {
    'author': `DarGi`,
    'text': `Surprisingly enjoyed watching this movie)`,
    'date': Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    'emotion': getRandomArrayItem(emotions),
  },
  {
    'author': `Barathrum`,
    'text': `A very pleasant psychological-ironic film, it looks in one breath. Cool story, a logical and interesting plot, a wonderful selection of actors. I looked with pleasure.`,
    'date': Date.now() - getRandomBetween(0, 36) * 60 * 60 * 1000,
    'emotion': getRandomArrayItem(emotions),
  },
];

const writers = [
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
];

const actors = [
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
];

const countries = [
  `USA`,
  `Italy`,
  `Russia`,
  `France`,
  `England`,
  `Belgium`,
  `India`,
];

const generateAgeLimit = () => getRandomArrayItem(ageLimits);
const generateTitle = () => getRandomArrayItem(titles);
const generatePoster = () => getRandomArrayItem(posters);
const generateGenres = () => shuffleArray(genres).slice(0, getRandomBetween(1, MAX_GENRES));
const generateComments = () => shuffleArray(comments).slice(0, getRandomBetween(0, comments.length));
const generateDirector = () => getRandomArrayItem(directors);
const generateWriters = () => shuffleArray(writers).slice(0, getRandomBetween(1, MAX_WRITERS));
const generateActors = () => shuffleArray(actors).slice(0, getRandomBetween(MIN_ACTORS, MAX_ACTORS));
const generateCountry = () => getRandomArrayItem(countries);
const generateReleaseDate = () => new Date(`${getRandomBetween(1960, 2019)}, ${getRandomBetween(1, 12)}, ${getRandomBetween(1, 28)}`).getTime();

const generateDescription = () => {
  const sentenses = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`. `)
  .map((sentense, i, array) => i !== array.length - 1 ? `${sentense}.` : sentense);

  return sentenses.slice(0, getRandomBetween(1, MAX_DESCRIPTION_SENTENSES)).join(` `).trim();
};

const generateCard = (index) => {
  return {
    'id': index,
    'comments': generateComments(),
    'movieInfo': {
      'ageLimit': generateAgeLimit(),
      'name': generateTitle(),
      'originalName': generateTitle(),
      'director': generateDirector(),
      'writers': generateWriters(),
      'actors': generateActors(),
      'release': {
        'date': generateReleaseDate(),
        'country': generateCountry(),
      },
      'poster': generatePoster(),
      'rating': getRandomBetween(0, 9, 1),
      'duration': getRandomBetween(75, 180),
      'genres': generateGenres(),
      'description': generateDescription(),
      'isOnTheWatchlist': getRandomBoolean(),
      'isAlredyWatched': getRandomBoolean(),
      'isFavorite': getRandomBoolean(),
    }
  };
};

export const generateCards = (count) => new Array(count).fill(``).map((item, index) => generateCard(index));
