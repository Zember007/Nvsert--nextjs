import React from 'react';
import Spinner from './components/Spinner';
import useMountedRef from './hooks/useMountedRef';
import type { BrokenElementParams } from './types';
import './Photo.less';

export interface IPhotoLoadedParams {
  loaded?: boolean;
  naturalWidth?: number;
  naturalHeight?: number;
  broken?: boolean;
}

export interface IPhotoProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  loaded: boolean;
  broken: boolean;
  onPhotoLoad: (params: IPhotoLoadedParams) => void;
  loadingElement?: React.ReactElement;
  brokenElement?: React.ReactElement | ((photoProps: BrokenElementParams) => React.ReactElement);
}

export default function Photo({
  src,
  loaded,
  broken,
  className,
  onPhotoLoad,
  loadingElement,
  brokenElement,
  ...restProps
}: IPhotoProps) {
  const mountedRef = useMountedRef();

  function handleImageLoaded(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.target as HTMLImageElement;
    if (mountedRef.current) {
      onPhotoLoad({
        loaded: true,
        naturalWidth,
        naturalHeight,
      });
    }
  }

  function handleImageBroken() {
    if (mountedRef.current) {
      onPhotoLoad({
        broken: true,
      });
    }
  }

  if (src && !broken) {
    return (
      <>
        <div className={`PhotoView__Photo__attr ${!loaded && 'loaded'}`}>
          <img
            className={`PhotoView__Photo${className ? ` ${className}` : ''}`}
            src={src}
            onLoad={handleImageLoaded}
            onError={handleImageBroken}
            draggable={false}
            alt="document"
            {...restProps}
          />
        </div>
        {!loaded &&
          (loadingElement ? (
            <span className="PhotoView__icon">{loadingElement}</span>
          ) : (
            <Spinner className="PhotoView__icon" />
          ))}
      </>
    );
  }

  if (brokenElement) {
    return (
      <span className="PhotoView__icon">
        {typeof brokenElement === 'function' ? brokenElement({ src }) : brokenElement}
      </span>
    );
  }

  return null;
}
