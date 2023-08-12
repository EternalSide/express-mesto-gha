const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      return res.status(404).json({ message: 'Не достаточно данных' });
    }

    const newCard = await Card.create({ name, link, owner: req.user._id });

    return res.status(200).json(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Карта не найдена' });
    }
    return res.status(200).json({ message: 'Карта удалена' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // убрать _id из массива
      { new: true },
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }
    return res.status(200).json(updatedCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
      { new: true },
    );

    if (!likedCard) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    return res.status(200).json(likedCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  deleteLike,
  putLike,
};
