export default class Movie {
  constructor(movieData) {
    this.id = movieData[`id`];
    this.comments = movieData[`comments`];
    this.movieInfo = {
      ageLimit: movieData[`film_info`][`age_rating`],
      name: movieData[`film_info`][`title`],
      originalName: movieData[`film_info`][`alternative_title`],
      director: movieData[`film_info`][`director`],
      writers: movieData[`film_info`][`writers`],
      actors: movieData[`film_info`][`actors`],
      release: {
        date: movieData[`film_info`][`release`][`date`],
        country: movieData[`film_info`][`release`][`release_country`],
      },
      poster: movieData[`film_info`][`poster`],
      rating: movieData[`film_info`][`total_rating`],
      duration: movieData[`film_info`][`runtime`],
      genres: movieData[`film_info`][`genre`],
      description: movieData[`film_info`][`description`],
    };
    this.userInfo = {
      personalRating: movieData[`user_details`][`personal_rating`],
      isOnTheWatchlist: movieData[`user_details`][`watchlist`],
      isAlreadyWatched: movieData[`user_details`][`already_watched`],
      watchingDate: movieData[`user_details`][`watching_date`],
      isFavorite: movieData[`user_details`][`favorite`],
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
        'watching_date': this.userInfo.watchingDate || new Date(0),
        'favorite': this.userInfo.isFavorite,
      },
    };
  }

  static parseMovie(movieData) {
    return new Movie(movieData);
  }

  static parseMovies(moviesData) {
    return moviesData.map(Movie.parseMovie);
  }

  static clone(movieData) {
    return new Movie(movieData.toRAW());
  }
}
