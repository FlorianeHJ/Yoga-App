const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors'); // Importer cors

require('dotenv').config();

const userRoutes = require('./routes/user');
const favoriteRoutes = require('./routes/favorite');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());
app.use(helmet());


// Utiliser cors pour gérer les en-têtes CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Remplacer * par ton frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/auth', userRoutes);
app.use('/api/favorite', favoriteRoutes);

module.exports = app;