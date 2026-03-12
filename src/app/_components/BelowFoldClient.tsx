'use client';

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
  return (
    <>
      <HomeDocumentsClient />
      <AppMainSkills />
    </>
  );
}
