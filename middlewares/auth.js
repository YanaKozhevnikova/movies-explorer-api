const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { errorMessages, JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError(errorMessages.authRequired);
  }
  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    next(new AuthError(errorMessages.authRequired));
  }

  req.user = payload;
  return next();
};
