'use client';

import dynamic from 'next/dynamic';

import React from 'react';
import type { ComponentProps } from 'react';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';
import '@/assets/styles/blocks/photoviews.scss';

type AnyProps = ComponentProps<any>;

// Базовые лениво загружаемые компоненты
const DynamicPhotoProvider = dynamic(
  () => import('@/assets/lib/react-photo-view').then((m) => m.PhotoProvider),
  {
    ssr: false
  }
) as React.ComponentType<AnyProps>;

const DynamicPhotoView = dynamic(
  () => import('@/assets/lib/react-photo-view').then((m) => m.PhotoView),
  {
    ssr: false
  }
) as React.ComponentType<AnyProps>;

// Обёртки для photo-view
export const AsyncPhotoProvider: React.FC<AnyProps> = (props) => {
  return <DynamicPhotoProvider {...props} />;
};

export const AsyncPhotoView: React.FC<AnyProps> = (props) => {


  return <DynamicPhotoView {...props} />;

};

