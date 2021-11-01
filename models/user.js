const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { errorMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: errorMessages.incorrectEmailFormat,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(errorMessages.incorrectLogin));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(errorMessages.incorrectLogin));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
