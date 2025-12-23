import fs from "fs";
import mammoth from "mammoth";

const DOCX_PATH = "OKPD2 36-99 question.docx";
const OUTPUT_JSON = "okpd2.fixed.json";

// допускаем только реальные коды ОКПД-2
const CODE_RE = /^\d{2}(?:\.\d{1,3}){0,4}$/;

function getLevel(code) {
  return code.split(".").length;
}

function getParentCode(code) {
  const parts = code.split(".");
  if (parts.length === 1) return null;
  parts.pop();
  return parts.join(".");
}

async function parseDocx(path) {
  const { value } = await mammoth.extractRawText({ path });

  const lines = value
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const itemsMap = new Map();

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // строка = только код
    if (CODE_RE.test(line)) {
      const next = lines[i + 1];

      // следом должно быть НАЗВАНИЕ (не число)
      if (next && !/^\d+$/.test(next)) {
        itemsMap.set(line, {
          code: line,
          name: next,
          level: getLevel(line),
          children: []
        });
        i += 2;
        continue;
      }
    }

    // строка = код + название в одной строке
    const m = line.match(/^(\d{2}(?:\.\d{1,3}){0,4})\s+(.+)$/);
    if (m && !/^\d+$/.test(m[2])) {
      const [, code, name] = m;

      itemsMap.set(code, {
        code,
        name,
        level: getLevel(code),
        children: []
      });
    }

    i++;
  }

  return [...itemsMap.values()];
}

function buildTree(items) {
  const index = new Map();
  const roots = [];

  items.forEach(i => index.set(i.code, i));

  for (const item of items) {
    const parentCode = getParentCode(item.code);

    if (parentCode && index.has(parentCode)) {
      index.get(parentCode).children.push(item);
    } else {
      roots.push(item);
    }
  }

  return roots;
}

async function main() {
  const flat = await parseDocx(DOCX_PATH);
  const tree = buildTree(flat);

  fs.writeFileSync(
    OUTPUT_JSON,
    JSON.stringify(tree, null, 2),
    "utf-8"
  );

  console.log("Готово");
  console.log("Всего кодов:", flat.length);
}

main().catch(console.error);
