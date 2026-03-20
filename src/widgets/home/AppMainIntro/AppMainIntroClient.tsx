'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from 'shared/ui';
import { useHeaderContext } from 'shared/contexts/contexts/HeaderContext';
import { filterPrepositions } from '../../../shared/lib';

const CountUp = dynamic(() => import('../../layout/countUp'), {
  ssr: false,
});

const AppMainIntroBadge = ({
  title,
  description,
  side,
  enableAnimation,
}: {
  title: string;
  description: string;
  side: 'left' | 'right';
  enableAnimation: boolean;
}) => {
  const parseCounter = (rawValue: string): { value: number; suffix: string } => {
    const normalized = rawValue.replace(/\s/g, '');
    const match = normalized.match(/(\d+(?:\.\d+)?)([+%]?)/);
    if (!match) return { value: 0, suffix: '' };

    return {
      value: parseFloat(match[1]),
      suffix: match[2] || '',
    };
  };

  return (
    <div
      className={`flex flex-col gap-[20px] ${side === 'left' ? 'pl-[10px] border-l border-l-[#34446D]' : 'pr-[10px] border-r border-r-[#34446D] text-right'} text-[#34446D] font-light`}
    >
      <span className="text-[40px] -my-[2%]">
        {(() => {
          const { value, suffix } = parseCounter(title);
          if (!enableAnimation) {
            return <span>{title}</span>;
          }

          return (
            <>
              <CountUp to={value} duration={0.5} className="inline-block" />
              {suffix && <span>{suffix}</span>}
            </>
          );
        })()}
      </span>
      <span className="text-[16px] max-w-[170px] -my-[2%] text-black">{filterPrepositions(description)}</span>
    </div>
  );
};

export default function AppMainIntroClient({ submitLabel }: { submitLabel: string }) {
  const { openDefaultModal } = useHeaderContext();
  const [enableBadgeAnimations, setEnableBadgeAnimations] = useState(false);

  useEffect(() => {
    const requestIdle = window.requestIdleCallback;
    const cancelIdle = window.cancelIdleCallback;

    if (requestIdle) {
      const idleId = requestIdle(() => setEnableBadgeAnimations(true), { timeout: 1500 });
      return () => cancelIdle(idleId);
    }

    const timer = window.setTimeout(() => setEnableBadgeAnimations(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex justify-between gap-[20px] items-center">
        <div className="flex flex-col gap-[80px]">
          <AppMainIntroBadge
            title="15+"
            description="Лет на рынке сертификации"
            side="left"
            enableAnimation={enableBadgeAnimations}
          />
          <AppMainIntroBadge
            title="75+"
            description="Опытных экспертов в команде"
            side="left"
            enableAnimation={enableBadgeAnimations}
          />
        </div>
        <div className="h-[400px]" />
        <div className="flex flex-col gap-[80px]">
          <AppMainIntroBadge
            title="99%"
            description="Заказов выполняем раньше срока"
            side="right"
            enableAnimation={enableBadgeAnimations}
          />
          <AppMainIntroBadge
            title="10 000+"
            description="Компаний доверяют нам работу"
            side="right"
            enableAnimation={enableBadgeAnimations}
          />
        </div>
      </div>

      <Button
        wrapperClassName="mx-auto"
        onClick={() => openDefaultModal('orderForm')}
        label={submitLabel}
      />
    </>
  );
}
