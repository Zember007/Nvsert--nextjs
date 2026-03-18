import { normalizeLocale } from 'shared/config/env';
import { HomePage } from '../page';

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  return <HomePage locale={normalizeLocale(locale)} />;
}

