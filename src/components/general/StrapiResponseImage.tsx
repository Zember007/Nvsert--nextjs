import Image from "next/image";

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
  const small = image.formats?.small || image.formats?.thumbnail;
  const medium = image.formats?.medium;
  const large = image.formats?.large || image;



  return (
    <picture>
      {large?.url && (
        <source
          media="(min-width: 1024px)"
          srcSet={`${baseUrl}${large.url}`}
          width={large?.width}
          height={large?.height}
        />
      )}
      {medium?.url && (
        <source
          media="(min-width: 640px)"
          srcSet={`${baseUrl}${medium.url}`}
          width={medium?.width}
          height={medium?.height}
        />
      )}
      <img
        src={`${baseUrl}${small?.url}`}
        width={small?.width}
        height={small?.height}
        alt={image.alternativeText || ''}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="rounded-[8px] w-full h-full"
      />

    </picture>
  );
};