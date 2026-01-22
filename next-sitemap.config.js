/** @type {import('next-sitemap').IConfig} */
const nextConfig = {
    siteUrl:
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.baseUrl ||
        'https://example.com',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || process.env.baseUrl || 'https://example.com').replace(/\/$/, '')}/sitemap.xml`,
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