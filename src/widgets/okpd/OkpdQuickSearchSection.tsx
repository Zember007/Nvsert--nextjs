'use client';

import * as React from 'react';
import textSize from '@/assets/styles/base/base.module.scss';
import type { Okpd2Item } from '@/widgets/okpd/OkpdHierarchy';
import { OkpdSearchBar } from '@/widgets/okpd/OkpdSearchBar';
import { OkpdSearchResults } from '@/widgets/okpd/OkpdSearchResults';
import { useDebouncedValue } from '@/widgets/okpd/search/useDebouncedValue';
import { useOkpdSearchIndex } from '@/widgets/okpd/search/useOkpdSearchIndex';

function OkpdQuickSearchSectionImpl({ items }: { items: Okpd2Item[] }) {
  const [inputValue, setInputValue] = React.useState('');
  const debouncedInput = useDebouncedValue(inputValue, 250);
  const [committedQuery, setCommittedQuery] = React.useState('');

  const { search } = useOkpdSearchIndex(items);
  const [isPending, startTransition] = React.useTransition();
  const [results, setResults] = React.useState<Okpd2Item[]>([]);

  // авто-поиск после паузы ввода (в transition, чтобы не лагал ввод)
  React.useEffect(() => {
    startTransition(() => setCommittedQuery(debouncedInput));
  }, [debouncedInput, startTransition]);

  React.useEffect(() => {
    startTransition(() => {
      setResults(search(committedQuery, 200));
    });
  }, [committedQuery, search, startTransition]);

  const submit = React.useCallback(() => {
    // мгновенно применяем текущий ввод
    startTransition(() => setCommittedQuery(inputValue));
  }, [inputValue, startTransition]);

  return (
    <div className="flex flex-col">
      <p className={`${textSize.headerH4} text-[#34446D] border-b border-[#34446D] mb-[20px]`}>
        Быстрый поиск кода ОКПД&nbsp;2
      </p>

      <OkpdSearchBar value={inputValue} onChange={setInputValue} onSubmit={submit} />

      <span className={`${textSize.text3} font-light`}>
        например: «мебель детская», «приборы медицинские», 25.11.23
      </span>

      <OkpdSearchResults query={committedQuery} results={results} isPending={isPending} />
    </div>
  );
}

export const OkpdQuickSearchSection = React.memo(OkpdQuickSearchSectionImpl);




