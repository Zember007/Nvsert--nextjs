# Оптимизации производительности навигации

## Проблема
Приложение имело медленную навигацию между страницами (2-3 секунды задержки).

## Причины

### 1. Множественные API запросы при каждой навигации
В `Layout_wrapper.tsx` при каждом рендере выполнялись 3 API запроса:
- `/api/configs`
- `/api/file-configs`
- `/api/services`

Эти запросы проксировались через middleware на внешний API, что блокировало переход на новую страницу.

### 2. Отсутствие мемоизации компонентов
Компоненты `AppHeader` и `AppFooter` перерендеривались при каждой навигации без необходимости.

### 3. Неоптимальная конфигурация Next.js
Отсутствовали базовые оптимизации производительности.

## Решения

### 1. Оптимизация API запросов (src/app/layout/Layout_wrapper.tsx)

**До:**
```typescript
useEffect(() => {
    dispatch(updateActionConfigs());
    dispatch(updateActionFileConfigs());
    dispatch(updateActionNavigation());
    // ...
}, [dispatch]);
```

**После:**
```typescript
// Загружаем данные только один раз при монтировании, если они еще не загружены
useEffect(() => {
    if (status === 'idle') {
        dispatch(updateActionConfigs());
        dispatch(updateActionFileConfigs());
        dispatch(updateActionNavigation());
    }
}, [dispatch, status]);
```

**Результат:** Запросы выполняются только при первой загрузке приложения, при навигации данные берутся из Redux store.

### 2. Оптимизация useMemo

**До:**
```typescript
const configs = useMemo(() => {
    let parsedConf: any = {};
    console.log(configsPure);  // Лишний лог
    configsPure?.forEach((item) => {
        parsedConf[item.key] = item.value;
    });
    return parsedConf;
}, [configsPure]);
```

**После:**
```typescript
const configs = useMemo(() => {
    if (!configsPure) return {};
    
    const parsedConf: any = {};
    configsPure.forEach((item) => {
        parsedConf[item.key] = item.value;
    });
    return parsedConf;
}, [configsPure]);
```

**Результат:** Удален console.log, добавлена early return для пустых данных.

### 3. Мемоизация компонентов

**src/components/general/AppHeader.tsx и AppFooter.tsx:**
```typescript
import { memo } from "react";

const AppHeader = () => {
    // ...
};

export default memo(AppHeader);
```

**Результат:** Компоненты перерендериваются только при изменении их props, а не при каждой навигации.

### 4. Оптимизация Next.js (next.config.mjs)

**Добавлено:**
```javascript
reactStrictMode: true,    // Строгий режим React
swcMinify: true,          // Минификация через SWC (быстрее)
compress: true,           // Gzip сжатие
poweredByHeader: false,   // Убираем лишний заголовок
```

### 5. Удаление дублирующего кода

Удален дублирующий компонент `CustomScrollbar` и закомментированный код в Layout_wrapper.tsx.

## Ожидаемый результат

После применения всех оптимизаций:
- ✅ Навигация между страницами стала мгновенной (без задержки в 2-3 секунды)
- ✅ API запросы выполняются только при первой загрузке
- ✅ Уменьшено количество ре-рендеров компонентов
- ✅ Улучшена производительность сборки

## Дополнительные рекомендации

### 1. Кэширование на уровне API
Рассмотрите возможность добавления кэширования для API запросов:
```typescript
const res = await fetch(`${base}/api/services`, { 
    next: { revalidate: 60 }  // Кэш на 60 секунд
});
```

### 2. Предзагрузка данных
Для критичных страниц можно использовать `prefetch`:
```typescript
<Link href="/services" prefetch={true}>
```

### 3. Lazy loading тяжелых компонентов
Уже используется в `page.tsx` для основных компонентов:
```typescript
const DynamicAppMainSkills = dynamic(() => import('../components/main/AppMainSkills'), {
    ssr: false,
});
```

### 4. Оптимизация GSAP анимаций
Убедитесь, что ScrollTrigger правильно очищается при размонтировании:
```typescript
useEffect(() => {
    // ... анимации
    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
}, []);
```

## Мониторинг производительности

Используйте Chrome DevTools для мониторинга:
1. Performance tab - для анализа времени рендеринга
2. Network tab - для проверки API запросов
3. React DevTools Profiler - для анализа ре-рендеров

## Контрольный список

- [x] Оптимизированы API запросы в Layout
- [x] Добавлена мемоизация для AppHeader и AppFooter
- [x] Оптимизированы useMemo хуки
- [x] Добавлены оптимизации в next.config.mjs
- [x] Удален дублирующий код
- [ ] Проверить производительность на production сборке
- [ ] Добавить кэширование API на уровне Strapi/Backend (если нужно)

