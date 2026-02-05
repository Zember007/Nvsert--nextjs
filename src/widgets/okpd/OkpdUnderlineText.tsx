'use client';

import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import stylesBtn from '@/assets/styles/base/base.module.scss';

export interface OkpdUnderlineTextProps {
    /** Текст для отображения */
    text: string;
    /** Дополнительные CSS-классы для типографики (размер шрифта, вес и т.д.) */
    className?: string;
    /** Активное/выбранное состояние — линия отображается сразу */
    active?: boolean;
}

interface LineRect {
    left: number;
    width: number;
    top: number;
}

/**
 * Компонент для текста с анимированным подчеркиванием в стиле lineAfter.
 * Поддерживает многострочный текст — линия "уходит" на каждую строку.
 * Используется внутри кнопок ОКПД иерархии.
 */
export default function OkpdUnderlineText({
    text,
    className = '',
    active = false,
}: OkpdUnderlineTextProps) {
    const textRef = useRef<HTMLSpanElement>(null);
    const [lineRects, setLineRects] = useState<LineRect[]>([]);

    const measureLines = useCallback(() => {
        const el = textRef.current;
        if (!el) return;

        // Создаём Range для всего текстового содержимого
        const textNode = el.firstChild;
        if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
            setLineRects([]);
            return;
        }

        const range = document.createRange();
        range.selectNodeContents(textNode);

        // Получаем прямоугольники для каждой видимой строки
        const rects = range.getClientRects();
        if (rects.length === 0) {
            setLineRects([]);
            return;
        }

        // Координаты контейнера для преобразования в относительные
        const containerRect = el.getBoundingClientRect();

        // Преобразуем в относительные координаты
        const lines: LineRect[] = [];
        for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            lines.push({
                left: r.left - containerRect.left,
                width: r.width,
                // top от верха контейнера до низа строки (где будет линия)
                top: r.bottom - containerRect.top,
            });
        }

        setLineRects(lines);
    }, []);

    // Измеряем при монтировании и изменении текста
    useLayoutEffect(() => {
        measureLines();
    }, [measureLines, text]);

    // Слушаем resize для пересчёта строк
    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            measureLines();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [measureLines]);

    const isMultiline = lineRects.length > 1;
    const totalLines = lineRects.length;
    // Шаг задержки между линиями (в мс)
    const delayStep = 50;

    return (
        <span
            ref={textRef}
            className={[
                className,
                stylesBtn.lineAfter,
                isMultiline ? stylesBtn.multiline : '',
                active ? stylesBtn.active : '',
            ].filter(Boolean).join(' ')}
            style={isMultiline ? { position: 'relative', display: 'inline' } : undefined}
        >
            {text}
            {/* Отдельные линии для каждой строки текста (только в многострочном режиме) */}
            {isMultiline && lineRects.map((line, idx) => {
                // Задержка: нижняя линия (последняя) начинает первой (delay=0),
                // верхняя линия (первая) начинает последней
                const delay = (totalLines - 1 - idx) * delayStep;
                return (
                    <span
                        key={idx}
                        aria-hidden
                        className={stylesBtn.lineAfterLine}
                        style={{
                            position: 'absolute',
                            left: `${line.left}px`,
                            width: `${line.width}px`,
                            top: `${line.top}px`,
                            height: '0',
                            borderBottom: '1px solid #34446D',
                            pointerEvents: 'none',
                            transitionDelay: `${delay}ms`,
                        }}
                    />
                );
            })}
        </span>
    );
}
