import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = '/var/www/html/strapi/public/uploads';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file'); // например: medium_01_0fffd11d88.webp или 2024/01/medium_01.webp

  if (!file || file.includes('..')) {
    return new NextResponse('Not allowed', { status: 403 });
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
  const ext = path.extname(file).toLowerCase();
  const mime =
    ext === '.webp'
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

  return new NextResponse(Buffer.from(buffer), {
    headers: {
      'Content-Type': mime,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
