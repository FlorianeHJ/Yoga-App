const API_URL = 'http://localhost:4000'
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/auth/signup`,
    SIGN_IN: `${API_URL}/api/auth/login`,
    FAVORITE_ADD: `${API_URL}/api/favorite`,
    FAVORITE_DELETE: (cardId) => `${API_URL}/api/favorite/${cardId}`,
}
export const APP_ROUTES = {
    SIGN_UP: '/Inscription',
    SIGN_IN: '/Connexion',
    HOME: '/',
    FAVORITES: '/MesFavoris',
}
