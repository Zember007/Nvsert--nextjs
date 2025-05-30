import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let targetUrl: string | null = null; // Определяем целевой URL

  // Проверяем, начинается ли путь с /api/
  if (pathname.startsWith('/api/')) {
    targetUrl = `${process.env.apiTarget}${pathname.replace('/api/', '')}`;
  } else if (pathname.startsWith('/media/')) {
    targetUrl = `${process.env.mediaTarget}${pathname.replace('/media/', '')}`;
  }

  // Если targetUrl определен (путь начинается с /api/ или /media/)
  if (targetUrl) {
    const requestHeaders = new Headers(req.headers);

    // Используем переменные окружения для токенов
    const accessToken = process.env.API_ACCESS_TOKEN;

    if (accessToken) {
      requestHeaders.set('X-Access-Token', accessToken);
    }

    requestHeaders.set('Authorization', `Basic Y29mZmVlOmNvZmZlZQ==`);

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