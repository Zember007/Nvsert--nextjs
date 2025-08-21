# Приоритетный скролл для textarea

## Описание

Добавлена новая функциональность `priorityScroll` в хук `useCustomScroll`, которая позволяет реализовать поведение скролла как в стандартных браузерах для элементов `textarea`.

## Как это работает

1. **Приоритет контейнера**: Когда `priorityScroll={true}`, скролл сначала происходит внутри контейнера (textarea)
2. **Переключение на страницу**: Когда контейнер доскроллен до конца или начала, скролл переключается на основную страницу
3. **Проверка фокуса**: Функциональность работает только когда textarea находится в фокусе

## Использование

### В AppTextarea (уже настроено)

```tsx
<ScrollableContainer smoothScrollFactor={0.1} priorityScroll={true}>
  <textarea ... />
</ScrollableContainer>
```

### В других компонентах

```tsx
import { useCustomScroll } from '@/hook/useCustomScroll';

const MyComponent = () => {
  const { scrollbarRef } = useCustomScroll({
    target: 'container',
    containerRef: myContainerRef,
    priorityScroll: true,
    smoothScrollFactor: 0.1
  });

  return (
    <div ref={myContainerRef}>
      <textarea />
      <div ref={scrollbarRef} className="scrollbar" />
    </div>
  );
};
```

## Опции

- `priorityScroll?: boolean` - Включает приоритетный скролл (по умолчанию `false`)
- `smoothScrollFactor?: number` - Коэффициент плавности скролла (по умолчанию `0.15`)
- `target?: 'window' | 'container'` - Цель скролла
- `containerRef?: React.RefObject<any>` - Ссылка на контейнер

## Тестирование

Для тестирования функциональности перейдите на страницу `/test-scroll`, где можно протестировать поведение скролла в textarea.

## Поведение

1. **Скролл вверх в textarea**: Работает, пока не достигнут верх textarea
2. **Скролл вниз в textarea**: Работает, пока не достигнут низ textarea  
3. **Переключение на страницу**: Происходит автоматически при достижении границ textarea
4. **Фокус**: Функциональность активна только при фокусе на textarea
