'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import textSize from '@/assets/styles/base/base.module.scss';
import type { Okpd2Item } from 'widgets/okpd/OkpdHierarchy';
import { OkpdSearchBar } from 'widgets/okpd/OkpdSearchBar';
import { OkpdSearchResults } from 'widgets/okpd/OkpdSearchResults';
import { useDebouncedValue } from 'widgets/okpd/search/useDebouncedValue';
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

function OkpdQuickSearchSectionImpl() {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = React.useState('');
  const debouncedInput = useDebouncedValue(inputValue, 250);
  const [committedQuery, setCommittedQuery] = React.useState('');

  const [isPending, startTransition] = React.useTransition();
  const [results, setResults] = React.useState<Okpd2Item[]>([]);

  // авто-поиск после паузы ввода (в transition, чтобы не лагал ввод)
  React.useEffect(() => {
    startTransition(() => setCommittedQuery(debouncedInput));
  }, [debouncedInput, startTransition]);

  React.useEffect(() => {
    const q = committedQuery.trim();
    if (!q) {
      setResults([]);
      return;
    }

    const ac = new AbortController();
    startTransition(() => {
      // keep pending state, but fetch outside transition (state updates inside)
    });

    (async () => {
      try {
        const locale = document?.documentElement?.lang === 'en' ? 'en' : 'ru';
        const res = await fetch(`${STRAPI_PUBLIC_URL}/api/okpd2s/search?q=${encodeURIComponent(q)}&limit=10&locale=${locale}`, {
          signal: ac.signal,
        });
        if (!res.ok) return;
        const json = await res.json();
        const data = Array.isArray(json?.data) ? (json.data as Okpd2Item[]) : Array.isArray(json) ? (json as Okpd2Item[]) : [];
        startTransition(() => setResults(data));
      } catch {
        // ignore
      }
    })();

    return () => ac.abort();
  }, [committedQuery, startTransition]);

  const submit = React.useCallback(() => {
    // мгновенно применяем текущий ввод
    startTransition(() => setCommittedQuery(inputValue));
  }, [inputValue, startTransition]);

  return (
    <div className="flex flex-col" id="block-1">
      <p className={`${textSize.headerH4} text-[#34446D] border-b border-[#34446D] mb-[20px] h-[28px]`}>
        {t('okpd.quickSearch.title')}
      </p>

      <OkpdSearchBar value={inputValue} onChange={setInputValue} onSubmit={submit} />

      <span className={`${textSize.text3} font-light`}>
        {t('okpd.quickSearch.example')}
      </span>

      <OkpdSearchResults query={committedQuery} results={results} isPending={isPending} />
    </div>
  );
}

export const OkpdQuickSearchSection = React.memo(OkpdQuickSearchSectionImpl);




