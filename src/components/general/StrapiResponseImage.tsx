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
  

  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={`${baseUrl}${image.formats?.large?.url}`} />
      <source media="(min-width: 360px)" srcSet={`${baseUrl}${image.formats?.medium?.url}`} />
      <img
        src={`${baseUrl}${image.formats?.small?.url}`}
        alt={image.alternativeText || ''}
        width={image.formats?.large?.width}
        height={image.formats?.large?.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className="w-full h-auto rounded-[8px]"
      />
    </picture>
  );
};