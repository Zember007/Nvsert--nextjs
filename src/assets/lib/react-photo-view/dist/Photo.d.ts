import React from 'react';
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
export default function Photo({ src, loaded, broken, className, onPhotoLoad, loadingElement, brokenElement, ...restProps }: IPhotoProps): React.JSX.Element;
