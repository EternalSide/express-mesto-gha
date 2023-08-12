const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    if (!name || !about || !avatar) {
      return res.json({ message: 'Данные не заполнены' });
    }

    const user = await User.create(req.body);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ mesage: error.mesage });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name && !bio) {
      return res.status(404).json('Данные не заполнены');
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ mesage: 'Пользователь не найден' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ mesage: error.mesage });
  }
};
const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      return res.status(404).json('Не указана ссылка на изображение');
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ mesage: 'Пользователь не найден' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ mesage: error.mesage });
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateUserAvatar,
};
