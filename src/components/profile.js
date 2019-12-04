const generateProfileRatingMarkup = (moviesNumber) => {
  let markup = ``;

  if (moviesNumber > 0 && moviesNumber <= 10) {
    markup = `<p class="profile__rating">Novice</p>`;
  } else if (moviesNumber > 10 && moviesNumber <= 20) {
    markup = `<p class="profile__rating">Fan</p>`;
  } else if (moviesNumber > 20) {
    markup = `<p class="profile__rating">Movie Buff</p>`;
  }

  return markup;
};

export const createProfileTemplate = (moviesNumber) => {
  const profileRatingMarkup = generateProfileRatingMarkup(moviesNumber);

  return (
    `<section class="header__profile profile">
      ${profileRatingMarkup}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
