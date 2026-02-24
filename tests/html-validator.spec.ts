import { expect, test } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

type ValidationMessage = {
  type: string;
  message?: string;
  lastLine?: number;
  firstColumn?: number;
  extract?: string;
};

type ValidationIssue = {
  route: string;
  message: string;
  line?: number;
  column?: number;
  extract?: string;
};

const REPORT_PATH = resolve(process.cwd(), 'test-results/html-validator-report.json');

async function collectInternalRoutes(baseURL: string): Promise<string[]> {
  const queue = ['/ru', '/en'];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);

    let html = '';
    try {
      const res = await fetch(new URL(current, baseURL), {
        redirect: 'follow',
      });
      if (!res.ok) continue;
      html = await res.text();
    } catch {
      continue;
    }

    const hrefs = Array.from(html.matchAll(/href="([^"]+)"/g), (m) => m[1]);
    for (const href of hrefs) {
      if (!href || href.startsWith('#')) continue;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;

      let url: URL;
      try {
        url = new URL(href, baseURL);
      } catch {
        continue;
      }

      const base = new URL(baseURL);
      if (url.origin !== base.origin) continue;

      if (url.search || url.hash) {
        url.search = '';
        url.hash = '';
      }

      const normalized = url.pathname.replace(/\/$/, '') || '/';
      if (!visited.has(normalized) && !queue.includes(normalized)) {
        queue.push(normalized);
      }
    }
  }

  return Array.from(visited).sort((a, b) => a.localeCompare(b));
}

async function validateHtml(html: string): Promise<ValidationMessage[]> {
  const response = await fetch('https://validator.w3.org/nu/?out=json', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent': 'Nvsert-Playwright-Validator',
    },
    body: html,
  });

  if (!response.ok) {
    throw new Error(`Validator request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { messages?: ValidationMessage[] };
  return data.messages ?? [];
}

test('all internal pages pass W3C Nu HTML validation', async ({ baseURL }) => {
  expect(baseURL, 'baseURL must be set in Playwright config').toBeTruthy();
  const safeBaseURL = baseURL as string;

  const routes = await collectInternalRoutes(safeBaseURL);
  expect(routes.length, 'No routes collected for validation').toBeGreaterThan(0);

  const issues: ValidationIssue[] = [];

  for (const route of routes) {
    const res = await fetch(new URL(route, safeBaseURL), { redirect: 'follow' });
    if (!res.ok) {
      issues.push({
        route,
        message: `Route returned HTTP ${res.status}, HTML validation skipped.`,
      });
      continue;
    }

    const html = await res.text();
    const messages = await validateHtml(html);
    const pageErrors = messages.filter((msg) => msg.type === 'error');

    for (const err of pageErrors) {
      issues.push({
        route,
        message: err.message ?? 'Unknown validator error',
        line: err.lastLine,
        column: err.firstColumn,
        extract: err.extract,
      });
    }
  }

  await mkdir(dirname(REPORT_PATH), { recursive: true });
  await writeFile(
    REPORT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseURL: safeBaseURL,
        routes,
        issueCount: issues.length,
        issues,
      },
      null,
      2
    ),
    'utf-8'
  );

  if (issues.length > 0) {
    const preview = issues
      .slice(0, 10)
      .map(
        (issue) =>
          `${issue.route}: ${issue.message}${issue.line ? ` (line ${issue.line}${issue.column ? `, col ${issue.column}` : ''})` : ''}`
      )
      .join('\n');

    throw new Error(
      `W3C validation failed with ${issues.length} error(s).\n` +
        `First issues:\n${preview}\n\nFull report: ${REPORT_PATH}`
    );
  }
});
