/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Новый брейкпоинт для маленьких экранов
        's': '520px',
        'm': '768px',
        'l': '1024px',
        'xl': '1240px',
        'xxl': '1420px',
        'xxxl': '1620px',
        'max-s': { max: '519px' },
        'max-m': { max: '767px' },
        'max-l': { max: '1023px' },
        'max-xl': { max: '1239px' },
      },
    },

  },
  plugins: [],
}

