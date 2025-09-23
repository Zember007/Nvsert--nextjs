import React from 'react';
import type { BrokenElementParams } from './types';
import './Photo.less';
export interface IPhotoLoadedParams {
    loaded?: boolean;
    naturalWidth?: number;
    naturalHeight?: number;
    broken?: boolean;
}
export interface IPhotoProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    src: string;
    loaded: boolean;
    broken: boolean;
    onPhotoLoad: (params: IPhotoLoadedParams) => void;
    loadingElement?: React.ReactElement;
    brokenElement?: React.ReactElement | ((photoProps: BrokenElementParams) => React.ReactElement);
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
}
export default function Photo({ src, loaded, broken, className, onPhotoLoad, loadingElement, brokenElement, title, description, ...restProps }: IPhotoProps): React.JSX.Element;
