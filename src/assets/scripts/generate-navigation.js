/**
 * Build-time скрипт: генерирует src/assets/lib/navigation.json из Strapi API.
 *
 * ЗАЧЕМ: навигация (список услуг по категориям) нужна в Root Layout для SSR
 * HeaderFallback. Fetch в RSC на каждый запрос — лишний cold start; JSON в бандле —
 * детерминированный и быстрый. Запускается автоматически в prebuild / вручную:
 *   npm run generate-navigation
 *
 * Использует NVSERT_CMS_API_URL → NEXT_PUBLIC_STRAPI_PUBLIC_URL/api → localhost:1337.
 * Сортировка по category.order обеспечивает единый порядок меню без логики на фронте.
 *
 * navigation.json не коммитится в git (генерируется при сборке).
 * Если Strapi недоступен при запуске — скрипт логирует ошибку и завершается.
 * В CI/CD убедитесь, что Strapi запущен перед npm run build.
 */
const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function main() {
  try {
    const strapiPublic = process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL;
    const cmsApi =
      process.env.NVSERT_CMS_API_URL ||
      (strapiPublic ? `${strapiPublic.replace(/\/$/, '')}/api` : null) ||
      'http://localhost:1337/api';
    const res = await axios.get(`${cmsApi}/services`);
    const data = res.data;
    const navigationItems = data.data || [];

    // сортируем по категории
    const sorted = navigationItems.sort(
      (a, b) => (a?.category?.order || 0) - (b?.category?.order || 0)
    );

    const filePath = path.resolve(__dirname, "../lib/navigation.json");
    const dirPath = path.dirname(filePath);

    // Создаём директорию, если её нет
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2));

    console.log("Navigation JSON generated successfully!");
  } catch (err) {
    console.error("Error generating navigation:", err);
  }
}

main();
