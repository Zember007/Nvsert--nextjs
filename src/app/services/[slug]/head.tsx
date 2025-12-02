import React from 'react';
import { getNavigationDataBySlug, resolveServiceOgImageUrl } from './seo-helpers';

type HeadProps = {
  params: { slug: string };
};

export default async function Head({ params }: HeadProps) {
  const { slug } = params;

  const navigation = await getNavigationDataBySlug(slug);

  if (!navigation) return null;

  const ogImageUrl = resolveServiceOgImageUrl(navigation);
  if (!ogImageUrl) return null;

  let origin: string | null = null;

  try {
    origin = new URL(ogImageUrl).origin;
  } catch {
    origin = null;
  }

  if (!origin) return null;

  return (
    <>
      <link rel="preconnect" href={origin} crossOrigin="" />
    </>
  );
}

