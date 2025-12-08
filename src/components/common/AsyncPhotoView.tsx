'use client';

import dynamic from 'next/dynamic';

import React, { useEffect } from 'react';
import type { ComponentProps } from 'react';


const ensurePhotoViewStylesLoaded = () => {
  if (!window || (window as any).photoViewStylesLoaded) return;
  (window as any).photoViewStylesLoaded = true;

  // Динамически подключаем стили только при первом использовании
  void import('@/assets/lib/react-photo-view/dist/react-photo-view.css').then(() => {
    void import('@/assets/styles/blocks/photoviews.scss');
  });
};

type AnyProps = ComponentProps<any>;

// Базовые лениво загружаемые компоненты
const DynamicPhotoProvider = dynamic(
  () => import('@/assets/lib/react-photo-view').then((m) => m.PhotoProvider),
  {
    ssr: false,
  }
) as React.ComponentType<AnyProps>;

const DynamicPhotoView = dynamic(
  () => import('@/assets/lib/react-photo-view').then((m) => m.PhotoView),
  {
    ssr: false,
  }
) as React.ComponentType<AnyProps>;

// Обёртки, которые один раз инициализируют стили
export const AsyncPhotoProvider: React.FC<AnyProps> = (props) => {
 /*  useEffect(() => {
    ensurePhotoViewStylesLoaded();
  }, []); */

  return <DynamicPhotoProvider {...props} />;
};

export const AsyncPhotoView: React.FC<AnyProps> = (props) => {
 /*  useEffect(() => {
    ensurePhotoViewStylesLoaded();
  }, []); */

  return <DynamicPhotoView {...props} />;
};

