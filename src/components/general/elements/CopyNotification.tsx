import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CopyNotificationProps {
  isVisible: boolean;
  onHide: () => void;
  duration?: number;
  position?: { x: number; y: number } | null;
}

const CopyNotification = ({ isVisible, onHide, duration = 3000, position }: CopyNotificationProps) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onHide();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, onHide, duration]);

  if (!isVisible || !position) return null;

  return (
    <div 
      key={`${position.x}-${position.y}`}
      className="fixed z-50 animate-copy-notification"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="flex items-center gap-2 bg-[#00000080] backdrop-blur-[20px] rounded-[4px] px-4 py-3 text-white">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M17.2439 0.185578C17.5556 0.458339 17.5872 0.932161 17.3144 1.24389L6.81443 13.2439C6.67774 13.4001 6.48242 13.4927 6.27496 13.4996C6.0675 13.5065 5.86645 13.4271 5.71967 13.2803L1.21967 8.78034C0.926777 8.48745 0.926777 8.01257 1.21967 7.71968C1.51256 7.42679 1.98744 7.42679 2.28033 7.71968L6.21347 11.6528L16.1856 0.256132C16.4583 -0.0555957 16.9322 -0.0871838 17.2439 0.185578Z" 
            fill="white" 
          />
        </svg>
        <span className="text-[18px]">{t("copied")}</span>
      </div>
    </div>
  );
};

export default CopyNotification; 