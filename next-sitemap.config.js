/** @type {import('next-sitemap').IConfig} */
const nextConfig = {
    // Keep a single source of truth for canonical site URL.
    // In production set NEXT_PUBLIC_SITE_URL (recommended) or NEXT_PUBLIC_BASE_URL.
    siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').replace(/\/$/, ''),
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')}/sitemap.xml`,
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