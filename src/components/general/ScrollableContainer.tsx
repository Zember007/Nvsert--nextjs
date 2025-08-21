import React, { useRef } from 'react';
import CustomScrollbar from './CustomScrollbar';
import { CustomScrollOptions } from '@/hook/useCustomScroll';

interface ScrollableContainerProps extends Omit<CustomScrollOptions, 'target' | 'containerRef'> {
  children: React.ReactNode; // Любое количество дочерних элементов
  targetRef?: React.RefObject<any>; // Внешний ref для конкретного элемента
  scrollbarClassName?: string;
  scrollbarStyle?: React.CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  priorityScroll?: boolean; // Приоритетный скролл для textarea
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  targetRef, // Внешний ref для конкретного элемента
  scrollbarClassName = 'scrollbar',
  scrollbarStyle = {},
  wrapperClassName = '',
  wrapperStyle = {},
  priorityScroll = false,
  ...scrollOptions
}) => {
  const internalRef = useRef<any>(null);
  
  // Используем переданный ref или создаем внутренний
  const containerRef = targetRef || internalRef;

  const wrapperStyles: React.CSSProperties = {
    position: 'relative',
    ...wrapperStyle
  };

  // Упрощенная логика - всегда обрабатываем первого ребенка
  const processedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && index === 0) {
      // Передаем ref первому дочернему элементу
      const childElement = child as React.ReactElement<any>;
      console.log('ScrollableContainer: Processing child:', childElement.type, 'with ref:', containerRef);
      return React.cloneElement(childElement, {
        ref: containerRef,
        style: {
          ...(childElement.props.style || {}),
          // Скрываем стандартный скроллбар через CSS
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE 10+
        },
        className: `${childElement.props.className || ''} hide-native-scrollbar`.trim()
      });
    }
    return child;
  });

  console.log('ScrollableContainer: priorityScroll =', priorityScroll, 'containerRef =', containerRef);

  return (
    <div className={wrapperClassName} style={wrapperStyles}>
      {processedChildren}
      
      <CustomScrollbar
        target="container"
        containerRef={containerRef}
        className={scrollbarClassName}
        style={scrollbarStyle}
        minWidth={0}
        priorityScroll={priorityScroll}
        {...scrollOptions}
      />
      
      {/* CSS для скрытия скроллбара в WebKit браузерах */}
      <style jsx>{`
        .hide-native-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollableContainer; 