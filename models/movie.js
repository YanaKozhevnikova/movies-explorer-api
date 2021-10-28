const mongoose = require('mongoose');
const { errorMessages, urlRegExp } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
      message: errorMessages.incorrectImageUrlFormat,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
      message: errorMessages.incorrectTrailerUrlFormat,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegExp.test(v);
      },
      message: errorMessages.incorrectThumbnailUrlFormat,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
