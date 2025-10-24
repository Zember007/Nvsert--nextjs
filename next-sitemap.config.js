/** @type {import('next-sitemap').IConfig} */
const nextConfig = {
    siteUrl: process.env.baseUrl || 'https://example.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.baseUrl}/sitemap.xml`,
        ],
        policies: [
            {
                userAgent: '*',
                disallow: ['/adm/', '/*?*'],
                allow: ['*/?page'],
            },
            {
                userAgent: 'Yandex',
                disallow: ['/adm/', '/*?*'],
                allow: ['*/?page'],
            },
            {
                userAgent: 'Googlebot',
                disallow: ['/adm/', '/*?*'],
                allow: ['*/?page', '*/?utm'],
            },
        ],
    },
}

module.exports = nextConfig