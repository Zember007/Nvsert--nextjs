import React,{ useState, ReactNode, ReactElement, cloneElement } from 'react';

interface SliderWrapperProps {
  children: ReactNode;
}

// Интерфейс для пропсов дочернего элемента
interface ItemProps {
  className?: string;
  children?: ReactNode;
}

const SliderWrapper = ({ children }: SliderWrapperProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalItems = React.Children.count(children);

  const handleSlide = (direction: 'next' | 'prev') => {
    let newIndex: number;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % totalItems;
    } else {
      newIndex = (currentIndex - 1 + totalItems) % totalItems;
    }
    setCurrentIndex(newIndex);
  };

  const sliders = Array.from({ length: 5 }, (_, index) => {
    const offsets = [0, -100, -200, -300, -400]; // Соответствует left в CSS
    const delay = index > 2 ? index - 2 : 0; // Задержка для 4-го и 5-го куска

    return (
      <div className={`slider-wrap slider-wrap--${index + 1}`} key={index}>
        <div
          className="slider"
          style={{
            left: `${offsets[index]}%`,
          }}
        >
          <div
            className="slider-track"
            style={{
              transform: `translateX(${-currentIndex * (100 / totalItems)}%)`,
              transitionDelay: `${delay}s`,
            }}
          >
            {React.Children.map(children, (child, idx) => {
              if (React.isValidElement<ItemProps>(child)) {
                return cloneElement(child, {
                  className: `${child.props.className || ''} ${
                    idx === currentIndex ? 'active' : ''
                  }`,
                });
              }
              return child; // Если не элемент, возвращаем как есть
            })}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="slideshow">
      {sliders}
      <div className="controls">
        <button className="control-btn" onClick={() => handleSlide('prev')}>
          Prev
        </button>
        <button className="control-btn" onClick={() => handleSlide('next')}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SliderWrapper;