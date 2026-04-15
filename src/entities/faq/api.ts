/**
 * Серверный fetcher FAQ с ISR-кешированием.
 *
 * next.revalidate: 3600 — FAQ меняется редко, но должен обновляться без ре-деплоя.
 * Это встроенный механизм ISR в Next.js App Router: результат кешируется на уровне
 * Next.js Data Cache и обновляется не чаще раза в час.
 *
 * При ошибке возвращает [] вместо throw — страница рендерится без FAQ,
 * а не падает с 500. Ошибка логируется в console.error для мониторинга.
 */
import type { FaqItem } from '@/types/faq';
import { STRAPI_API_URL } from 'shared/config/env';

const ONE_HOUR_SECONDS = 60 * 60;

export async function getFaqs(locale?: string): Promise<FaqItem[]> {
  try {
    const qs = locale ? `?locale=${encodeURIComponent(locale)}` : '';
    const res = await fetch(`${STRAPI_API_URL}/faqs${qs}`, {
      next: { revalidate: ONE_HOUR_SECONDS },
    });

    if (!res.ok) {
      console.error('Failed to fetch FAQs:', res.statusText);
      return [];
    }

    const data = await res.json();
    const faqs: FaqItem[] = data.data || [];
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}
