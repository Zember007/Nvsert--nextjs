/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru'
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },

  

};

export default nextConfig;
