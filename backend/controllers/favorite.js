const Favorite = require('../models/Favorite');

const getFavorites = async (req, res) => {
    const userId = req.user.id;

    try {
        const favorites = await Favorite.find({ userId }).select('cardId');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des favoris.', error });
    }
};

const addFavorite = async (req, res) => {
    const { cardId } = req.body; 
    const userId = req.user.id; 

    try {
        // Vérifie si le favori existe déjà
        const existingFavorite = await Favorite.findOne({ userId, cardId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Cette carte est déjà dans vos favoris.' });
        }
        // Ajoute le favori pour cet utilisateur
        const newFavorite = new Favorite({ userId, cardId });
        await newFavorite.save();

        res.status(201).json({ message: 'Favori ajouté' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du favori' });
    }
};

const deleteFavorite = async (req, res) => {
    const { cardId } = req.params; // On récupère l'ID de la carte depuis l'URL
    const userId = req.user.id;

    try {
        // Retire le favori pour cet utilisateur
        await Favorite.findOneAndDelete({ userId, cardId });
        res.status(200).json({ message: 'Favori supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du favori' });
    }
};

module.exports = {
    addFavorite,
    deleteFavorite,
    getFavorites
};