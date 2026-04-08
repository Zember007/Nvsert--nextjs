'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DocumentsSkeleton } from 'shared/common/SectionSkeleton';

const HomeDocumentsClient = dynamic(() => import('./HomeDocumentsClient'), {
  ssr: false,
  loading: () => <DocumentsSkeleton />,
});

const AppMainSkills = dynamic(() => import('widgets/home/AppMainSkills'), {
  ssr: false,
  loading: () => (
    <section className="section wrapper">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
      <div className="h-[420px] bg-gray-100 rounded" />
    </section>
  ),
});

export default function BelowFoldClient() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [docsReady, setDocsReady] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Defer heavy documents bundle (framer-motion + cards) until browser is idle
  useEffect(() => {
    const load = () => setDocsReady(true);
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(load, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 300);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} />
      {docsReady ? <HomeDocumentsClient /> : <DocumentsSkeleton />}
      {shouldLoad && <AppMainSkills />}
    </>
  );
}
