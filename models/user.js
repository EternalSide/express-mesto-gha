const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Имя пользователя обязательно к заполнению'],
    min: 2,
    max: 30,
  },
  about: {
    type: String,
    required: [true, 'Информация о пользователе обязательно к заполнению'],
    min: 2,
    max: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Аватар пользователя обязателен к заполнению'],
  },
});

const User = model('user', userSchema);

module.exports = User;
