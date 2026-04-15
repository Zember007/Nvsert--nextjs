/**
 * Серверно-безопасный геттер переводов (без глобального состояния i18next).
 *
 * ЗАЧЕМ: generateMetadata() — async server function без React-контекста.
 * i18next инициализируется в ClientProvider только на клиенте. Вызов i18next.t() из
 * Server Component/generateMetadata ненадёжен — порядок инициализации не гарантирован.
 *
 * tStatic() читает JSON-файлы переводов напрямую и делает dot-path lookup +
 * {{var}}-интерполяцию без зависимости от singleton i18next.
 *
 * ОГРАНИЧЕНИЯ: нет поддержки plurals, context, count и других i18next-фич.
 * Для компонентов с богатой логикой локализации — используйте useTranslation() на клиенте.
 */
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';
import type { SupportedLocale } from 'shared/config/env';

const resources = { ru, en } as const;

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, values?: Record<string, string | number>): string {
  if (!values) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k: string) => {
    const v = values[k];
    return v === undefined || v === null ? '' : String(v);
  });
}

/**
 * Simple server-safe translation getter (no i18next global state).
 * Supports dot-path keys and basic {{var}} interpolation.
 */
export function tStatic(
  locale: SupportedLocale,
  key: string,
  values?: Record<string, string | number>,
): string {
  const dict = resources[locale] ?? resources.ru;
  const value = getByPath(dict, key);
  if (typeof value === 'string') return interpolate(value, values);
  return key;
}

