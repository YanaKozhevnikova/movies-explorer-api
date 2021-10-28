require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_SERVER } = require('./utils/constants');

mongoose.connect(MONGO_SERVER, {
  useNewUrlParser: true,
});

const app = express();

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
