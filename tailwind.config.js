/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // FSD-слои
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    screens: {
      xss: { min: '360px' },
      xs: { min: '480px' },
      s: { min: '540px' },
      xxs: { min: '640px' },
      m: { min: '960px' },
      l: { min: '1024px' },
      xl: { min: '1280px' },
      xxl: { min: '1407px' },
      xxxl: { min: '1580px' },
      xxxxl: { min: '1640px' },
      '1k': { min: '1740px' },
      '2k': { min: '1998px' },
      'max-s': { max: '519px' },
      'max-l': { max: '1023px' },
      'max-xl': { max: '1279px' },
    },
  },
  plugins: [],
}
