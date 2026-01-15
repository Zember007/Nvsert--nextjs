'use client';

import * as React from 'react';
import textSize from '@/assets/styles/base/base.module.scss';
import OkpdHierarchy, { Okpd2Item } from '@/widgets/okpd/OkpdHierarchy';

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
  return (
    <>
      <h2 id="block-2" className={`${textSize.headerH3}`}>Классификатор ОКПД 2</h2>
  

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


