import NextImage, { type ImageProps } from 'next/image';

import { getShimmerBlurDataURL } from 'shared/lib';

const FALLBACK_BLUR_WIDTH = 32;
const FALLBACK_BLUR_HEIGHT = 20;

const isStaticImage = (src: ImageProps['src']): src is Exclude<ImageProps['src'], string> => {
  return typeof src === 'object' && src !== null;
};

const getStaticDimensions = (src: Exclude<ImageProps['src'], string>): { width: number; height: number } | null => {
  const normalizedSrc = 'default' in src ? src.default : src;
  if ('width' in normalizedSrc && 'height' in normalizedSrc) {
    return { width: normalizedSrc.width, height: normalizedSrc.height };
  }
  return null;
};

const isDataUri = (src: ImageProps['src']): boolean => {
  return typeof src === 'string' && src.startsWith('data:');
};

const resolveBlurDimensions = (props: ImageProps): { width: number; height: number } => {
  if (typeof props.width === 'number' && typeof props.height === 'number') {
    return { width: props.width, height: props.height };
  }

  if (isStaticImage(props.src)) {
    const dimensions = getStaticDimensions(props.src);
    if (dimensions) return dimensions;
  }

  return { width: FALLBACK_BLUR_WIDTH, height: FALLBACK_BLUR_HEIGHT };
};

const OptimizedImage = (props: ImageProps) => {
  const { placeholder, blurDataURL, src, fill, sizes, loading, priority, decoding, ...restProps } = props;

  const shouldApplyBlur = placeholder === undefined && !isDataUri(src);
  const blurPlaceholder = shouldApplyBlur ? 'blur' : placeholder;

  const { width, height } = resolveBlurDimensions(props);
  const resolvedBlurDataURL =
    blurPlaceholder === 'blur' && !blurDataURL ? getShimmerBlurDataURL(width, height) : blurDataURL;

  const resolvedSizes = fill && !sizes ? '100vw' : sizes;
  const resolvedLoading = priority ? undefined : (loading ?? 'lazy');
  const resolvedDecoding = decoding ?? 'async';

  return (
    <NextImage
      {...restProps}
      src={src}
      fill={fill}
      sizes={resolvedSizes}
      loading={resolvedLoading}
      priority={priority}
      decoding={resolvedDecoding}
      placeholder={blurPlaceholder}
      blurDataURL={resolvedBlurDataURL}
    />
  );
};

export default OptimizedImage;
