const express = require('express');
const router = express.Router();

const fav = require('../controllers/favorite');
const auth = require('../middleware/auth');

router.post('/', auth, fav.addFavorite);
router.delete('/:cardId', auth, fav.deleteFavorite);

module.exports = router;