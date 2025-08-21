'use client'
import { useRef } from 'react';
import { useCustomScroll } from '@/hook/useCustomScroll';

export default function SimpleTestPage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { scrollbarRef } = useCustomScroll({
    target: 'container',
    containerRef: textareaRef,
    priorityScroll: true,
    smoothScrollFactor: 0.1,
    minWidth: 0
  });

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Простой тест приоритетного скролла</h1>
        
        {/* Контент до textarea */}
        <div className="space-y-4 mb-8">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Секция {i + 1}</h2>
              <p className="text-gray-600">
                Контент для создания скролла на странице.
              </p>
            </div>
          ))}
        </div>

        {/* Textarea с приоритетным скроллом */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Textarea с приоритетным скроллом</h2>
          <div className="relative">
            <textarea
              ref={textareaRef}
              className="w-full h-48 p-4 border border-gray-300 rounded resize-none"
              placeholder="Введите текст или используйте предзаполненный текст для тестирования скролла"
              defaultValue={`Это длинный текст для тестирования скролла в textarea.

Строка 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Строка 2: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Строка 3: Duis aute irure dolor in reprehenderit in voluptate velit esse.

Строка 4: Excepteur sint occaecat cupidatat non proident, sunt in culpa.

Строка 5: Sed ut perspiciatis unde omnis iste natus error sit voluptatem.

Строка 6: Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.

Строка 7: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.

Строка 8: Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.

Строка 9: Consectetur, adipisci velit, sed quia non numquam eius modi tempora.

Строка 10: Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.`}
            />
            <div 
              ref={scrollbarRef} 
              className="scrollbar absolute right-2 top-2 bottom-2 w-2 bg-gray-200 rounded"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Контент после textarea */}
        <div className="space-y-4 mt-8">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Дополнительная секция {i + 1}</h2>
              <p className="text-gray-600">
                Дополнительный контент после textarea для тестирования переключения скролла.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Стили для скроллбара */}
      <style jsx>{`
        .scrollbar {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
