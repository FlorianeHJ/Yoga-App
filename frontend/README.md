# Yoga Timer - Frontend

## Description

Le frontend de l'application **Yoga Timer** est une interface utilisateur développée en React et Tailwind CSS. L'application permet de visualiser des positions de yoga avec des timers et d'ajouter des positions aux favoris pour les utilisateurs authentifiés.

## Prérequis

-   Node.js (version recommandée : 16.x ou plus)
-   npm ou yarn

## Installation

1. Clonez ce dépôt dans votre répertoire local :

    ```bash
    git clone https://github.com/ton-repo/yoga-timer-frontend.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd yoga-timer-frontend
    ```

3. Installez les dépendances :
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

## Scripts disponibles

-   `npm start` ou `yarn start`: Démarre le projet en mode développement. L'application sera accessible à l'adresse `http://localhost:3000/`.
-   `npm run build` ou `yarn build`: Construit le projet pour la production dans le dossier `build`.
-   `npm run test` ou `yarn test`: Lance les tests unitaires si disponibles.
-   `npm run eject`: Ejecte les configurations de création.

## Configuration

-   **React Router** est utilisé pour la navigation entre les pages comme "Home", "About", "Work", et "Contact".
-   **Axios** est utilisé pour les requêtes API vers le backend.
-   **Tailwind CSS** est utilisé pour le style.

## Technologies utilisées

-   **React**: version 18.x
-   **React Router DOM**: version 6.x pour la gestion des routes.
-   **Axios**: pour gérer les appels API.
-   **Tailwind CSS**: pour les styles et les mises en page.
-   **React Icons**: pour les icônes.
