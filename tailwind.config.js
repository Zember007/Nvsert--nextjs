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
        'xxxxl': '1640px',
        'xxxl': '1580px',
        'xxl': '1440px',
        'xl': '1240px',
        'l': '1024px',
        'm': '900px',
        'xxs': '640px',
        's': '520px',
        'xs': '480px', 
        'xss': '360px', 
        'max-s': { max: '519px' },
        'max-m': { max: '767px' },
        'max-l': { max: '1023px' },
        'max-xl': { max: '1239px' },
      },
    },

  },
  plugins: [],
}

