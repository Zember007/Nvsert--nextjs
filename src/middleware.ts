import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let targetUrl: string | null = null; // Определяем целевой URL
  
  // Проверяем, начинается ли путь с /api/
  if (pathname.startsWith('/api/')) {
    targetUrl = `${process.env.apiTarget}${pathname.replace('/api/', '')}`;
  }

  // Если targetUrl определен (путь начинается с /api/ или /media/)
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