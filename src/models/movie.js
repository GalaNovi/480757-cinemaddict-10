export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.comments = data[`comments`];
    this.movieInfo = {
      ageLimit: data[`film_info`][`age_rating`],
      name: data[`film_info`][`title`],
      originalName: data[`film_info`][`alternative_title`],
      director: data[`film_info`][`director`],
      writers: data[`film_info`][`writers`],
      actors: data[`film_info`][`actors`],
      release: {
        date: data[`film_info`][`release`][`date`],
        country: data[`film_info`][`release`][`release_country`],
      },
      poster: data[`film_info`][`poster`],
      rating: data[`film_info`][`total_rating`],
      duration: data[`film_info`][`runtime`],
      genres: data[`film_info`][`genre`],
      description: data[`film_info`][`description`],
    };
    this.userInfo = {
      personalRating: data[`user_details`][`personal_rating`],
      isOnTheWatchlist: data[`user_details`][`watchlist`],
      isAlreadyWatched: data[`user_details`][`already_watched`],
      watchingDate: data[`user_details`][`watching_date`],
      isFavorite: data[`user_details`][`favorite`],
    };
  }

  toRAW() {
    return {
      'id': this._id,
      'comments': this._comments,
      'film_info': {
        'age_rating': this._movieInfo[`age_rating`],
        'title': this._movieInfo[`title`],
        'alternative_title': this._movieInfo[`alternative_title`],
        'director': this._movieInfo[`director`],
        'writers': this._movieInfo[`writers`],
        'actors': this._movieInfo[`actors`],
        'release': {
          'date': this._movieInfo.release[`date`],
          'release_country': this._movieInfo.release[`release_country`],
        },
        'poster': this._movieInfo[`poster`],
        'total_rating': this._movieInfo[`total_rating`],
        'runtime': this._movieInfo[`runtime`],
        'genre': this._movieInfo[`genre`],
        'description': this._movieInfo[`description`],
      },
      'user_details': {
        'personal_rating': this._userInfo[`personal_rating`],
        'watchlist': this._userInfo[`watchlist`],
        'already_watched': this._userInfo[`already_watched`],
        'watching_date': this._userInfo[`watching_date`],
        'favorite': this._userInfo[`favorite`],
      },
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
