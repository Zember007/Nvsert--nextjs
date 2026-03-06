const toBase64 = (value: string): string => {
  if (typeof window === 'undefined') {
    return Buffer.from(value).toString('base64');
  }
  return window.btoa(value);
};

export const getShimmerBlurDataURL = (width = 32, height = 20): string => {
  const safeWidth = Math.max(1, Math.round(width));
  const safeHeight = Math.max(1, Math.round(height));
  const svg = `
<svg width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${safeWidth}" height="${safeHeight}" fill="#e6e8ec" />
  <rect id="g" width="${safeWidth}" height="${safeHeight}" fill="url(#a)" />
  <defs>
    <linearGradient id="a" x1="0" y1="0" x2="${safeWidth}" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#e6e8ec" />
      <stop offset="0.5" stop-color="#f3f4f6" />
      <stop offset="1" stop-color="#e6e8ec" />
    </linearGradient>
  </defs>
  <animate href="#g" attributeName="x" from="-${safeWidth}" to="${safeWidth}" dur="1.2s" repeatCount="indefinite" />
</svg>`;

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
};
