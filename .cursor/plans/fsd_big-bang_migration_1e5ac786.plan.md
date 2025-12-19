---
name: FSD big-bang migration
overview: "Приведём весь Next.js (App Router) проект к правилам из docs/architecture.md: FSD-слои, публичные API, единый стиль импортов и вывод кода из legacy-папок с массовым обновлением импортов и усилением ESLint-гардов."
todos:
  - id: inventory-map
    content: Составить карту миграции legacy→FSD (components/hook/config) и определить целевые срезы/границы
    status: pending
  - id: add-public-api
    content: Добавить/дополнить public API (`index.ts`) для `shared/*` и всех срезов `entities/features/widgets`
    status: pending
    dependencies:
      - inventory-map
  - id: move-legacy-folders
    content: Перенести код из `src/components`, `src/hook`, `src/config` в соответствующие FSD-слои с минимально осмысленной декомпозицией
    status: pending
    dependencies:
      - add-public-api
  - id: rewrite-imports
    content: "Массово привести импорты к правилам: FSD через `shared/*`/`entities/*`/… и без deep-imports в чужие внутренности"
    status: pending
    dependencies:
      - move-legacy-folders
  - id: eslint-guards
    content: Усилить `eslint.config.mjs` (no-restricted-imports) под public API + запрет legacy и `@/shared`-стиля для FSD
    status: pending
    dependencies:
      - rewrite-imports
  - id: verify-build
    content: Пройти типы/линт/сборку и поправить client/server boundary проблемы
    status: pending
    dependencies:
      - eslint-guards
---

# Миграция всего приложения под FSD + Public API

## Что уже сделано (проверено)
- **TypeScript strict включён** в `tsconfig.json`.
- **Алиасы FSD-слоёв уже заведены**: `app/*`, `shared/*`, `entities/*`, `features/*`, `widgets/*` (`tsconfig.json`).
- **ESLint уже ограничивает legacy-импорты**: запрет `@/components/*` в `eslint.config.mjs`.
- **Есть первые public API**: `src/shared/ui/index.ts`, `src/shared/contexts/index.ts`, `src/entities/faq/index.ts`.

## Ключевые решения (зафиксировано)
- **Стратегия**: big-bang миграция.
- **Разрешены переезды/переименования** файлов/папок, при условии что сборка/линт проходят.
- **Стиль импортов (по `docs/architecture.md`)**:
  - FSD-слои: `shared/*`, `entities/*`, `features/*`, `widgets/*`, `app/*`
  - тех.корень: `@/types/*`, `@/assets/*` (и при необходимости другие технические корни)
  - перестаём использовать `@/shared/*`, `@/entities/*` и т.п.

## План работ

## 1) Инвентаризация и целевая карта слоёв
- Составить карту “что куда переезжает” для legacy:
  - `src/hook/*` → `src/shared/hooks/*` (частично уже есть, нужно слить и унифицировать)
  - `src/config/*` → `src/shared/config/*` (env/настройки) и/или `src/app/providers/*` (wiring)
  - `src/components/*` → разнести по:
    - `src/shared/ui/*` (атомарные UI/утилитарные компоненты)
    - `src/widgets/*` (крупные композиции UI)
    - `src/features/*` (законченные пользовательские возможности)
    - `src/entities/*` (доменные модели/типы/запросы и связанная логика)
- Зафиксировать “композиционный корень” (провайдеры/DI) в `src/app/_layout/*` и при необходимости вынести в `src/app/providers/*`.

## 2) Public API (barrels) для всех слоёв
- Добавить/дополнить `index.ts` в каждом публичном сегменте:
  - `shared/hooks/index.ts`, `shared/lib/index.ts`, `shared/config/index.ts`, `shared/ui/index.ts`, `shared/contexts/index.ts`
  - `entities/<slice>/index.ts`, `features/<slice>/index.ts`, `widgets/<slice>/index.ts`
- Запретить “ныряние” внутрь модулей: потребители импортируют только из `…/index.ts`.

## 3) Массовая миграция файлов (big-bang)
- Перенести файлы из `src/hook`, `src/config`, `src/components` в целевые FSD-срезы (с нормальным неймингом и дроблением слишком “толстых” модулей).
- Параллельно:
  - вычищать “магические” константы в именованные константы
  - выносить форматирование/валидацию в чистые функции `shared/lib/*`
  - следить за Server/Client boundaries в `src/app/**` ("use client" только локально)

## 4) Унификация импортов во всём проекте
- Массово заменить:
  - `@/shared/...` → `shared/...`
  - `@/entities/...` → `entities/...` и т.д.
  - “глубокие” импорты из `shared/*` и `entities/*` → на импорты из public API (`index.ts`)
- Оставить `@/types/*` и `@/assets/*` как технические импорты.

## 5) Усиление ESLint гардов под вашу архитектуру
- В `eslint.config.mjs` расширить `no-restricted-imports`:
  - запрет `@/shared/*`, `@/entities/*`, `@/features/*`, `@/widgets/*`, `@/app/*`
  - запрет deep-imports вида `shared/**/**` (кроме разрешённых публичных entrypoints) и аналогично для `entities/features/widgets`
  - запрет новых импортов из legacy-папок (например `@/hook/*`, `@/config/*`, `@/components/*` и/или прямых относительных путей)
- При необходимости добавить исключения (например, для `shared/ui/*` если там принято экспортировать компоненты напрямую) — но предпочтительно через баррели.

## 6) Проверки и контроль качества
- Прогнать TypeScript проверку и Next lint/build; исправить регрессии по типам, путям, client/server.
- Проверить критичные роуты App Router (особенно `src/app/services/**`, т.к. там сейчас смешаны legacy-импорты и разные стили алиасов).

## 7) Документация
- Обновить `docs/architecture.md` (если потребуется) краткой таблицей: “куда класть новый код” и “какие импорты допустимы”.

### Затронутые ключевые места (уже замечено)
- `src/app/services/**` сейчас зависит от legacy `src/components/services/**` и смешивает `@/…` и `shared/…` импорты — это станет хорошим первым кандидатом для миграции домена в FSD.
- В проекте много импортов `@/shared/*` (их будем приводить к `shared/*`).
