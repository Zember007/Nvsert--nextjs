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
  compress: true,
  poweredByHeader: false,
  
  // Оптимизация для мобильных устройств
  experimental: {
    // optimizeCss: true, // Отключено - требует установки critters
    optimizePackageImports: ['react-i18next', 'gsap'], // Tree shaking для тяжелых библиотек
  },

  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Оптимизация bundle size
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Отдельный chunk для тяжелых библиотек
            vendor: {
              test: /[\\/]node_modules[\\/](gsap|react-i18next)[\\/]/,
              name: 'vendor-heavy',
              priority: 20,
            },
            // Framer Motion в отдельный chunk для лучшего кэширования
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              priority: 25,
            },
            common: {
              minChunks: 2,
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
