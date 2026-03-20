import { getFaqs } from 'entities/faq';
import AppMainIntro from 'widgets/home/AppMainIntro';
import BelowFoldClient from './_components/BelowFoldClient';
import DeferredHomeContentClient from './_components/DeferredHomeContentClient';
import { DEFAULT_LOCALE, type SupportedLocale } from 'shared/config/env';


export async function HomePage({ locale }: { locale: SupportedLocale }) {
  const faqs = await getFaqs(locale);

  return (
    <div className="main text-[#000] overflow-hidden relative leading-page">
      {/* LCP: секция и h1 рендерятся на сервере без ожидания JS */}
      <AppMainIntro locale={locale} />

      <BelowFoldClient />

      {/* Тяжелый клиентский контент уходит из критического пути первого экрана */}
      <DeferredHomeContentClient faqs={faqs} />
    </div>
  );
}

export default async function Home() {
  return <HomePage locale={DEFAULT_LOCALE} />;
}
