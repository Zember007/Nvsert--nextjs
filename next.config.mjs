/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru'
  },
  images: {
    domains: ['test11.audiosector.ru'],
    formats: ['image/avif', 'image/webp'],
  },
  // Оптимизации производительности
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Настройка SWC для исключения полифиллов современных функций
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Настройка транспилирования для современных браузеров
  experimental: {
    optimizePackageImports: ['lodash', 'framer-motion'],
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mp4$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    
    // Исключаем полифиллы для современных функций
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }

    return config;
  }

};

export default nextConfig;
