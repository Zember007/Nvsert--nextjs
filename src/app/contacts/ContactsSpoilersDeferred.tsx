'use client';

import dynamic from 'next/dynamic';
import type { ContactsPageData } from './ClientPage';

const ContactsSpoilersClient = dynamic(() => import('./ContactsSpoilersClient'), {
  ssr: false,
});

const ContactsSpoilersDeferred = ({ data, pdfHref }: { data: ContactsPageData; pdfHref: string }) => {
  return <ContactsSpoilersClient data={data} pdfHref={pdfHref} />;
};

export default ContactsSpoilersDeferred;
