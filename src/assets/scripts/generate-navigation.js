const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function main() {
  try {
    const res = await axios.get(`https://test11.audiosector.ru/cp/api/services`);
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
