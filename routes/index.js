const router = require('express').Router();
const { createUser, login, signOut } = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-error');
const { errorMessages } = require('../utils/constants');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.delete('/signout', signOut);

router.use('/users', users);
router.use('/movies', movies);

router.use('*', () => {
  throw new NotFoundError(errorMessages.pageNotFound);
});

module.exports = router;
