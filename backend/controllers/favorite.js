const Favorite = require('../models/Favorite');

// Ajouter une carte aux favoris
const addFavorite = async (req, res) => {
    const { cardId } = req.body;
    const userId = req.user.id;

    try {
        const favoriteExists = await Favorite.findOne({ userId, cardId });
        if (favoriteExists) {
            return res.status(400).json({ message: 'Favori déjà existant' });
        }

        const newFavorite = new Favorite({ userId, cardId });
        await newFavorite.save();

        res.status(201).json({ message: 'Favori ajouté' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du favori' });
    }
};

// Retirer une carte des favoris
const deleteFavorite = async (req, res) => {
    const { cardId } = req.params;
    const userId = req.user.id;

    try {
        const favorite = await Favorite.findOneAndDelete({ userId, cardId });
        if (!favorite) {
            return res.status(404).json({ message: 'Favori non trouvé' });
        }

        res.status(200).json({ message: 'Favori retiré' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du favori' });
    }
};

// Vérifier si une carte est déjà dans les favoris
const checkFavorite = async (req, res) => {
    const { cardId } = req.params;
    const userId = req.user.id;

    try {
        const favorite = await Favorite.findOne({ userId, cardId });
        res.status(200).json({ isFavorite: !!favorite });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la vérification du favori' });
    }
};

module.exports = {
    addFavorite,
    deleteFavorite,
    checkFavorite,
};