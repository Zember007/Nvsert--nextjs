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
        src={`${baseUrl}${small?.url}`}
        alt={image.alternativeText || ''}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="rounded-[8px]"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />
    </picture>
  );
};