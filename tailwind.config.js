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
        'xss': '360px', 
        'xs': '480px', 
        's': '520px',
        'xxs': '640px',
        'm': '900px',
        'l': '1024px',
        'xl': '1240px',
        'xxl': '1420px',
        'xxxl': '1520px',
        'max-s': { max: '519px' },
        'max-m': { max: '767px' },
        'max-l': { max: '1023px' },
        'max-xl': { max: '1239px' },
      },
    },

  },
  plugins: [],
}

