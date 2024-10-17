# Yoga Timer - Backend

## Description
Le backend de l'application **Yoga Timer** gère l'authentification, la gestion des favoris, et stocke les données des utilisateurs et des cartes de yoga dans une base de données MongoDB.

## Prérequis
- Node.js (version recommandée : 16.x ou plus)
- MongoDB (local ou dans le cloud avec MongoDB Atlas)
- npm ou yarn

## Installation

1. Clonez ce dépôt dans votre répertoire local :
    ```bash
    git clone https://github.com/ton-repo/yoga-timer-backend.git
    ```

2. Accédez au répertoire du projet :
    ```bash
    cd yoga-timer-backend
    ```

3. Installez les dépendances :
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

4. Créez un fichier `.env` à la racine du projet et configurez les variables suivantes :
    ```
    MONGODB_URI=<Votre_URL_MongoDB>
    JWT_SECRET=<Votre_Secret_Pour_JSON_Web_Token>
    ```

## Démarrage du serveur

1. Lancez le serveur en mode développement :
    ```bash
    npm start
    ```
    ou
    ```bash
    yarn start
    ```

Le backend fonctionnera par défaut sur le port `5000`. Vous pouvez changer cela dans le fichier `server.js` si nécessaire.

## Fonctionnalités principales

- **Authentification**: Les utilisateurs peuvent s'inscrire et se connecter à l'aide de JSON Web Token (JWT).
- **Gestion des favoris**: Les utilisateurs authentifiés peuvent ajouter des positions de yoga à leurs favoris, qui sont stockées dans MongoDB.
- **Sécurité**: Le backend utilise `helmet` et `express-rate-limit` pour protéger contre les attaques courantes.

## Technologies utilisées

- **Express.js**: Framework backend.
- **MongoDB**: Base de données NoSQL pour stocker les utilisateurs et les cartes de yoga.
- **Mongoose**: ORM pour interagir avec MongoDB.
- **JWT**: Pour l'authentification sécurisée des utilisateurs.
- **bcrypt**: Pour le hachage des mots de passe des utilisateurs.
- **dotenv**: Pour gérer les variables d'environnement.