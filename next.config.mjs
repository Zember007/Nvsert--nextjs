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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Оптимизации производительности
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Экспериментальные оптимизации
  experimental: {
    optimizePackageImports: ['lodash', 'framer-motion', '@reduxjs/toolkit'],
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mp4$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    // Оптимизация бандлов для клиентской стороны
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Отдельный чанк для больших библиотек анимации
            animation: {
              name: 'animation',
              chunks: 'all',
              test: /node_modules\/(framer-motion|gsap)/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // Отдельный чанк для Redux
            redux: {
              name: 'redux',
              chunks: 'all',
              test: /node_modules\/(@reduxjs\/toolkit|react-redux)/,
              priority: 25,
              reuseExistingChunk: true,
            },
            // Отдельный чанк для остальных vendor библиотек
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // Общий чанк для часто используемых модулей
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  }

};

export default nextConfig;
