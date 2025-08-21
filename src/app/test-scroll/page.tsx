'use client'
import AppTextarea from '@/components/forms/elements/AppTextarea';
import { FormProvider, useForm } from 'react-hook-form';

export default function TestScrollPage() {
  const methods = useForm({
    defaultValues: {
      testTextarea: `Это длинный текст для тестирования скролла в textarea.

Строка 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Строка 2: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Строка 3: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Строка 4: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Строка 5: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

Строка 6: Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Строка 7: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.

Строка 8: Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.

Строка 9: Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Строка 10: Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

Строка 11: Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.

Строка 12: Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos.

Строка 13: Ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.

Строка 14: Occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

Строка 15: Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.

Строка 16: Quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Строка 17: Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint.

Строка 18: Et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.

Строка 19: Alias consequatur aut perferendis doloribus asperiores repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.

Строка 20: Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
    }
  });

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Тест приоритетного скролла</h1>
        
        {/* Добавляем много контента для скролла страницы */}
        <div className="space-y-4 mb-8">
          {Array.from({ length: 10 }, (_, i) => (
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
              className="test-textarea"
            />
          </FormProvider>
        </div>

        {/* Еще контент после textarea */}
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

      {/* Стили для увеличения высоты textarea в тесте */}
      <style jsx>{`
        .test-textarea {
          height: 200px !important;
          min-height: 200px !important;
        }
      `}</style>
    </div>
  );
}
