import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X, Bell } from 'lucide-react';
import { NavigationItem, NavigationLevel } from '../types/navigation';

// Данные навигации согласно дизайну
const navigationData: NavigationItem[] = [
  {
    id: 'main',
    title: 'Главная',
    href: '/'
  },
  {
    id: 'services',
    title: 'Услуги',
    children: [
      {
        id: 'gost-r',
        title: 'ГОСТ Р',
        children: [
          { id: 'cert-compliance', title: 'Сертификат соответствия ГОСТ Р', href: '/services/gost-r/cert-compliance' },
          { id: 'decl-compliance', title: 'Декларация соответствия ГОСТ Р', href: '/services/gost-r/decl-compliance' },
          { id: 'cert-agro', title: 'Сертификат соответствия «Сельхозпродукт»', href: '/services/gost-r/cert-agro' }
        ]
      },
      {
        id: 'customs-union',
        title: 'Таможенный союз',
        href: '/services/customs-union'
      },
      {
        id: 'rospotr',
        title: 'Роспотребнадзор',
        href: '/services/rospotr'
      },
      {
        id: 'tech-docs',
        title: 'Тех. документация',
        href: '/services/tech-docs'
      },
      {
        id: 'iso-smk',
        title: 'ИСО (СМК)',
        href: '/services/iso-smk'
      },
      {
        id: 'certification',
        title: 'Сертификация',
        href: '/services/certification'
      }
    ]
  },
  {
    id: 'about',
    title: 'О компании',
    href: '/about'
  },
  {
    id: 'contacts',
    title: 'Контакты',
    href: '/contacts'
  }
];

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const [navigationStack, setNavigationStack] = useState<NavigationLevel[]>([
    { items: navigationData, title: 'NVSERT' }
  ]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentLevel = navigationStack[navigationStack.length - 1];
  const canGoBack = navigationStack.length > 1;

  const handleItemClick = (item: NavigationItem) => {
    if (isAnimating) return;

    if (item.children && item.children.length > 0) {
      setIsAnimating(true);
      setNavigationStack(prev => [
        ...prev,
        { 
          items: item.children!, 
          title: item.title, 
          parentId: item.id 
        }
      ]);
      
      setTimeout(() => setIsAnimating(false), 300);
    } else if (item.href) {
      console.log(`Навигация на: ${item.href}`);
      onClose();
    } else if (item.onClick) {
      item.onClick();
      onClose();
    }
  };

  const handleGoBack = () => {
    if (isAnimating || !canGoBack) return;
    
    setIsAnimating(true);
    setNavigationStack(prev => prev.slice(0, -1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Сброс навигации при закрытии меню
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setNavigationStack([{ items: navigationData, title: 'NVSERT' }]);
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Navigation Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-slate-800 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-slate-700 px-4 py-3 flex items-center justify-between border-b border-slate-600">
            {canGoBack && (
              <button
                onClick={handleGoBack}
                disabled={isAnimating}
                className="h-[50px] flex items-center"
              >
                <ChevronLeft size={18} />
                <span className="text-sm font-medium">Назад</span>
              </button>
            )}
            
            <div className={`flex items-center space-x-2 ${canGoBack ? 'absolute left-1/2 transform -translate-x-1/2' : ''}`}>
              <span className="text-white font-semibold text-lg">
                {currentLevel.title}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Bell size={18} className="text-white/70" />
              <button
                onClick={onClose}
                className="text-white/90 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-hidden">
            <div 
              ref={containerRef}
              className="h-full overflow-y-auto"
            >
              <div className="py-2">
                {currentLevel.items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    disabled={isAnimating}
                    className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-slate-700/50 transition-colors border-b border-slate-700/50 last:border-b-0 disabled:opacity-50 group"
                  >
                    <span className="text-white font-medium text-base">
                      {item.title}
                    </span>
                    
                    {item.children && item.children.length > 0 && (
                      <ChevronRight 
                        size={16} 
                        className="text-white/60 group-hover:text-white/80 transition-colors" 
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-4 space-y-3 border-t border-slate-700">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Заказать звонок
            </button>
            <button className="w-full bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Оформить заявку
            </button>
          </div>
        </div>
      </div>
    </>
  );
};