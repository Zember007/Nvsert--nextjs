'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (shouldLoad) return;

    const load = () => setShouldLoad(true);
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        load();
      }
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      'wheel',
      'touchstart',
      'keydown',
      'mousedown',
    ];

    window.addEventListener('scroll', onScroll, { passive: true });
    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, load, { passive: true }),
    );

    return () => {
      window.removeEventListener('scroll', onScroll);
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, load),
      );
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <HomeDocumentsClient />
      <AppMainSkills />
    </>
  );
}
