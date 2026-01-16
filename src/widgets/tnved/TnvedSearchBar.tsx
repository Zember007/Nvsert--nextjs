'use client';

import * as React from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/images/svg/search.svg';
import textSize from '@/assets/styles/base/base.module.scss';

export function TnvedSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Поиск по названию или коду',
}: {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}) {
  return (
    <div className="flex rounded-[4px] border border-[#34446D] overflow-hidden mb-[10px]">
      <label className="px-[15px] py-[14px] flex-1">
        <input
          type="text"
          placeholder={placeholder}
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
        <Image src={SearchIcon} alt="search" width={18} height={18} />
        <span>Найти</span>
      </button>
    </div>
  );
}

