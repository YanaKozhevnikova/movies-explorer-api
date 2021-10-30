const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
const { errorMessages } = require('../utils/constants');

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new CelebrateError(errorMessages.incorrectImageUrlFormat);
      }
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new CelebrateError(errorMessages.incorrectTrailerUrlFormat);
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!validator.isURL(value)) {
        throw new CelebrateError(errorMessages.incorrectThumbnailUrlFormat);
      }
      return value;
    }),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});
