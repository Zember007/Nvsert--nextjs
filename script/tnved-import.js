const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'https://nvsert.ru/api/tn';

// Задержка между запросами (мс), чтобы сервер не сбросил соединение
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Получает ВСЕ элементы для конкретного родителя, проходя по всем страницам пагинации
 */
async function fetchAllPages(parentId = null) {
    let allContent = [];
    let currentPage = 1;
    let hasNext = true;

    while (hasNext) {
        try {
            const params = {
                format: 'json',
                page: currentPage
            };
            if (parentId) params.parent_id = parentId;

            console.log(`Запрос: parent_id=${parentId || 'root'}, page=${currentPage}`);
            
            const response = await axios.get(BASE_URL, { params, timeout: 10000 });
            const data = response.data;

            if (data && data.content) {
                allContent = allContent.concat(data.content);
            }

            // Проверяем, есть ли следующая страница
            if (data.next && currentPage < data.totalPages) {
                currentPage++;
                await delay(150); // Небольшая пауза между страницами
            } else {
                hasNext = false;
            }
        } catch (error) {
            console.error(`Ошибка при запросе (parent: ${parentId}, page: ${currentPage}):`, error.message);
            hasNext = false; 
        }
    }
    return allContent;
}

/**
 * Рекурсивная функция для построения дерева
 */
async function buildTree(parentId = null) {
    const items = await fetchAllPages(parentId);
    const tree = [];

    for (let item of items) {
        const node = {
            id: item.id,
            code: item.code,
            name: item.name,
            children: []
        };

        // Если это не листовой узел, идем вглубь
        if (item.is_leaf_node === false) {
            await delay(200); // Пауза перед погружением на уровень ниже
            node.children = await buildTree(item.id);
        }

        // Если детей нет (пустой массив), удаляем ключ children для чистоты JSON
        if (node.children.length === 0) delete node.children;

        tree.push(node);
    }

    return tree;
}

async function main() {
    console.log('--- Старт полной выгрузки ТН ВЭД ---');
    console.time('Full Execution Time');

    try {
        const fullData = await buildTree();

        fs.writeFileSync(
            'tnved_catalog.json', 
            JSON.stringify(fullData, null, 2), 
            'utf-8'
        );

        console.log('-----------------------------------');
        console.timeEnd('Full Execution Time');
        console.log(`Готово! Данные сохранены в tnved_catalog.json`);
    } catch (err) {
        console.error('Критическая ошибка:', err);
    }
}

main();