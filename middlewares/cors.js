const allowedOriginCors = [
  'http://yana.movies.nomoredomains.monster',
  'https://yana.movies.nomoredomains.monster',
  'http://localhost:3000',
  'https://localhost:3000',
];
const allowedMethodsCors = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethodsCors);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    if (allowedOriginCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    return res.end();
  }
  if (allowedOriginCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  return next();
};
