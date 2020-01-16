import {shuffleArray} from '../utils/common';
import {getRandomBetween, getRandomArrayItem} from '../utils/common';

const MAX_DESCRIPTION_SENTENSES = 6;
const MAX_GENRES = 3;
const MIN_ACTORS = 2;
const MAX_ACTORS = 4;
const MAX_WRITERS = 3;
const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const ageLimits = new Set([0, 6, 12, 16, 18]);

const commentsId = new Array(20).fill(``).map((element, index) => index);

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
const generateCommentsId = () => shuffleArray(commentsId).slice(0, getRandomBetween(0, 10));
const generateTitle = () => getRandomArrayItem(Array.from(titles));
const generatePoster = () => getRandomArrayItem(Array.from(posters));
const generateGenres = () => shuffleArray(Array.from(genres)).slice(0, getRandomBetween(1, MAX_GENRES));
const generateDirector = () => getRandomArrayItem(Array.from(directors));
const generateWriters = () => shuffleArray(Array.from(writers)).slice(0, getRandomBetween(1, MAX_WRITERS));
const generateActors = () => shuffleArray(Array.from(actors)).slice(0, getRandomBetween(MIN_ACTORS, MAX_ACTORS));
const generateCountry = () => getRandomArrayItem(Array.from(countries));
const generateReleaseDate = () => new Date(`${getRandomBetween(1960, 2019)}, ${getRandomBetween(1, 12)}, ${getRandomBetween(1, 28)}`).getTime();
const generateWatchingDate = () => new Date(`2020, 01, ${getRandomBetween(1, 17)}`).toISOString();

const generateDescription = () => {
  const sentenses = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  .split(`. `)
  .map((sentense, i, array) => i !== array.length - 1 ? `${sentense}.` : sentense);

  return sentenses.slice(0, getRandomBetween(1, MAX_DESCRIPTION_SENTENSES)).join(` `).trim();
};

const generateMovie = (index) => {
  return {
    id: index,
    comments: generateCommentsId(),
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
      isAlreadyWatched: getRandomBoolean(),
      isFavorite: getRandomBoolean(),
      watchingDate: generateWatchingDate(),
    },
  };
};

const generateMovies = (count) => new Array(count).fill(``).map((item, index) => generateMovie(index));

export {getRandomBetween, getRandomArrayItem, generateMovies};
