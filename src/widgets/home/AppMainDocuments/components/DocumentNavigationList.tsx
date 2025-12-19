import { FC, memo } from 'react';

import { DotNavItem } from 'widgets/layout';
import { MainDocumentItemProps } from '@/types/documents';

export interface DocumentNavigationListProps {
  navigationList: MainDocumentItemProps['navigationList'];
  // оставляем any, т.к. DotNavItem сам типизируется внутри
  onNavigationClick: (item: any, event: any) => void;
}

export const DocumentNavigationList: FC<DocumentNavigationListProps> = memo(
  ({ navigationList, onNavigationClick }) => (
    <div className="flex flex-col gap-[20px]">
      {navigationList.map((item, index) => (
        <DotNavItem
          key={index}
          item={item}
          index={index}
          onClick={onNavigationClick}
          disabledPadding={true}
        />
      ))}
    </div>
  ),
);

DocumentNavigationList.displayName = 'DocumentNavigationList';


