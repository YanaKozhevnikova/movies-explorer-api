const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-err');
const RegistrationEmailError = require('../errors/registration-email-error');
const AuthError = require('../errors/auth-error');
const {
  errorMessages,
  errorNames,
  successMessages,
  JWT_SECRET,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === errorNames.castError) {
        throw new IncorrectDataError(errorMessages.incorrectData);
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === errorNames.castError) {
        throw new IncorrectDataError(errorMessages.incorrectData);
      }
      if (err.name === errorNames.mongoServerError && err.code === 11000) {
        throw new RegistrationEmailError(errorMessages.userExists);
      }
      next(err);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => {
          if (!user) {
            throw new NotFoundError(errorMessages.userNotFound);
          }
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          });
          res.send({
            email: user.email,
            name: user.name,
            _id: user._id,
          });
        })
        .catch((err) => {
          if (err.name === errorNames.validationError) {
            throw new IncorrectDataError(errorMessages.incorrectData);
          }
          if (err.name === errorNames.mongoServerError && err.code === 11000) {
            throw new RegistrationEmailError(errorMessages.userExists);
          }
          next(err);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ message: successMessages.successfullAuth });
    })
    .catch(() => {
      next(new AuthError(errorMessages.incorrectLogin));
    });
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: successMessages.successfulLogout });
};
