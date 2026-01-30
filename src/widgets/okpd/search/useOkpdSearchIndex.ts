import * as React from 'react';
import type { Okpd2Item } from 'widgets/okpd/OkpdHierarchy';

type OkpdIndexEntry = {
  item: Okpd2Item;
  code: string;
  codeNoDots: string;
  nameLower: string;
  fullLower: string;
};

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('ru-RU');
}

function normalizeCode(value: string) {
  return value.trim().replace(/\s+/g, '');
}

function looksLikeCodeQuery(q: string) {
  return /^[0-9.]+$/.test(q);
}

function calcScore(entry: OkpdIndexEntry, q: string, qNoDots: string, tokens: string[], codeMode: boolean) {
  if (codeMode) {
    if (entry.code === q) return 0;
    if (entry.code.startsWith(q)) return 1;
    if (entry.codeNoDots.startsWith(qNoDots)) return 2;
    if (entry.code.includes(q)) return 3;
    if (entry.codeNoDots.includes(qNoDots)) return 4;
    return 999;
  }

  // текстовый режим
  if (entry.nameLower === q) return 10;
  if (entry.nameLower.startsWith(q)) return 20;

  // чем больше токенов совпало — тем выше (меньше число)
  let missing = 0;
  for (const t of tokens) {
    if (!entry.fullLower.includes(t)) missing++;
  }
  return 100 + missing;
}

export function useOkpdSearchIndex(items: Okpd2Item[]) {
  const index = React.useMemo<OkpdIndexEntry[]>(() => {
    const src = Array.isArray(items) ? items : [];
    const out: OkpdIndexEntry[] = [];

    for (const it of src) {
      if (!it?.code || !it?.name) continue;
      const code = normalizeCode(it.code);
      if (!code) continue;

      const nameLower = normalizeText(it.name);
      const fullLower = `${code} ${nameLower}`;

      out.push({
        item: it,
        code,
        codeNoDots: code.replace(/\./g, ''),
        nameLower,
        fullLower,
      });
    }

    return out;
  }, [items]);

  const search = React.useCallback(
    (rawQuery: string, limit = 200): Okpd2Item[] => {
      const q = normalizeText(rawQuery);
      if (!q) return [];

      const codeMode = looksLikeCodeQuery(q);
      const qNoDots = q.replace(/\./g, '');
      const tokens = codeMode ? [] : q.split(' ').filter(Boolean);

      // быстрый однопроходный отбор + оценка релевантности
      const scored: Array<{ score: number; item: Okpd2Item }> = [];

      for (const entry of index) {
        if (codeMode) {
          if (
            !entry.code.includes(q) &&
            !entry.codeNoDots.includes(qNoDots) &&
            !entry.fullLower.includes(q)
          ) {
            continue;
          }
        } else {
          let ok = true;
          for (const t of tokens) {
            if (!entry.fullLower.includes(t)) {
              ok = false;
              break;
            }
          }
          if (!ok) continue;
        }

        const score = calcScore(entry, q, qNoDots, tokens, codeMode);
        scored.push({ score, item: entry.item });
      }

      scored.sort((a, b) => a.score - b.score);
      return scored.slice(0, limit).map(x => x.item);
    },
    [index],
  );

  return { search, total: index.length };
}


