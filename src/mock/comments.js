
import {EMOTIONS} from '../const';
import {getRandomBetween, getRandomArrayItem} from '../utils/common';

const COMMENT_AUTHORS = [`Tim Macoveev`, `Mike Chakman`, `ChinWag`, `derroys`, `Darkmus`, `DarGi`, `Barathrum`, `Duddle`, `PiedPiper`, `Brunduliak`];
const COMMENT_TEXTS = [
  `Very good film! Not sorry for the time spent.`,
  `Which movie is good? Yes, this is nonsense! The acting is terrible. Blooper on a blooper. Graphics sucks.`,
  `The book was like that))) Cool like))) I can’t remember the name)))`,
  `Awesome movie, one of the favorite in our family, great actors. Adore. I recommend.`,
  `Good, funny film, why do sofa critics give such low ratings? :(`,
  `Surprisingly enjoyed watching this movie)`,
  `A very pleasant psychological-ironic film, it looks in one breath. Cool story, a logical and interesting plot, a wonderful selection of actors. I looked with pleasure.`,
];

const generateComment = (commentId) => {
  return {
    id: commentId,
    author: getRandomArrayItem(COMMENT_AUTHORS),
    comment: getRandomArrayItem(COMMENT_TEXTS),
    date: new Date(Date.now() - getRandomBetween(0, 363333) * 60 * 60 * 1000).toISOString(),
    emotion: getRandomArrayItem(EMOTIONS),
  };
};

const generateComments = () => {
  return new Array(20).fill(null).map((element, index) => generateComment(index));
};

export {generateComments, COMMENT_AUTHORS};
