import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (req.headers.get("x-nextjs-data")) {
    return NextResponse.next();
  }

  let targetUrl: string | null = null; // Определяем целевой URL

  const apiTarget = process.env.apiTarget;

  // Если не задан apiTarget, то ничего не проксируем
  if (!apiTarget) {
    return NextResponse.next();
  }

  // Убираем завершающий слэш, чтобы не получить /apiservices и т.п.
  const normalizedTarget = apiTarget.replace(/\/$/, '');

  // Проверяем, начинается ли путь с /api/
  if (pathname.startsWith('/api/')) {
    // /api/services -> /services
    const apiPath = pathname.replace(/^\/api/, '');
    // http://localhost:1337/api + /services -> http://localhost:1337/api/services
    targetUrl = `${normalizedTarget}${apiPath}`;
  }

  // Если targetUrl определен (путь начинается с /api/)
  if (targetUrl) {
    const requestHeaders = new Headers(req.headers);

    // Добавляем заголовки
    requestHeaders.set('X-Access-Token', process.env.apiToken || '');
    requestHeaders.set('Authorization', 'Basic Y29mZmVlOmNvZmZlZQ==');

    // Перезаписываем запрос с новыми заголовками
    return NextResponse.rewrite(new URL(targetUrl, req.url), {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Если путь не начинается с /api/ или /media/, пропускаем запрос дальше
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/media/:path*'], // Указываем, для каких путей будет выполняться middleware
};