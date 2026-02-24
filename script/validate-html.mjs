#!/usr/bin/env node
/**
 * Validates all public pages of the site via W3C Nu Validator JSON API.
 * Usage: node script/validate-html.mjs
 */

const SITE = process.env.VALIDATE_SITE || 'https://test11.audiosector.ru';
const VALIDATOR = 'https://validator.w3.org/nu/?out=json';
const DELAY_MS = 1500; // be polite to the validator
const MAX_RETRIES = 3;

const PAGES = [
  '/ru',
  '/en',
  '/ru/about',
  '/en/about',
  '/ru/contacts',
  '/en/contacts',
  '/ru/services',
  '/en/services',
  '/ru/tnved',
  '/en/tnved',
  '/ru/okpd',
  '/en/okpd',
  '/ru/find-out-cost',
  '/en/find-out-cost',
  '/ru/feedback',
  '/en/feedback',
];

async function discoverServiceSlugs() {
  try {
    const html = await (await fetch(`${SITE}/ru/services`)).text();
    const matches = [...html.matchAll(/href="\/ru\/services\/([^"]+)"/g)];
    return [...new Set(matches.map((m) => m[1]))];
  } catch {
    return [];
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function validatePage(url) {
  const html = await (await fetch(url, { redirect: 'follow' })).text();

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(VALIDATOR, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'User-Agent': 'Nvsert-Validator/1.0',
        },
        body: html,
      });

      if (res.status >= 500) {
        if (attempt < MAX_RETRIES) {
          await sleep(2000 * attempt);
          continue;
        }
        return { url, status: 'validator_error', messages: [] };
      }

      if (!res.ok) {
        return { url, status: `http_${res.status}`, messages: [] };
      }

      const data = await res.json();
      return { url, status: 'ok', messages: data.messages || [] };
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        return { url, status: 'network_error', error: err.message, messages: [] };
      }
      await sleep(2000 * attempt);
    }
  }
}

async function main() {
  console.log('Discovering service slugs...');
  const slugs = await discoverServiceSlugs();
  console.log(`Found ${slugs.length} service slugs: ${slugs.join(', ')}`);

  for (const slug of slugs) {
    PAGES.push(`/ru/services/${slug}`);
    PAGES.push(`/en/services/${slug}`);
  }

  console.log(`\nValidating ${PAGES.length} pages against W3C Nu Validator...\n`);

  const results = [];

  for (const page of PAGES) {
    const url = `${SITE}${page}`;
    process.stdout.write(`  ${page} ... `);
    const result = await validatePage(url);
    const errors = result.messages.filter((m) => m.type === 'error');
    const warnings = result.messages.filter((m) => m.subType === 'warning' || m.type === 'info');
    console.log(
      result.status === 'ok'
        ? `${errors.length} error(s), ${warnings.length} warning(s)`
        : `[${result.status}]`
    );
    results.push({ page, ...result, errorCount: errors.length, warningCount: warnings.length });
    await sleep(DELAY_MS);
  }

  const allErrors = [];
  for (const r of results) {
    for (const m of r.messages) {
      if (m.type === 'error') {
        allErrors.push({
          page: r.page,
          message: m.message,
          line: m.lastLine,
          col: m.firstColumn,
          extract: m.extract,
        });
      }
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    site: SITE,
    totalPages: PAGES.length,
    totalErrors: allErrors.length,
    errorsByPage: results.map((r) => ({
      page: r.page,
      errors: r.errorCount,
      warnings: r.warningCount,
    })),
    allErrors,
  };

  const { writeFileSync, mkdirSync } = await import('node:fs');
  mkdirSync('test-results', { recursive: true });
  writeFileSync('test-results/html-validator-report.json', JSON.stringify(report, null, 2));

  console.log(`\n========================================`);
  console.log(`Total pages: ${PAGES.length}`);
  console.log(`Total errors: ${allErrors.length}`);
  console.log(`Report saved to test-results/html-validator-report.json`);
  console.log(`========================================\n`);

  if (allErrors.length > 0) {
    console.log('Errors summary:\n');
    const grouped = {};
    for (const e of allErrors) {
      const key = e.message;
      if (!grouped[key]) grouped[key] = { message: key, count: 0, pages: new Set(), examples: [] };
      grouped[key].count++;
      grouped[key].pages.add(e.page);
      if (grouped[key].examples.length < 2) {
        grouped[key].examples.push({ page: e.page, line: e.line, extract: e.extract });
      }
    }

    const sorted = Object.values(grouped).sort((a, b) => b.count - a.count);
    for (const g of sorted) {
      console.log(`[${g.count}x] ${g.message}`);
      console.log(`     Pages: ${[...g.pages].join(', ')}`);
      for (const ex of g.examples) {
        console.log(`     Example (${ex.page}, line ${ex.line}): ${(ex.extract || '').trim().slice(0, 120)}`);
      }
      console.log();
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
