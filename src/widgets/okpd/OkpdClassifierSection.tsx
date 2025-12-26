'use client';

import * as React from 'react';
import textSize from '@/assets/styles/base/base.module.scss';
import OkpdHierarchy, { Okpd2Item } from '@/widgets/okpd/OkpdHierarchy';

const OkpdHierarchyMemo = React.memo(OkpdHierarchy);

function OkpdClassifierSectionImpl({ items }: { items: Okpd2Item[] }) {
  return (
    <>
      <h2 className={`${textSize.headerH3}`}>Классификатор ОКПД 2</h2>
      <p className={`${textSize.text2} font-normal text-[#93969D]`}>
        РАЗДЕЛ&nbsp;A&nbsp;— ПРОДУКЦИЯ СЕЛЬСКОГО, ЛЕСНОГО И&nbsp;РЫБНОГО ХОЗЯЙСТВА
      </p>

      <OkpdHierarchyMemo items={items} />
    </>
  );
}

export const OkpdClassifierSection = React.memo(OkpdClassifierSectionImpl);


