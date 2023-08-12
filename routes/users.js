const express = require('express');

const router = express.Router();

const {
  postUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', postUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);
module.exports = router;
