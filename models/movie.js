const mongoose = require('mongoose');

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
        // eslint-disable-next-line no-useless-escape
        return /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-zA-Z]{1,}[\w\-\/.~:?#[\]@!$&'()*+,;=]*/.test(v);
      },
      message: 'Некорректная ссылка на картинку',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-zA-Z]{1,}[\w\-\/.~:?#[\]@!$&'()*+,;=]*/.test(v);
      },
      message: 'Некорректная ссылка на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-zA-Z]{1,}[\w\-\/.~:?#[\]@!$&'()*+,;=]*/.test(v);
      },
      message: 'Некорректная ссылка на картинку',
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
