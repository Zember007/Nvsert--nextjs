/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // NOTE: cacheComponents (PPR/Cache Components) is still evolving in canary
  // and currently causes build-time prerender failures in this project.
  cacheComponents: false,

  // Убираем ошибку Turbopack + webpack
  turbopack: {}, // Это официально рекомендованный способ заглушить ошибку
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test11.audiosector.ru',
        port: '',
        pathname: '/cp/uploads/**',
      },
    ],
  
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  

  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // webpack конфиг остаётся (он нужен для @svgr/webpack)
  // Turbopack его игнорирует, но Next.js больше не ругается благодаря turbopack: {}
};

export default nextConfig;