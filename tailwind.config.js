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
    screens: {
      xss: { min: '360px' },
      xs: { min: '480px' },
      s: { min: '540px' },
      xxs: { min: '640px' },
      m: { min: '900px' },
      l: { min: '1024px' },
      xl: { min: '1280px' },
      xxl: { min: '1440px' },
      xxxl: { min: '1580px' },
      xxxxl: { min: '1640px' },
      '1k': { min: '1740px' },
      '2k': { min: '1998px' },
      'max-s': { max: '519px' },
      'max-m': { max: '767px' },
      'max-l': { max: '1023px' },
      'max-xl': { max: '1279px' },
    },

  },
  plugins: [],
}

