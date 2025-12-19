// components/CopyItem.tsx
import type { ReactNode } from 'react';

import PromtModal from 'widgets/modals/PromtModal';
import AppMenuItem from "../AppMenuItem";

type CopyItemProps = {
  label: ReactNode;
  value: string;
  icon: ReactNode;
};

const CopyItem = ({ label, value, icon }: CopyItemProps) => (
  <PromtModal
    content={
      <div className="flex gap-[4px] items-center h-[14px]">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M17.24 0.19C17.56 0.46 17.59 0.93 17.31 1.24L6.81 13.24C6.68 13.4 6.48 13.49 6.27 13.5C6.07 13.51 5.87 13.43 5.72 13.28L1.22 8.78C0.93 8.49 0.93 8.01 1.22 7.72C1.51 7.43 1.99 7.43 2.28 7.72L6.21 11.65L16.19 0.26C16.46 -0.06 16.93 -0.09 17.24 0.19Z" fill="white" />
        </svg>
        <span className="text-[#FFF] text-[18px]">Скопировано</span>
      </div>
    }
    timer={3000}
  >
    <AppMenuItem
      className="!px-[31.5px] group"
      onClick={() => navigator.clipboard.writeText(value)}
      item={{
        href: '#',
        label: (
          <div className="relative">
            <span className="absolute top-1/2 left-[-1px] -translate-y-1/2 -translate-x-full group-hover:translate-x-0 group-hover:left-[16px] transition-all duration-200 ease">
              {icon}
            </span>
            <span className="transition-all duration-200 ease block group-hover:translate-x-[16px]">{label}</span>
          </div>
        )
      }}
      isActive={false}
    />
  </PromtModal>
);

export default CopyItem;
