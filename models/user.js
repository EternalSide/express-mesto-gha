const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Имя пользователя обязательно к заполнению'],
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: [true, 'Информация о пользователе обязательно к заполнению'],
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: [true, 'Аватар пользователя обязателен к заполнению'],
      validate: {
        validator(url) {
          return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
            url,
          );
        },
      },
    },
  },
  { versionKey: false },
);

const User = model('user', userSchema);

module.exports = User;
