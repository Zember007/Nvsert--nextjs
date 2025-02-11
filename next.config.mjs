/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
    baseUrl: process.env.baseUrl,

  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.apiTarget}/:path*`,
        has: [
          {
            type: 'header',
            key: 'X-Access-Token',
            value: process.env.apiToken,
          },
          {
            type: 'header',
            key: 'Authorization',
            value: 'Basic Y29mZmVlOmNvZmZlZQ==',
          },
        ],
      },
      {
        source: '/media/:path*',
        destination: `${process.env.mediaTarget}/:path*`,
        has: [
          {
            type: 'header',
            key: 'X-Access-Token',
            value: process.env.apiToken,
          },
          {
            type: 'header',
            key: 'Authorization',
            value: 'Basic Y29mZmVlOmNvZmZlZQ==',
          },
        ],
      },
    ];
  }

};

export default nextConfig;
