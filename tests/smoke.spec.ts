import { test, expect } from '@playwright/test';

test('redirects / to /ru', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveURL(/\/ru(\/)?$/);
});

test('RU home loads with RU headline', async ({ page }) => {
  const response = await page.goto('/ru');
  expect(response?.status()).toBe(200);
  await expect(page.locator('body')).toContainText('Сертификация оборудования');
});

test('EN home loads with EN headline', async ({ page }) => {
  const response = await page.goto('/en');
  expect(response?.status()).toBe(200);
  await expect(page.locator('body')).toContainText('Certification of equipment, products, and services');
});

test('Contacts pages are accessible (RU/EN)', async ({ page }) => {
  const ru = await page.goto('/ru/contacts');
  expect(ru?.status()).toBe(200);

  const en = await page.goto('/en/contacts');
  expect(en?.status()).toBe(200);
});

