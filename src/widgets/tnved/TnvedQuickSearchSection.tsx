'use client';

import * as React from 'react';
import textSize from '@/assets/styles/base/base.module.scss';
import { TnvedSearchBar } from '@/widgets/tnved/TnvedSearchBar';
import { TnvedSearchResults } from '@/widgets/tnved/TnvedSearchResults';

export type TnvedSearchItem = {
  id: number;
  nodeId: number;
  path: string;
  code: string | null;
  codeNorm: string | null;
  name: string;
  level: number;
  chapter: string | null;
  hasChildren: boolean;
  parentNodeId: number | null;
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export function TnvedQuickSearchSection() {
  const [inputValue, setInputValue] = React.useState('');
  const debouncedInput = useDebouncedValue(inputValue, 300);
  const [committedQuery, setCommittedQuery] = React.useState('');

  const [isPending, startTransition] = React.useTransition();
  const [results, setResults] = React.useState<TnvedSearchItem[]>([]);

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
        const res = await fetch(`/cp/api/tnveds/search?q=${encodeURIComponent(q)}&limit=200`, {
          signal: ac.signal,
        });
        if (!res.ok) return;
        const json = await res.json();
        const data = Array.isArray(json?.data)
          ? (json.data as TnvedSearchItem[])
          : Array.isArray(json)
            ? (json as TnvedSearchItem[])
            : [];
        startTransition(() => setResults(data));
      } catch {
        // ignore
      }
    })();

    return () => ac.abort();
  }, [committedQuery, startTransition]);

  const submit = React.useCallback(() => {
    startTransition(() => setCommittedQuery(inputValue));
  }, [inputValue, startTransition]);

  return (
    <div className="flex flex-col" id="block-1">
      <p className={`${textSize.headerH4} text-[#34446D] border-b border-[#34446D] mb-[20px]`}>
        Быстрый поиск кода ТН&nbsp;ВЭД
      </p>

      <TnvedSearchBar value={inputValue} onChange={setInputValue} onSubmit={submit} />

      <span className={`${textSize.text3} font-light`}>например: «лошади», «мебель», 0101210000</span>

      <TnvedSearchResults query={committedQuery} results={results} isPending={isPending} />
    </div>
  );
}

