import { Curtains, Plane, Texture } from "curtainsjs";
import gsap from "gsap";

export const init = async (imagesSrc, index = 0) => {
    class WEBGL {
        constructor(set) {
            this.canvas = set.canvas;
            this.imagesSrc = set.imagesSrc;
            this.webGLCurtain = new Curtains({ container: this.canvas });
            this.plane = null;

            this.textures = {
                texture0: null,
                texture1: null,
                map: null
            };

            this.currentIndex = 0;
            this.gsapAnimation = null;

            this.params = {
                vertexShader: vs,
                fragmentShader: fs,
                widthSegments: 40,
                heightSegments: 40,
                width: 475, // ← фиксированные размеры
                height: 677,
                uniforms: {
                    time: { name: "uTime", type: "1f", value: 0 },
                    mousepos: { name: "uMouse", type: "2f", value: [0, 0] },
                    resolution: { name: "uReso", type: "2f", value: [innerWidth, innerHeight] },
                    progress: { name: "uProgress", type: "1f", value: 0 }
                }
            };
        }

        async loadTexture(url, samplerName) {
            const img = document.createElement("img");
            img.crossOrigin = "anonymous";
            img.src = url;
            await img.decode();

            return new Texture(this.webGLCurtain, {
                sampler: samplerName,
                fromTexture: img
            });
        }

        async initPlane(index = 0) {
            const box = document.getElementById('wrap-texture-box');
            box.innerHTML = ""; // ← очищаем перед созданием новой плоскости

            const div = document.createElement("div");
            div.className = "plane";
            box.appendChild(div);

            const texture0 = await this.loadTexture(this.imagesSrc[index], "texture0");
            const texture1 = await this.loadTexture(this.imagesSrc[index + 1] || this.imagesSrc[0], "texture1");
            const map = await this.loadTexture("https://i.ibb.co/n8MjCrk/seed129873123-scale10-fbm-worley-quintic-octaves2.jpg", "map");

            const img0 = document.createElement("img");
            img0.setAttribute("data-sampler", "texture0");
            img0.src = this.imagesSrc[index];

            const img1 = document.createElement("img");
            img1.setAttribute("data-sampler", "texture1");
            img1.src = this.imagesSrc[index + 1] || this.imagesSrc[0];

            const mapImg = document.createElement("img");
            mapImg.setAttribute("data-sampler", "map");
            mapImg.src = "https://i.ibb.co/n8MjCrk/seed129873123-scale10-fbm-worley-quintic-octaves2.jpg";

            div.appendChild(img0);
            div.appendChild(img1);
            div.appendChild(mapImg);

            this.plane = new Plane(this.webGLCurtain, div, this.params);

            this.plane.onReady(() => {
                this.textures.texture0 = this.plane.textures[0];
                this.textures.texture1 = this.plane.textures[1];
                this.textures.map = this.plane.textures[2];
                this.textures.texture0.setScale(1, 1);
                this.textures.texture1.setScale(1, 1);
                this.textures.map.setScale(1, 1);
                this.update();
            });
        }

        update() {
            this.plane.onRender(() => {
                this.plane.uniforms.time.value += 0.01;
                this.plane.uniforms.resolution.value = [innerWidth, innerHeight];
            });

            window.addEventListener("resize", () => {
                this.plane.uniforms.resolution.value = [innerWidth, innerHeight];
            });
        }

        async goToIndex(index) {
            if (index < 0 || index >= this.imagesSrc.length || index === this.currentIndex) return;

            const nextImage = this.imagesSrc[index];
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = nextImage;
            await img.decode();

            this.textures.texture1.setSource(img);

            this.plane.uniforms.progress.value = 0;

            if (this.gsapAnimation) this.gsapAnimation.kill();

            this.gsapAnimation = gsap.to(this.plane.uniforms.progress, {
                value: 1,
                duration: 0.7,
                onComplete: () => {
                    this.textures.texture0.setSource(img);
                    this.plane.uniforms.resolution.value = [innerWidth, innerHeight];

                    this.plane.uniforms.progress.value = 0;
                    this.currentIndex = index;
                    this.gsapAnimation = null;
                }
            });
        }
    }

    const webgl = new WEBGL({
        canvas: document.getElementById("canvas"),
        imagesSrc
    });

    await webgl.initPlane(index);


    return webgl;
};


const fs = `
   #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI2 6.28318530718
    #define PI 3.14159265359
    #define S(a,b,n) smoothstep(a,b,n)

    uniform float uTime;
    uniform float uProgress;
    uniform vec2 uReso;
    uniform vec2 uMouse;

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord0;
    varying vec2 vTextureCoord1;
    varying vec2 vTextureCoordMap;

    uniform sampler2D texture0;
    uniform sampler2D texture1;
    uniform sampler2D map;

    float exponentialEasing (float x, float a){
      float epsilon = 0.00001;
      float min_param_a = 0.0 + epsilon;
      float max_param_a = 1.0 - epsilon;
      a = max(min_param_a, min(max_param_a, a));
      if (a < 0.5){
        a = 2.0 * a;
        return pow(x, a);
      } else {
        a = 2.0 * (a - 0.5);
        return pow(x, 1.0 / (1.0 - a));
      }
    }

    vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
      vec4 color = vec4(0.0);
      vec2 off1 = vec2(1.41176) * direction;
      vec2 off2 = vec2(3.29411) * direction;
      vec2 off3 = vec2(5.17647) * direction;
      color += texture2D(image, uv) * 0.19648;
      color += texture2D(image, uv + (off1 / resolution)) * 0.29691;
      color += texture2D(image, uv - (off1 / resolution)) * 0.29691;
      color += texture2D(image, uv + (off2 / resolution)) * 0.09447;
      color += texture2D(image, uv - (off2 / resolution)) * 0.09447;
      color += texture2D(image, uv + (off3 / resolution)) * 0.01038;
      color += texture2D(image, uv - (off3 / resolution)) * 0.01038;
      return color;
    }

    void main() {
        vec2 uv0 = vTextureCoord0;
        vec2 uv1 = vTextureCoord1;

        float progress0 = uProgress;
        float progress1 = 1.0 - uProgress;

        vec4 mapTex = blur13(map, vTextureCoordMap, uReso, vec2(2.0)) + 0.5;

        uv0.x += progress0 * mapTex.r;
        uv1.x -= progress1 * mapTex.r;

        vec4 color = texture2D(texture0, uv0);
        vec4 color1 = texture2D(texture1, uv1);

        gl_FragColor = mix(color, color1, progress0);
    }
`;

const vs = `
   #ifdef GL_ES
    precision mediump float;
    #endif

    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform mat4 texture0Matrix;
    uniform mat4 texture1Matrix;
    uniform mat4 mapMatrix;

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord0;
    varying vec2 vTextureCoord1;
    varying vec2 vTextureCoordMap;

    void main() {
        vec3 vertexPosition = aVertexPosition;

        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

        vTextureCoord0 = (texture0Matrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
        vTextureCoord1 = (texture1Matrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
        vTextureCoordMap = (mapMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
        vVertexPosition = vertexPosition;
    }
`;
