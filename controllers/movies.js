const Movie = require('../models/movie');
const IncorrectDataError = require('../errors/incorrect-data-err');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { errorMessages, errorNames } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === errorNames.validationError) {
        throw new IncorrectDataError(errorMessages.incorrectData);
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.movieNotFound);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errorMessages.movieDeleteDenied);
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((deletedMovie) => res.status(200).send(deletedMovie));
    })
    .catch((err) => {
      if (err.name === errorNames.castError) {
        throw new IncorrectDataError(errorMessages.incorrectMovieId);
      }
      next(err);
    })
    .catch(next);
};
