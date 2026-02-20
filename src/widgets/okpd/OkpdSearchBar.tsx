'use client';

import * as React from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/images/svg/search.svg';
import { useTranslation } from 'react-i18next';
import textSize from '@/assets/styles/base/base.module.scss';

export function OkpdSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
}: {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  const resolvedPlaceholder = placeholder ?? t('okpd.search.placeholder');

  return (
    <div className="flex rounded-[4px] border border-[#34446D] overflow-hidden mb-[10px]">
      <label className="px-[15px] py-[14px] flex-1">
        <input
          type="text"
          placeholder={resolvedPlaceholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit();
          }}
          className={`${textSize.text1} w-full placeholder:text-black/50 h-full outline-none`}
        />
      </label>
      <button
        type="button"
        onClick={onSubmit}
        className="text-[20px] py-[16px] px-[15px] bg-[#34446D] font-normal text-[#FFF] flex items-center gap-[10px]"
      >
        <Image src={SearchIcon} alt="search" width={18} height={18} unoptimized={true} />
        <span>{t('okpd.search.submit')}</span>
      </button>
    </div>
  );
}


