import { getStrapiImageApiPath } from "shared/lib/strapi-image";

export const StrapiResponsiveImage = ({
  image,
  baseUrl = "",
  priority = false
}: {
  image: any,
  baseUrl?: string,
  priority?: boolean
}) => {
  if (!image) return null;

  const small = image.formats?.small || image.formats?.thumbnail;
  const medium = image.formats?.medium;
  const large = image.formats?.large || image;

  const smallSrc = getStrapiImageApiPath(small?.url);
  const mediumSrc = getStrapiImageApiPath(medium?.url);
  const largeSrc = getStrapiImageApiPath(large?.url);

  const fallbackSrc = smallSrc || mediumSrc || largeSrc;
  if (!fallbackSrc) return null;

  const width = large?.width ?? medium?.width ?? small?.width ?? image.width;
  const height = large?.height ?? medium?.height ?? small?.height ?? image.height;
  const w = width ?? 800;
  const h = height ?? 600;
  const alt = image.alternativeText || "";

  return (
    <picture>
      {largeSrc && (
        <source
          media="(min-width: 1024px)"
          srcSet={largeSrc}
        />
      )}
      {mediumSrc && (
        <source
          media="(min-width: 640px)"
          srcSet={mediumSrc}
        />
      )}
      <img
        src={fallbackSrc}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="rounded-[8px] w-full h-full object-cover"
      />
    </picture>
  );
};