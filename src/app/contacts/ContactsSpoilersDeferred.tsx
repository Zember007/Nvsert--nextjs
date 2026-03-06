'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { ContactsPageData, ContactsRequisitesLabels } from './ClientPage';

const ContactsSpoilersClient = dynamic(() => import('./ContactsSpoilersClient'), {
  ssr: false,
});

const ContactsSpoilersDeferred = ({
  data,
  pdfHref,
  requisitesLabels,
}: {
  data: ContactsPageData;
  pdfHref: string;
  requisitesLabels: ContactsRequisitesLabels;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const el = containerRef.current;
    if (!el) {
      setShouldLoad(true);
      return;
    }

    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const load = () => {
      setShouldLoad(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(el);

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(load, { timeout: 1800 });
    } else {
      timeoutId = window.setTimeout(load, 1800);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? <ContactsSpoilersClient data={data} pdfHref={pdfHref} requisitesLabels={requisitesLabels} /> : null}
    </div>
  );
};

export default ContactsSpoilersDeferred;
