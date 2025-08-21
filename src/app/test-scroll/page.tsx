'use client'
import AppTextarea from '@/components/forms/elements/AppTextarea';
import { FormProvider, useForm } from 'react-hook-form';

export default function TestScrollPage() {
  const methods = useForm();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Тест приоритетного скролла</h1>
        
        {/* Добавляем много контента для скролла страницы */}
        <div className="space-y-4 mb-8">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Секция {i + 1}</h2>
              <p className="text-gray-600">
                Это тестовый контент для создания скролла на странице. 
                Здесь должно быть достаточно текста, чтобы страница стала прокручиваемой.
              </p>
            </div>
          ))}
        </div>

        {/* Textarea с приоритетным скроллом */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Textarea с приоритетным скроллом</h2>
          <FormProvider {...methods}>
            <AppTextarea 
              title="Введите длинный текст для тестирования скролла"
              inputName="testTextarea"
              required={false}
            />
          </FormProvider>
        </div>

        {/* Еще контент после textarea */}
        <div className="space-y-4 mt-8">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Дополнительная секция {i + 1}</h2>
              <p className="text-gray-600">
                Дополнительный контент после textarea для тестирования переключения скролла.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
