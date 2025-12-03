'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import '@/assets/styles/sections/main/animation/documents.scss';
import '@/assets/styles/sections/main/main-documents.scss';
import { AsyncPhotoProvider } from '@/components/common/AsyncPhotoView';
import { useTranslation } from 'react-i18next';
import { useHeaderContext } from '../../contexts/HeaderContext';
import textSize from '@/assets/styles/base/text-size.module.scss';

const MainDocumentItem = dynamic(
  () => import('./MainDocumentItem'),
  {
    ssr: false,
  },
);

const AppMainDocuments = () => {
  const [activeIndex, setActive] = useState<number | null>(null);
  const { t } = useTranslation();
  const { initialNavigation: navigation } = useHeaderContext();

  const totalItems = navigation.length || 0;

  const preparedNavigation = useMemo(
    () =>
      navigation.map((item) => ({
        ...item,
        navigationList:
          item.content?.map((list: any, contentIndex: number) => ({
            id: contentIndex,
            title: list.heading,
          })) || [],
      })),
    [navigation],
  );

  const setActiveHandlers = useCallback((index: number, value: boolean) => {
    setActive(value ? index : null);
  }, []);

  const itemSetActiveHandlers = useMemo(
    () =>
      preparedNavigation.map((_, index) => (value: boolean) =>
        setActiveHandlers(index, value),
      ),
    [preparedNavigation, setActiveHandlers],
  );

  return (
    <section className="section wrapper !overflow-visible">
      <div id="documents" className="absolute top-[-50px] pointer-events-none" />

      <h2 className={`${textSize.headerH2} section__title`}>
        {t('docs.heading')}
      </h2>

      <AsyncPhotoProvider
        maskOpacity={0.4}
        maskClassName="blurred-mask"
        speed={() => 0}
        onIndexChange={(index: number) => {
          setActive(index);
        }}
        maskClosable={false}
      >
        <div className="documents-container">
          {preparedNavigation.map((item, index) => (
            <MainDocumentItem
              link={item.slug}
              key={item.slug || index}
              setActive={itemSetActiveHandlers[index]}
              active={index === activeIndex}
              content={item.description}
              documentsList={item.documents}
              navigationList={item.navigationList}
              duration={item.duration}
              img={item.img}
              price={item.price}
              title={item.title}
              totalItems={totalItems}
              index={index + 1}
            />
          ))}
        </div>
      </AsyncPhotoProvider>
    </section>
  );
};

export default AppMainDocuments;


