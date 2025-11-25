import localFont from 'next/font/local';

// Локальный Roboto, файлы лежат в public/fonts/*.woff2
// Путь должен быть ОТНОСИТЕЛЬНЫМ к этому файлу (src/app/_fonts/robotoLocal.ts)
// src/app/_fonts -> ../../../public/fonts

export const robotoLocal = localFont({
  src: [
    {
      path: '../../../public/fonts/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});


