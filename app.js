const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');

const PORT = process.env.PORT || 3000;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
// middleware
app.use(helmet());
app.use(express.json());

// Routes
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { urlRegex, emailRegex } = require('./utils/regex');
const NotFoundError = require('./errors/NotFound');

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().pattern(emailRegex),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email().pattern(emailRegex),
      password: Joi.string().required().min(2),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegex),
    }),
  }),
  createUser,
);

// auth middleware
app.use(auth);

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

// Ошибки
app.use(errors());

// 404
app.use((req, res, next) => {
  next(new NotFoundError('Некорректный запрос'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка на стороне сервера' : message,
  });
  next();
});

// DB
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключение к БД успешно.');
  })
  .catch((e) => console.log(`Не удалось подключиться к БД, Ошибка :${e}`));

app.listen(PORT, () => console.log(`Сервер Запущен, Порт:${PORT}`));
