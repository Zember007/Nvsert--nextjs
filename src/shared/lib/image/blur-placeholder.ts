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
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="${safeWidth}" y2="${safeHeight}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#d9e2ec" />
      <stop offset="0.45" stop-color="#e8edf3" />
      <stop offset="1" stop-color="#d4ddea" />
    </linearGradient>
    <linearGradient id="shine" x1="-${safeWidth}" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="rgba(255,255,255,0)" />
      <stop offset="0.5" stop-color="rgba(255,255,255,0.55)" />
      <stop offset="1" stop-color="rgba(255,255,255,0)" />
    </linearGradient>
    <filter id="blur" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="0.7" />
    </filter>
    <filter id="noise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.04" />
      </feComponentTransfer>
    </filter>
  </defs>

  <rect width="${safeWidth}" height="${safeHeight}" fill="url(#base)" />
  <rect id="g" width="${safeWidth}" height="${safeHeight}" fill="url(#shine)" filter="url(#blur)" />
  <rect width="${safeWidth}" height="${safeHeight}" filter="url(#noise)" />

  <circle cx="${Math.max(2, Math.round(safeWidth * 0.2))}" cy="${Math.max(2, Math.round(safeHeight * 0.35))}" r="${Math.max(3, Math.round(Math.min(safeWidth, safeHeight) * 0.22))}" fill="rgba(168, 194, 255, 0.2)" />
  <circle cx="${Math.max(2, Math.round(safeWidth * 0.8))}" cy="${Math.max(2, Math.round(safeHeight * 0.7))}" r="${Math.max(3, Math.round(Math.min(safeWidth, safeHeight) * 0.28))}" fill="rgba(255, 209, 184, 0.2)" />

  <animate href="#g" attributeName="x" from="-${safeWidth}" to="${safeWidth}" dur="1.4s" repeatCount="indefinite" />
</svg>`;

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
};
