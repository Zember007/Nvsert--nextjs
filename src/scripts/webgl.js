import { Curtains, Plane, Texture } from "curtainsjs";
import gsap from "gsap";

export const init = (imagesSrc) => {
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

            this.params = {
                vertexShader: vs,
                fragmentShader: fs,
                widthSegments: 40,
                heightSegments: 40,
                uniforms: {
                    time: {
                        name: "uTime",
                        type: "1f",
                        value: 0
                    },
                    mousepos: {
                        name: "uMouse",
                        type: "2f",
                        value: [0, 0]
                    },
                    resolution: {
                        name: "uReso",
                        type: "2f",
                        value: [innerWidth, innerHeight]
                    },
                    progress: {
                        name: "uProgress",
                        type: "1f",
                        value: 0
                    }
                }
            };
        }

        async loadTexture(url, samplerName) {
            const img = document.createElement("img");
            img.crossOrigin = "anonymous";
            img.src = url;
            await img.decode(); // ждем загрузки

            const texture = new Texture(this.webGLCurtain, {
                sampler: samplerName,
                fromTexture: img
            });

            return texture;
        }

        async initPlane() {
            // создаем фейковый html-элемент, чтобы инициализировать plane
            const div = document.createElement("div");
            div.className = "plane";
            document.getElementById('wrap-texture').appendChild(div);

            // создаем 3 img: начальная текстура, вторая текстура, карта
            const img0 = document.createElement("img");
            img0.setAttribute("data-sampler", "texture0");
            img0.src = this.imagesSrc[0];

            const img1 = document.createElement("img");
            img1.setAttribute("data-sampler", "texture1");
            img1.src = this.imagesSrc[1] || this.imagesSrc[0];

            const mapImg = document.createElement("img");
            mapImg.setAttribute("data-sampler", "map");
            mapImg.src = "https://i.ibb.co/n8MjCrk/seed129873123-scale10-fbm-worley-quintic-octaves2.jpg"; // можно заменить на свою карту

            div.appendChild(img0);
            div.appendChild(img1);
            div.appendChild(mapImg);

            // создаем Plane
            this.plane = new Plane(this.webGLCurtain, div, this.params);

            this.plane.onReady(() => {
                // сохраняем текстуры
                this.textures.texture0 = this.plane.textures[0];
                this.textures.texture1 = this.plane.textures[1];
                this.textures.map = this.plane.textures[2];

                this.update();
            });
        }

        update() {
            this.plane.onRender(() => {
                this.plane.uniforms.time.value += 0.01;
                this.plane.uniforms.resolution.value = [innerWidth, innerHeight];
            });
        }

        async goToIndex(index) {
            if (index < 0 || index >= this.imagesSrc.length || index === this.currentIndex) return;

            const nextImage = this.imagesSrc[index];

            // загружаем новое изображение в texture1
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = nextImage;
            await img.decode();

            this.textures.texture1.setSource(img);

            // анимация прогресса
            this.plane.uniforms.progress.value = 0;
            await gsap.to(this.plane.uniforms.progress, {
                value: 1,
                duration: 1,
                onComplete: () => {
                    // копируем texture1 -> texture0 после перехода
                    this.textures.texture0.setSource(img);
                    this.plane.uniforms.progress.value = 0;
                    this.currentIndex = index;
                }
            });
        }
    }

    const webgl = new WEBGL({
        canvas: document.getElementById("canvas"),
        imagesSrc
    });

    webgl.initPlane();

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
    
    // get our varyings
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord0;
    varying vec2 vTextureCoord1;
    varying vec2 vTextureCoordMap;

    // the uniform we declared inside our javascript

    // our texture sampler (default name, to use a different name please refer to the documentation)
    uniform sampler2D texture0;
    uniform sampler2D texture1;
    uniform sampler2D map;
     
    // http://www.flong.com/texts/code/shapers_exp/
    float exponentialEasing (float x, float a){

      float epsilon = 0.00001;
      float min_param_a = 0.0 + epsilon;
      float max_param_a = 1.0 - epsilon;
      a = max(min_param_a, min(max_param_a, a));

      if (a < 0.5){
        // emphasis
        a = 2.0 * a;
        float y = pow(x, a);
        return y;
      } else {
        // de-emphasis
        a = 2.0 * (a-0.5);
        float y = pow(x, 1.0 / (1.-a));
        return y;
      }
    }
  
      //https://github.com/Jam3/glsl-fast-gaussian-blur
    vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
      vec4 color = vec4(0.0);
      vec2 off1 = vec2(1.411764705882353) * direction;
      vec2 off2 = vec2(3.2941176470588234) * direction;
      vec2 off3 = vec2(5.176470588235294) * direction;
      color += texture2D(image, uv) * 0.1964825501511404;
      color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
      color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
      color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
      color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
      color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
      color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
      return color;
    }
  
    void main(){
        vec2 uv0 = vTextureCoord0;
        vec2 uv1 = vTextureCoord1;

        float progress0 = uProgress;
        float progress1 = 1. - uProgress;
      
        vec4 map = blur13(map, vTextureCoordMap, uReso, vec2(2.)) + 0.5;
            
        uv0.x += progress0 * map.r;
        uv1.x -= progress1 * map.r;
      
        vec4 color = texture2D( texture0, uv0 );
        vec4 color1 = texture2D( texture1, uv1 );
      
        gl_FragColor = mix(color, color1, progress0 );          
    }
`

const vs = `
   #ifdef GL_ES
    precision mediump float;
    #endif
    
    // those are the mandatory attributes that the lib sets
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform mat4 texture0Matrix;
    uniform mat4 texture1Matrix;
    uniform mat4 mapMatrix;

    // if you want to pass your vertex and texture coords to the fragment shader
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord0;
    varying vec2 vTextureCoord1;
    varying vec2 vTextureCoordMap;

    void main() {
        vec3 vertexPosition = aVertexPosition;

        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
  
        // set the varyings
        vTextureCoord0 = (texture0Matrix * vec4(aTextureCoord, 0., 1.)).xy;
        vTextureCoord1 = (texture1Matrix * vec4(aTextureCoord, 0., 1.)).xy;
        vTextureCoordMap = (mapMatrix * vec4(aTextureCoord, 0., 1.)).xy;
        vVertexPosition = vertexPosition;
    }
`