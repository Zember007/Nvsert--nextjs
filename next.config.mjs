/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru'
  },

  webpack: (config) => {
    return config;
  },

  

};

export default nextConfig;
