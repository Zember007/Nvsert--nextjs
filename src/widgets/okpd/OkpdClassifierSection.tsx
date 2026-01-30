'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import textSize from '@/assets/styles/base/base.module.scss';
import OkpdHierarchy, { Okpd2Item } from 'widgets/okpd/OkpdHierarchy';

const OkpdHierarchyMemo = React.memo(OkpdHierarchy);

function OkpdClassifierSectionImpl({
  items,
  onSectionVisible,
  isSectionLoaded,
  isSectionLoading,
}: {
  items: Okpd2Item[];
  onSectionVisible?: (section: string) => void;
  isSectionLoaded?: (section: string) => boolean;
  isSectionLoading?: (section: string) => boolean;
}) {
  const { t } = useTranslation();
  return (
    <>
      <h2 id="block-2" className={`${textSize.headerH3}`}>{t('okpd.classifier.title')}</h2>
  

      <OkpdHierarchyMemo
        items={items}
        onSectionVisible={onSectionVisible}
        isSectionLoaded={isSectionLoaded}
        isSectionLoading={isSectionLoading}
      />
    </>
  );
}

export const OkpdClassifierSection = React.memo(OkpdClassifierSectionImpl);


