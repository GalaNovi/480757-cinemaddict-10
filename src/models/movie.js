export default class Movie {
  constructor(data) {
    this._id = data.id;
    this._comments = data.comments;
    this._movieInfo = data[`film_info`];
    this._userInfo = data[`user_details`];
  }

  toRAW() {
    return {
      id: this._id,
      comments: this._comments,
      movieInfo: {
        ageLimit: this._movieInfo[`age_rating`],
        name: this._movieInfo[`title`],
        originalName: this._movieInfo[`alternative_title`],
        director: this._movieInfo[`director`],
        writers: this._movieInfo[`writers`],
        actors: this._movieInfo[`actors`],
        release: {
          date: this._movieInfo.release[`date`],
          country: this._movieInfo.release[`release_country`],
        },
        poster: this._movieInfo[`poster`],
        rating: this._movieInfo[`total_rating`],
        duration: this._movieInfo[`runtime`],
        genres: this._movieInfo[`genre`],
        description: this._movieInfo[`description`],
      },
      userInfo: {
        personalRating: this._userInfo[`personal_rating`],
        isOnTheWatchlist: this._userInfo[`watchlist`],
        isAlreadyWatched: this._userInfo[`already_watched`],
        isFavorite: this._userInfo[`watching_date`],
        watchingDate: this._userInfo[`favorite`],
      },
    };
  }

  static parseMovie(data) {
    return new Movie(data).toRAW();
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
