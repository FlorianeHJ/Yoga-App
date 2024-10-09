const express = require('express');
const router = express.Router();
const {
    addFavorite,
    deleteFavorite,
    checkFavorite,
} = require('../controllers/favorite');
const authenticateToken = require('../middleware/auth');

// Ajouter une carte aux favoris
router.post('/', authenticateToken, addFavorite);

// Retirer une carte des favoris
router.delete('/:cardId', authenticateToken, deleteFavorite);

// Vérifier si une carte est déjà dans les favoris
router.get('/:cardId', authenticateToken, checkFavorite);

module.exports = router;