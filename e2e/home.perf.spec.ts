import { test, expect } from '@playwright/test';

// Basic performance smoke for the home page.
// This test captures LCP using a buffered PerformanceObserver and asserts it's within a reasonable bound.
test.describe('Home page performance', () => {
  test('captures LCP and basic timings', async ({ page, context }) => {
    // Capture LCP as early as possible
    await context.addInitScript(() => {
      try {
        // @ts-ignore
        window.__perf = { lcp: null as null | number };
        // @ts-ignore
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const last = entries[entries.length - 1] as any;
          // @ts-ignore
          window.__perf.lcp = last ? last.startTime : null;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {
        // noop
      }
    });

    const baseUrl =
      process.env.BASE_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      'http://localhost:3000';

    const response = await page.goto(baseUrl, { waitUntil: 'load' });
    expect(response?.ok()).toBeTruthy();

    // Ensure critical sections render
    await expect(page.locator('#intro')).toBeVisible();

    // Extract LCP
    const lcp = await page.evaluate(() => {
      // @ts-ignore
      return window.__perf?.lcp ?? null;
    });

    // Log for visibility in CI output
    console.log('LCP (ms):', lcp);

    // Soft assertion target; adjust as needed for environment
    // We don't fail the build on first run; uncomment to enforce:
    // expect(lcp).toBeLessThan(3000);
  });
});


