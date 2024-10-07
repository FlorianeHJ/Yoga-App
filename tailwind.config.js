/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            sm: '530px',
            md: '845px',
            lg: '1024px',
            xl: '1280px',
        },
        colors: {
            background: '#FDF7F5',
            primary: '#43302B',
            secondary: '#FDFCFC',
            transparent: 'transparent',
        },

        plugins: [],
    },
}
