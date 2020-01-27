export default class Movie {
  constructor(data) {
    console.log(data);
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
      'id': this.id,
      'comments': this.comments,
      'film_info': {
        'age_rating': this.movieInfo.ageLimit,
        'title': this.movieInfo.name,
        'alternative_title': this.movieInfo.originalName,
        'director': this.movieInfo.director,
        'writers': this.movieInfo.writers,
        'actors': this.movieInfo.actors,
        'release': {
          'date': this.movieInfo.release.date,
          'release_country': this.movieInfo.release.country,
        },
        'poster': this.movieInfo.poster,
        'total_rating': this.movieInfo.rating,
        'runtime': this.movieInfo.duration,
        'genre': this.movieInfo.genres,
        'description': this.movieInfo.description,
      },
      'user_details': {
        'personal_rating': this.userInfo.personalRating,
        'watchlist': this.userInfo.isOnTheWatchlist,
        'already_watched': this.userInfo.isAlreadyWatched,
        'watching_date': this.userInfo.watchingDate,
        'favorite': this.userInfo.isFavorite,
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
