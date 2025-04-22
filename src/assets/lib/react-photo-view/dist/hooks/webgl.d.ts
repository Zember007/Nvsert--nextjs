export function init(imagesSrc: any, index?: number): {
    canvas: any;
    imagesSrc: any;
    webGLCurtain: Curtains;
    plane: Plane;
    textures: {
        texture0: any;
        texture1: any;
        map: any;
    };
    currentIndex: number;
    gsapAnimation: any;
    params: {
        vertexShader: string;
        fragmentShader: string;
        widthSegments: number;
        heightSegments: number;
        uniforms: {
            time: {
                name: string;
                type: string;
                value: number;
            };
            mousepos: {
                name: string;
                type: string;
                value: number[];
            };
            resolution: {
                name: string;
                type: string;
                value: number[];
            };
            progress: {
                name: string;
                type: string;
                value: number;
            };
        };
    };
    loadTexture(url: any, samplerName: any): Promise<Texture>;
    initPlane(index?: number): Promise<void>;
    update(): void;
    goToIndex(index: any): Promise<void>;
};
import { Curtains } from "curtainsjs";
import { Plane } from "curtainsjs";
import { Texture } from "curtainsjs";
