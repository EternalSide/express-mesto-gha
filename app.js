const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64d78495a51659672395f38b',
  };
  next();
});

// Routes
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

// DB
mongoose
  .connect(`mongodb://127.0.0.1:27017/mestodb`)
  .then(() => {
    console.log('Подключение к БД успешно.');
  })
  .catch((e) => console.log(`Не удалось подключиться к БД, Ошибка :${e}`));

app.listen(PORT, () => console.log(`Сервер Запущен, Порт:${PORT}`));
