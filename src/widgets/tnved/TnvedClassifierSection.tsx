'use client';

import * as React from 'react';
import textSize from '@/assets/styles/base/base.module.scss';
import TnvedHierarchy, { TnvedItem } from '@/widgets/tnved/TnvedHierarchy';

const TnvedHierarchyMemo = React.memo(TnvedHierarchy);

export function TnvedClassifierSection({
  items,
  onSectionVisible,
  isSectionLoaded,
  isSectionLoading,
}: {
  items: TnvedItem[];
  onSectionVisible?: (chapter: string) => void;
  isSectionLoaded?: (chapter: string) => boolean;
  isSectionLoading?: (chapter: string) => boolean;
}) {
  return (
    <>
      <h2 id="block-classifier" className={`${textSize.headerH3}`}>
        Классификатор ТН ВЭД
      </h2>

      <TnvedHierarchyMemo
        items={items}
        onSectionVisible={onSectionVisible}
        isSectionLoaded={isSectionLoaded}
        isSectionLoading={isSectionLoading}
      />
    </>
  );
}

