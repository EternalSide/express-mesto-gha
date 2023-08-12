const express = require('express');
const {
  getCards,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);
router.post('/', postCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;