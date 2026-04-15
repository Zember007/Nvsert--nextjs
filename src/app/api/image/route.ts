/**
 * Route handler: прокси медиафайлов Strapi.
 *
 * ЗАЧЕМ: Next.js Image Optimization не умеет проксировать произвольные источники
 * без явного перечисления доменов. Этот handler унифицирует два источника:
 * - локальный FS (UPLOADS_DIR = абсолютный путь) — читает файл с диска через fs
 * - удалённый URL (UPLOADS_DIR = https://…) — делает fetch с force-cache
 *
 * Кеш-заголовок: public, max-age=31536000, immutable (1 год) — файлы в uploads
 * никогда не изменяются, только добавляются новые.
 *
 * БЕЗОПАСНОСТЬ: `..` в параметре `file` возвращает 403; локальный путь
 * дополнительно проверяется через path.resolve + startsWith (path traversal guard).
 *
 * MIME определяется по расширению файла, а не по Content-Type от upstream — это
 * работает и при прямом чтении с диска, где нет HTTP-заголовков.
 */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = process.env.UPLOADS_DIR || '/home/user_test11/test11/strapi/public/uploads';
const isRemoteUploadsSource = /^https?:\/\//i.test(UPLOADS_DIR);

const getMimeByExt = (fileName: string): string => {
  const ext = path.extname(fileName).toLowerCase();
  return ext === '.webp'
    ? 'image/webp'
    : ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.png'
        ? 'image/png'
        : ext === '.gif'
          ? 'image/gif'
          : ext === '.avif'
            ? 'image/avif'
            : 'application/octet-stream';
};

const encodePathSegments = (inputPath: string): string =>
  inputPath
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file'); // например: medium_01_0fffd11d88.webp или 2024/01/medium_01.webp
  if (!file || file.includes('..')) {
    return new NextResponse('Not allowed', { status: 403 });
  }

  if (isRemoteUploadsSource) {
    try {
      const uploadsUrl = new URL(`${UPLOADS_DIR.replace(/\/+$/, '')}/`);
      const remotePath = encodePathSegments(file);
      const remoteUrl = new URL(remotePath, uploadsUrl);
      const upstreamResponse = await fetch(remoteUrl.toString(), { cache: 'force-cache' });

      if (!upstreamResponse.ok) {
        return new NextResponse('Not found', { status: upstreamResponse.status });
      }

      const upstreamType = upstreamResponse.headers.get('content-type') || getMimeByExt(file);
      const upstreamCache =
        upstreamResponse.headers.get('cache-control') || 'public, max-age=31536000, immutable';

      return new NextResponse(upstreamResponse.body, {
        headers: {
          'Content-Type': upstreamType,
          'Cache-Control': upstreamCache,
        },
      });
    } catch {
      return new NextResponse('Not found', { status: 404 });
    }
  }

  const filePath = path.join(UPLOADS_DIR, file);
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(path.resolve(UPLOADS_DIR))) {
    return new NextResponse('Not allowed', { status: 403 });
  }

  if (!fs.existsSync(resolvedPath)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const buffer = fs.readFileSync(resolvedPath);
  const mime = getMimeByExt(file);



  return new NextResponse(Buffer.from(buffer), {
    headers: {
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
