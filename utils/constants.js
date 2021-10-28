const errorMessages = {
  authRequired: 'Необходима авторизация',
  movieNotFound: 'Фильм не найден',
  userNotFound: 'Пользователь не найден',
  pageNotFound: 'Ресурс не найден',
  movieDeleteDenied: 'Нет прав для удаления фильма',
  incorrectData: 'Переданы некорректные данные',
  incorrectMovieId: 'Неверный формат ID фильма',
  incorrectLogin: 'Неправильные почта или пароль',
  incorrectEmailFormat: 'Некорректный формат email',
  incorrectImageUrlFormat: 'Некорректный формат ссылки на постер',
  incorrectTrailerUrlFormat: 'Некорректный формат ссылки на трейлер',
  incorrectThumbnailUrlFormat: 'Некорректный формат ссылки на миниатюрное изображение',
  userExists: 'Пользователь с таким email уже существует',
  serverError: 'На сервере произошла ошибка',
};

const errorNames = {
  castError: 'CastError',
  validationError: 'ValidationError',
  mongoServerError: 'MongoServerError',
};

const successMessages = {
  successfullAuth: 'Авторизация прошла успешно',
  successfulLogout: 'Выход из системы прошел успешно',
};

const allowedOriginCors = [
  'http://yana.movies.nomoredomains.monster',
  'https://yana.movies.nomoredomains.monster',
  'http://localhost:3000',
  'https://localhost:3000',
];
const allowedMethodsCors = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const urlRegExp = /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-zA-Z]{1,}[\w\-/.~:?#[\]@!$&'()*+,;=]*/;

const {
  NODE_ENV,
  MONGO_SERVER = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
} = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? process.env.JWT_SECRET : 'super-secret-key';

module.exports = {
  errorMessages,
  errorNames,
  successMessages,
  allowedOriginCors,
  allowedMethodsCors,
  urlRegExp,
  NODE_ENV,
  MONGO_SERVER,
  PORT,
  JWT_SECRET,
};
