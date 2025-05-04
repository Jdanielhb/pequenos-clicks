/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5',
                secondary: '#10B981',
                accent: '#F59E0B',
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                pequenosclicks: {
                    "primary": "#4F46E5",
                    "secondary": "#10B981",
                    "accent": "#F59E0B",
                    "neutral": "#3D4451",
                    "base-100": "#FFFFFF",
                    "info": "#3ABFF8",
                    "success": "#36D399",
                    "warning": "#FBBD23",
                    "error": "#F87272",
                },
            },
        ],
    },
}