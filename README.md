# Nvsert Frontend — Next.js 16

Клиентская часть корпоративного сайта. SSR/SSG с двумя языками (ru/en), интеграция с CMS Strapi.

## Стек

- **Next.js 16 canary** (App Router, standalone build)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS 3** + **SCSS Modules**
- **i18next** + **react-i18next** (ru/en)
- **Framer Motion** + **GSAP** (анимации)
- **React Hook Form** (формы)
- **@tanstack/react-virtual** (виртуальный скролл ТНВЭД/ОКПД2)

---

## Быстрый старт

> Strapi должен быть запущен перед выполнением `generate-navigation`.

```bash
npm install
cp .env.local.example .env.local    # заполните переменные окружения
npm run generate-navigation          # генерирует src/assets/lib/navigation.json
npm run dev                          # http://localhost:3000
```

---

## Переменные окружения (`.env.local`)

| Переменная | Описание |
|-----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Основной домен, напр. `https://example.ru` |
| `NEXT_PUBLIC_BASE_URL` | Канонический URL (обычно = SITE_URL) |
| `NEXT_PUBLIC_STRAPI_BASE_PATH` | Путь Strapi на домене, обычно `/cp` |
| `NEXT_PUBLIC_STRAPI_PUBLIC_URL` | Публичный URL Strapi для медиафайлов, напр. `https://example.ru/cp` |
| `API_TARGET` | Внутренний URL Strapi API (серверная сторона), напр. `http://localhost:1337/api` |
| `UPLOADS_DIR` | Путь к загрузкам Strapi: локальный путь или `https://` URL |

> `API_TARGET` — серверная переменная (без `NEXT_PUBLIC_`). Используется в middleware для проксирования `/api/*` → Strapi. Браузер не видит этот адрес.

---

## Архитектура: Feature-Sliced Design (FSD)

Строгая однонаправленная зависимость слоёв:

```
app  →  widgets  →  features  →  entities  →  shared
```

- Слои выше могут импортировать из слоёв ниже
- Обратное направление запрещено
- Импорты между слайсами только через barrel `index.ts` (не deep-import)

### Слои проекта

```
src/
├── app/                    # Next.js App Router. Server Components по умолчанию
│   ├── [locale]/           # Локализованные страницы (/ru/*, /en/*)
│   ├── api/image/          # Route handler: прокси медиафайлов Strapi
│   └── _layout/            # Компоновка layout (ClientProvider, TypographyProvider)
│
├── widgets/                # Крупные секции страниц (Header, Footer, формы, модали)
│   ├── layout/             # AppHeader, AppFooter, навигация
│   ├── home/               # Секции главной страницы
│   ├── forms/              # Формы заявки с валидацией
│   ├── modals/             # Модальные окна (заявка, успех)
│   ├── okpd/, tnved/       # Виджеты классификаторов с виртуальным скроллом
│   └── svg/                # Библиотека SVG-иконок
│
├── features/               # Бизнес-фичи (слой зарезервирован, пока не заполнен)
│
├── entities/               # Доменные модели + API-клиенты
│   └── faq/                # Fetcher FAQ с ISR-кешированием (1 час)
│
├── shared/                 # Переиспользуемое везде
│   ├── config/             # env.ts (все переменные), i18n.ts (инициализация)
│   ├── i18n/               # static.ts (серверные переводы), client/server-locale.ts
│   ├── contexts/           # HeaderContext, NavigationContext, SimpleBarContext
│   ├── hooks/              # Кастомные хуки (useIsMac, useCustomScroll, …)
│   ├── lib/                # Утилиты: image URL builder, rich text parser
│   └── ui/                 # Button, LazyLoadSection, SliderPost, OptimizedImage
│
├── types/                  # Глобальные TypeScript типы
├── assets/
│   ├── styles/             # Глобальные SCSS стили
│   ├── lib/react-photo-view/  # Вендорный просмотрщик изображений (не редактировать)
│   └── scripts/            # generate-navigation.js (скрипт сборки)
└── locales/
    ├── ru.json             # Русские переводы
    └── en.json             # Английские переводы
```

---

## Ключевые файлы

| Файл | Роль |
|------|------|
| [src/middleware.ts](src/middleware.ts) | Locale redirect (`/ru/*`, `/en/*`) + API proxy `/api/*` → Strapi |
| [src/app/layout.tsx](src/app/layout.tsx) | Root layout: inline-script для CLS-prevention, DNS prefetch, шрифты |
| [src/app/_layout/ClientProvider.tsx](src/app/_layout/ClientProvider.tsx) | Граница Server/Client: i18n-sync, провайдеры контекстов |
| [src/app/_layout/Typography/TypographyProvider.tsx](src/app/_layout/Typography/TypographyProvider.tsx) | Адаптивные font-weight: Mac (300/400) vs Windows (350/400) |
| [src/app/api/image/route.ts](src/app/api/image/route.ts) | Прокси медиафайлов: локальный FS или remote URL, кеш 1 год |
| [src/shared/config/env.ts](src/shared/config/env.ts) | Единый источник всех env-переменных |
| [src/shared/i18n/static.ts](src/shared/i18n/static.ts) | Серверные переводы для `generateMetadata()` (без глобального i18next) |
| [src/shared/i18n/server-locale.ts](src/shared/i18n/server-locale.ts) | Чтение локали из cookie в Server Components с guard на build-time |
| [src/entities/faq/api.ts](src/entities/faq/api.ts) | ISR-fetch FAQ из Strapi (revalidate: 3600) |
| [src/assets/scripts/generate-navigation.js](src/assets/scripts/generate-navigation.js) | Build-time: генерирует navigation.json из Strapi API |

---

## Интернационализация

**Два механизма в зависимости от контекста:**

| Контекст | Механизм | Файл |
|---------|----------|------|
| Server Components, `generateMetadata()` | `tStatic(locale, 'key')` | `shared/i18n/static.ts` |
| Client Components | `useTranslation()` хук | `shared/config/i18n.ts` |

**Маршрутизация локалей:**
- Middleware (`src/middleware.ts`) добавляет prefix `/ru/` или `/en/` ко всем URL
- Локаль сохраняется в cookie `nvsert_locale` и заголовке `x-nvsert-locale`
- `getRequestLocale()` — получение локали в Server Components (`shared/i18n/server-locale.ts`)
- `getLocaleFromPathname()` — клиентский парсинг из URL (`shared/i18n/client-locale.ts`)

---

## Стилизация

**Tailwind CSS** — для layout, spacing, typography, простых interactive-состояний.

**SCSS Modules** — для сложных анимаций, многосоставных стилей, псевдоэлементов.

### Кастомные брейкпоинты (tailwind.config.js)

| Имя | Ширина | Применение |
|-----|--------|-----------|
| `xss` | 360px | Минимальная поддерживаемая ширина |
| `xs` | 480px | Маленькие телефоны |
| `s` | 540px | — |
| `xxs` | 640px | Аналог стандартного `sm` |
| `m` | 960px | Планшет |
| `l` | 1024px | Десктоп |
| `xl` | 1280px | Широкий десктоп |
| `xxl` | 1407px | 2K |
| `xxxl` | 1580px | Ultrawide |
| `max-s` | ≤519px | Только мобильные (max-width) |
| `max-l` | ≤1023px | Только до десктопа |

---

## Работа с изображениями

- `shared/lib/image/` — строит URL к изображению Strapi через `STRAPI_PUBLIC_URL`
- `src/app/api/image/route.ts` — прокси: читает файл с диска (`UPLOADS_DIR`) или делает fetch на remote URL
- `shared/ui/OptimizedImage.tsx` — обёртка над `next/image` с AVIF+WebP, lazy loading
- Blur-заглушки — SVG data URI с анимацией shimmer (не статичный квадрат)

---

## Навигация

Структура меню генерируется из Strapi API скриптом `generate-navigation.js` и сохраняется в `src/assets/lib/navigation.json`. Файл **не коммитится в git** — генерируется при каждой сборке.

```bash
npm run generate-navigation   # запустить вручную (нужен работающий Strapi)
```

---

## Скрипты

```bash
# Разработка
npm run dev                   # Dev-сервер (автоматически собирает react-photo-view)

# Сборка
npm run generate-navigation   # Обязательно перед build если изменился контент в Strapi
npm run build                 # Production build (standalone, + postbuild: sitemap)
npm run start                 # Запуск production-сервера на порту 3000

# Качество кода
npm run lint                  # ESLint (должен быть 100% чистым)
npm run typecheck             # TypeScript без emit
npm run deadcode-check        # Knip — поиск неиспользуемых экспортов

# Тестирование
npm run test:e2e              # Playwright E2E тесты (нужен запущенный сервер)
```

---

## Добавление нового контент-типа из Strapi

1. **Типы** — создайте файл в `src/types/`, напр. `src/types/article.ts`
2. **API-fetcher** — создайте `src/entities/<name>/api.ts` с ISR-кешированием
3. **Barrel** — добавьте экспорт в `src/entities/<name>/index.ts`
4. **Виджет** — используйте данные в `src/widgets/<page>/`

---

## E2E тесты

Playwright, конфигурация в `playwright.config.ts`.

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
```

Тесты лежат в директории `tests/`. Каждая новая фича должна иметь хотя бы 1–2 happy-path сценария.
