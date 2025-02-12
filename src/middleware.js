
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  let targetUrl = null; // Определяем целевой URL
  console.log("apiTarget:", process.env.apiTarget); // Добавьте эти строки
  console.log("apiToken:", process.env.apiToken); 

  // Проверяем, начинается ли путь с /api/
  if (pathname.startsWith('/api/')) {
    targetUrl = `${process.env.apiTarget}${pathname.replace('/api/', '')}`;
  } else if (pathname.startsWith('/media/')) {
    targetUrl = `${process.env.mediaTarget}${pathname.replace('/media/', '')}`;
  }

  // Если targetUrl определен (путь начинается с /api/ или /media/)
  if (targetUrl) {
    const requestHeaders = new Headers(req.headers);

    // Добавляем заголовки
    requestHeaders.set('X-Access-Token', process.env.apiToken);
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