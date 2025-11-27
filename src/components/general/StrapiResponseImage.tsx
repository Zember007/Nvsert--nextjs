export const StrapiResponsiveImage = ({ 
  image, 
  baseUrl, 
  priority = false 
}: { 
  image: any, 
  baseUrl: string,
  priority?: boolean 
}) => {
  if (!image) return null;

  // Используем более лёгкие форматы на мобильных
  const small = image.formats?.small || image.formats?.thumbnail || image;
  const medium = image.formats?.medium;
  const large = image.formats?.large;

  const getDimensions = () => {
    if (small?.width && small?.height) {
      return { width: small.width, height: small.height };
    }
    if (medium?.width && medium?.height) {
      return { width: medium.width, height: medium.height };
    }
    if (large?.width && large?.height) {
      return { width: large.width, height: large.height };
    }
    return { width: image.width || 0, height: image.height || 0 };
  };

  const { width, height } = getDimensions();

  return (
    <picture>
      {large?.url && (
        <source
          media="(min-width: 1024px)"
          srcSet={`${baseUrl}${large.url}`}
        />
      )}
      {medium?.url && (
        <source
          media="(min-width: 640px)"
          srcSet={`${baseUrl}${medium.url}`}
        />
      )}
      <img
        src={`${baseUrl}${small?.url || image.url}`}
        alt={image.alternativeText || ''}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        sizes="(max-width: 640px) 100vw, 800px"
        className="rounded-[8px]"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />
    </picture>
  );
};