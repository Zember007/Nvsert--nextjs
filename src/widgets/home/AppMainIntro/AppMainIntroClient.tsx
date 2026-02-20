'use client';

import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui';
import { useHeaderContext } from 'shared/contexts/contexts/HeaderContext';
import CountUp from '../../layout/countUp';

const AppMainIntroBadge = ({
  title,
  description,
  side,
}: {
  title: string;
  description: string;
  side: 'left' | 'right';
}) => {
  const parseProcent = (procent: string): { value: number; suffix: string } => {
    const match = procent.match(/(\d+(?:\.\d+)?)([+%]?)/);
    if (match) {
      return {
        value: parseFloat(match[1]),
        suffix: match[2] || '',
      };
    }
    return { value: 0, suffix: '' };
  };

  return (
    <div
      className={`flex flex-col gap-[20px] ${side === 'left' ? 'pl-[10px] border-l border-l-[#34446D]' : 'pr-[10px] border-r border-r-[#34446D] text-right'} text-[#34446D] font-light`}
    >
      <span className="text-[40px] -my-[2%]">
        {(() => {
          const { value, suffix } = parseProcent(title);
          return (
            <>
              <CountUp to={value} duration={0.5} className="inline-block" />
              {suffix && <span>{suffix}</span>}
            </>
          );
        })()}
      </span>
      <span className="text-[16px] max-w-[170px] -my-[2%]">{description}</span>
    </div>
  );
};

export default function AppMainIntroClient() {
  const { t } = useTranslation();
  const { openDefaultModal } = useHeaderContext();

  return (
    <>
      <div className="flex justify-between gap-[20px] items-center">
        <div className="flex flex-col gap-[80px]">
          <AppMainIntroBadge
            title="15+"
            description="Лет на рынке сертификации"
            side="left"
          />
          <AppMainIntroBadge
            title="75+"
            description="Опытных экспертов в команде"
            side="left"
          />
        </div>
        <div className="h-[400px]" />
        <div className="flex flex-col gap-[80px]">
          <AppMainIntroBadge
            title="99%"
            description="Заказов выполняем раньше срока"
            side="right"
          />
          <AppMainIntroBadge
            title="10 000+"
            description="Компаний доверяют нам работу"
            side="right"
          />
        </div>
      </div>

      <Button
        wrapperClassName="mx-auto"
        onClick={() => openDefaultModal('orderForm')}
        label={t('form.buttons.submitApplication')}
      />
    </>
  );
}
