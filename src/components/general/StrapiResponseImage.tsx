export const StrapiResponsiveImage = ({ image, baseUrl }: { image: any, baseUrl: string }) => {
    if (!image) return null;
  
    return (
      <picture> 
        <source media="(min-width: 1024px)" srcSet={`${baseUrl}${image.url}`} />
        <source media="(min-width: 640px)" srcSet={`${baseUrl}${image.formats?.medium?.url}`} />
        <img
          src={`${baseUrl}${image.formats?.small?.url}`}
          alt={image.alternativeText || ''}
          width={image.width || 630}
          height={image.height || 300}
          className="w-full h-auto"
        />
      </picture>
    );
  };