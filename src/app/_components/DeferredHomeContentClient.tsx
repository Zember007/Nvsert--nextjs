'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { FaqItem } from '@/types/faq';

const AppMainContent = dynamic(() => import('widgets/home/AppMainContent'), {
  ssr: false,
  loading: () => null,
});

export default function DeferredHomeContentClient({ faqs }: { faqs: FaqItem[] }) {
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

    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, load, { passive: true }),
    );
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, load),
      );
      window.removeEventListener('scroll', onScroll);
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    return null;
  }

  return <AppMainContent faqs={faqs} />;
}
