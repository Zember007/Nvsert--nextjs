'use client';

import { useCallback, useMemo, useState } from 'react';
import { AsyncPhotoProvider } from 'shared/common/AsyncPhotoView';
import { useTranslation } from 'react-i18next';
import { useHeaderContext } from 'shared/contexts';
import mainDocumentsStyles from '@/assets/styles/main.module.scss';
import MainDocumentItem from './MainDocumentItem';
import { VirtualizedList } from '../utils/VirtualizedList';

const SSR_ITEMS_COUNT = 5;
const ESTIMATED_ITEM_SIZE = 520;

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

  const ssrItems = preparedNavigation.slice(0, SSR_ITEMS_COUNT);
  const virtualizedItems = preparedNavigation.slice(SSR_ITEMS_COUNT);

  return (
    <section className="section wrapper !overflow-visible">
      <div id="documents" className="absolute top-[-50px] pointer-events-none" />

      <h2 className={`${mainDocumentsStyles.headerH2} section__title`}>
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
        <div className={mainDocumentsStyles['documents-container']}>
          {ssrItems.map((item, index) => {
            const globalIndex = index;

            return (
              <MainDocumentItem
                link={item.slug}
                key={item.slug || globalIndex}
                setActive={itemSetActiveHandlers[globalIndex]}
                active={globalIndex === activeIndex}
                content={item.description}
                documentsList={item.documents}
                navigationList={item.navigationList}
                duration={item.duration}
                img={item.img}
                price={item.price}
                title={item.title}
                totalItems={totalItems}
                index={globalIndex + 1}
              />
            );
          })}

          {virtualizedItems.length > 0 && (
            <VirtualizedList
              items={virtualizedItems}
              estimatedItemSize={ESTIMATED_ITEM_SIZE}
              getItemKey={(item, index) =>
                item.slug || SSR_ITEMS_COUNT + index
              }
              renderItem={(item, index) => {
                const globalIndex = SSR_ITEMS_COUNT + index;

                return (
                  <MainDocumentItem
                    link={item.slug}
                    key={item.slug || globalIndex}
                    setActive={itemSetActiveHandlers[globalIndex]}
                    active={globalIndex === activeIndex}
                    content={item.description}
                    documentsList={item.documents}
                    navigationList={item.navigationList}
                    duration={item.duration}
                    img={item.img}
                    price={item.price}
                    title={item.title}
                    totalItems={totalItems}
                    index={globalIndex + 1}
                  />
                );
              }}
            />
          )}
        </div>
      </AsyncPhotoProvider>
    </section>
  );
};

export default AppMainDocuments;


