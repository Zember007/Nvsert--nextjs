'use client';

import dynamic from 'next/dynamic';

import type { ComponentProps } from 'react';

// Ленивая загрузка PhotoProvider
export const AsyncPhotoProvider = dynamic(
  () => import('@/assets/lib/react-photo-view').then((m) => m.PhotoProvider),
  {
    ssr: false,
  }
) as React.ComponentType<ComponentProps<any>>;

// Ленивая загрузка PhotoView
export const AsyncPhotoView = dynamic(
  () => import('@/assets/lib/react-photo-view').then((m) => m.PhotoView),
  {
    ssr: false,
  }
  
) as React.ComponentType<ComponentProps<any>>;



