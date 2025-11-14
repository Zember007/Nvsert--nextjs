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

  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp4$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });

    return config;
  }

};

export default nextConfig;
