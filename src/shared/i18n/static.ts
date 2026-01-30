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

