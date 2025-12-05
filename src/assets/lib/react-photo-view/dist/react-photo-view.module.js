import React, { useRef, useReducer, createContext, useEffect, useLayoutEffect, useMemo, useCallback, useState, useContext, Children, cloneElement } from 'react';
import { createPortal } from 'react-dom';

/**
 * Hook of persistent methods
 */
function useMethods(fn) {
  const {
    current
  } = useRef({
    fn,
    curr: undefined
  });
  current.fn = fn;
  if (!current.curr) {
    const curr = Object.create(null);
    Object.keys(fn).forEach(key => {
      curr[key] = function () {
        return current.fn[key].call(current.fn, ...[].slice.call(arguments));
      };
    });
    current.curr = curr;
  }
  return current.curr;
}

function useSetState(initialState) {
  return useReducer((state, action) => ({
    ...state,
    ...(typeof action === 'function' ? action(state) : action)
  }), initialState);
}

var PhotoContext = createContext(undefined);

/**
 * 最大触摸时间
 */
const maxTouchTime = 200;
/**
 * 默认动画速度
 */
const defaultSpeed = 400;
/**
 * 默认动画函数
 */
const defaultEasing = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
/**
 * 最大滑动切换图片距离
 */
const maxMoveOffset = 100;
/**
 * 图片的间隔
 */
const horizontalOffset = 20;
/**
 * 最小初始响应距离
 */
const minStartTouchOffset = 20;
/**
 * 默认背景透明度
 */
const defaultOpacity = 1;
/**
 * 最小缩放度
 */
const minScale = 1;
/**
 * 最大缩放度（若图片足够大，则会超出）
 */
const maxScale = 6;
/**
 * 最小长图模式比例
 */
const longModeRatio = 3;
/**
 * 缩放弹性缓冲
 */
const scaleBuffer = 0.2;
/**
 * 最大等待动画时间
 */
const maxWaitAnimationTime = 250;

/**
 * 是否支持触摸设备
 */
const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

const limitNumber = (value, min, max) => {
  return Math.max(Math.min(value, max), min);
};
/**
 * 限制最大/最小缩放
 */
const limitScale = (scale, max = 0, buffer = 0) => {
  return limitNumber(scale, minScale * (1 - buffer), Math.max(maxScale, max) * (1 + buffer));
};

const isSSR = typeof window === 'undefined' || /ServerSideRendering/.test(navigator && navigator.userAgent);
var useIsomorphicLayoutEffect = isSSR ? useEffect : useLayoutEffect;

/**
 * 截取相邻三张图片
 */
function useAdjacentImages(images, index, loop) {
  return useMemo(() => {
    const imageLength = images.length;
    if (loop) {
      const connected = images.concat(images).concat(images);
      return connected.slice(imageLength + index - 1, imageLength + index + 2);
    }
    return images.slice(Math.max(index - 1, 0), Math.min(index + 2, imageLength + 1));
  }, [images, index, loop]);
}

function useEventListener(type, fn, options) {
  const latest = useRef(fn);
  latest.current = fn;
  useEffect(() => {
    function wrapper(evt) {
      latest.current(evt);
    }
    if (type) {
      window.addEventListener(type, wrapper, options);
    }
    return () => {
      if (type) {
        window.removeEventListener(type, wrapper);
      }
    };
  }, [type]);
}

/**
 * 逻辑分叉变量处理
 * 此 hook 不触发额外渲染
 */
function useForkedVariable(initial, updater) {
  // 初始分叉变量
  const forkedRef = useRef(initial);
  function modify(next) {
    forkedRef.current = next;
  }
  useMemo(() => {
    // 参数变化之后同步内部分叉变量
    updater(modify);
  }, [initial]);
  return [forkedRef.current, modify];
}

/**
 * 动画关闭处理真实关闭状态
 * 通过 onAnimationEnd 回调实现 leaveCallback
 */
function useAnimationVisible(visible, afterClose) {
  const [, handleRender] = useReducer(c => !c, false);
  const activeAnimation = useRef(0);
  // 可见状态分支
  const [realVisible, modifyRealVisible] = useForkedVariable(visible, modify => {
    // 可见状态：设置进入动画
    if (visible) {
      modify(visible);
      activeAnimation.current = 1;
    } else {
      activeAnimation.current = 2;
    }
  });
  function onAnimationEnd() {
    // 动画结束后触发渲染
    handleRender();
    // 结束动画：设置隐藏状态
    if (activeAnimation.current === 2) {
      modifyRealVisible(false);
      // 触发隐藏回调
      if (afterClose) {
        afterClose();
      }
    }
    // 重置状态
    activeAnimation.current = 0;
  }
  return [
  /**
   * 真实可见状态
   */
  realVisible,
  /**
   * 正在进行的动画
   */
  activeAnimation.current,
  /**
   * 动画结束后回调
   */
  onAnimationEnd];
}

function SlidePortal({
  container = document.body,
  ...rest
}) {
  return createPortal(React.createElement("div", {
    ...rest
  }), container);
}

function CloseIcon(props) {
  return React.createElement("button", {
    ...props
  }, React.createElement("div", {
    className: "in"
  }, React.createElement("div", {
    className: "close-button-block"
  }), React.createElement("div", {
    className: "close-button-block"
  })), React.createElement("div", {
    className: "out"
  }, React.createElement("div", {
    className: "close-button-block"
  }), React.createElement("div", {
    className: "close-button-block"
  })));
}

function ArrowLeft(props) {
  return React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 768 768",
    ...props
  }, React.createElement("path", {
    d: "M640.5 352.5v63h-390l178.5 180-45 45-256.5-256.5 256.5-256.5 45 45-178.5 180h390z"
  }));
}

function ArrowRight(props) {
  return React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 768 768",
    ...props
  }, React.createElement("path", {
    d: "M384 127.5l256.5 256.5-256.5 256.5-45-45 178.5-180h-390v-63h390l-178.5-180z"
  }));
}

function PreventScroll() {
  useEffect(() => {
    const {
      style
    } = document.body;
    const lastOverflow = style.overflow;
    style.overflow = 'hidden';
    return () => {
      style.overflow = lastOverflow;
    };
  }, []);
  return null;
}

/**
 * 从 Touch 事件中获取两个触控中心位置
 */
function getMultipleTouchPosition(evt) {
  const {
    clientX,
    clientY
  } = evt.touches[0];
  if (evt.touches.length >= 2) {
    const {
      clientX: nextClientX,
      clientY: nextClientY
    } = evt.touches[1];
    return [(clientX + nextClientX) / 2, (clientY + nextClientY) / 2, Math.sqrt((nextClientX - clientX) ** 2 + (nextClientY - clientY) ** 2)];
  }
  return [clientX, clientY, 0];
}

/**
 * 获取接触边缘类型
 */
const getReachType = (initialTouchState, horizontalCloseEdge, verticalCloseEdge, reachPosition) => {
  if (horizontalCloseEdge && initialTouchState === 1 || reachPosition === 'x') {
    return 'x';
  }
  if (verticalCloseEdge && initialTouchState > 1 || reachPosition === 'y') {
    return 'y';
  }
  return undefined;
};
/**
 * 计算接触边缘位置
 * @param position - x/y
 * @param scale
 * @param size - width/height
 * @param innerSize - innerWidth/innerHeight
 * @return [CloseEdgeType, position]
 */
const computePositionEdge = (position, scale, size, innerSize) => {
  const currentWidth = size * scale;
  // 图片超出的宽度
  const outOffset = (currentWidth - innerSize) / 2;
  let closedEdge;
  let current = position;
  if (currentWidth <= innerSize) {
    closedEdge = 1;
    current = 0;
  } else if (position > 0 && outOffset - position <= 0) {
    closedEdge = 2;
    current = outOffset;
  } else if (position < 0 && outOffset + position <= 0) {
    closedEdge = 3;
    current = -outOffset;
  }
  return [closedEdge, current];
};

/**
 * 获取移动或缩放之后的中心点
 */
function getPositionOnMoveOrScale(x, y, width, height, scale, toScale, clientX = innerWidth / 2, clientY = innerHeight / 2, offsetX = 0, offsetY = 0) {
  // 是否接触边缘
  const [closedEdgeX] = computePositionEdge(x, toScale, width, innerWidth);
  const [closedEdgeY] = computePositionEdge(y, toScale, height, innerHeight);
  const centerClientX = innerWidth / 2;
  const centerClientY = innerHeight / 2;
  // 坐标偏移
  const lastPositionX = centerClientX + x;
  const lastPositionY = centerClientY + y;
  // 偏移位置
  const originX = clientX - (clientX - lastPositionX) * (toScale / scale) - centerClientX;
  const originY = clientY - (clientY - lastPositionY) * (toScale / scale) - centerClientY;
  // 长图模式无左右反馈
  const longModeEdge = height / width >= longModeRatio && width * toScale === innerWidth;
  // 超出边缘距离减半
  return {
    x: originX + (longModeEdge ? 0 : closedEdgeX ? offsetX / 2 : offsetX),
    y: originY + (closedEdgeY ? offsetY / 2 : offsetY),
    lastCX: clientX,
    lastCY: clientY
  };
}

/**
 * 获取旋转后的宽高
 */
function getRotateSize(rotate, width, height) {
  const isVertical = rotate % 180 !== 0;
  // 若图片不是水平则调换属性
  if (isVertical) {
    return [height, width, isVertical];
  }
  return [width, height, isVertical];
}

/**
 * 获取图片合适的大小
 */
function getSuitableImageSize(naturalWidth, naturalHeight, rotate) {
  const [currentWidth, currentHeight, isVertical] = getRotateSize(rotate, innerWidth, innerHeight);
  let y = 0;
  let width = currentWidth;
  let height = currentHeight;
  // 自适应宽高
  const autoWidth = naturalWidth / naturalHeight * currentHeight;
  const autoHeight = naturalHeight / naturalWidth * currentWidth;
  const maxWidth = 448;
  if (naturalWidth < currentWidth && naturalHeight < currentHeight) {
    width = naturalWidth;
    height = naturalHeight;
  } else if (naturalWidth < currentWidth && naturalHeight >= currentHeight) {
    width = autoWidth;
  } else if (naturalWidth >= currentWidth && naturalHeight < currentHeight) {
    height = autoHeight;
  } else if (naturalWidth / naturalHeight > currentWidth / currentHeight) {
    height = autoHeight;
  }
  // 长图模式
  else if (naturalHeight / naturalWidth >= longModeRatio && !isVertical) {
    height = autoHeight;
    y = (height - currentHeight) / 2;
  } else {
    width = autoWidth;
  }
  if (width > maxWidth) {
    width = maxWidth;
    height = naturalHeight / naturalWidth * maxWidth; // Сохраняем пропорции
  } else {
    width -= 30;
    height = naturalHeight / naturalWidth * width;
  }
  return {
    width,
    height,
    x: 0,
    y,
    pause: true
  };
}

function useDebounceCallback(callback, {
  leading = false,
  maxWait,
  wait = maxWait || 0
}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const prev = useRef(0);
  const trailingTimeout = useRef(null);
  const clearTrailing = () => trailingTimeout.current && clearTimeout(trailingTimeout.current);
  const fn = useCallback(function () {
    var args = [].slice.call(arguments);
    const now = Date.now();
    function call() {
      prev.current = now;
      clearTrailing();
      callbackRef.current.apply(null, args);
    }
    const last = prev.current;
    const offset = now - last;
    // leading
    if (last === 0) {
      if (leading) {
        call();
      }
      prev.current = now;
    }
    // body
    if (maxWait !== undefined) {
      if (offset > maxWait) {
        call();
        return;
      }
    } else if (offset < wait) {
      prev.current = now;
    }
    // trailing
    clearTrailing();
    trailingTimeout.current = setTimeout(() => {
      call();
      prev.current = 0;
    }, wait);
  }, [wait, maxWait, leading]);
  fn.cancel = clearTrailing;
  return fn;
}

/**
 * 单击和双击事件处理
 * @param singleTap - 单击事件
 * @param doubleTap - 双击事件
 * @return invokeTap
 */
function useContinuousTap(singleTap, doubleTap) {
  // 当前连续点击次数
  const continuousClick = useRef(0);
  const debounceTap = useDebounceCallback(function () {
    continuousClick.current = 0;
    singleTap(...[].slice.call(arguments));
  }, {
    wait: 300
  });
  return function invokeTap() {
    var args = [].slice.call(arguments);
    continuousClick.current += 1;
    debounceTap(...args);
    // 双击
    if (continuousClick.current >= 2) {
      debounceTap.cancel();
      continuousClick.current = 0;
      doubleTap(...args);
    }
  };
}

// 触边运动反馈
const rebound = (start, bound, callback) => easeOutMove(start, bound, callback, defaultSpeed / 4, t => t, () => easeOutMove(bound, start, callback));
/**
 * 物理滚动到具体位置
 */
function useScrollPosition(callbackX, callbackY, callbackS) {
  const callback = useMethods({
    X: spatial => callbackX(spatial),
    Y: spatial => callbackY(spatial),
    S: spatial => callbackS(spatial)
  });
  return (x, y, lastX, lastY, width, height, scale, safeScale, lastScale, rotate, touchedTime) => {
    const [currentWidth, currentHeight] = getRotateSize(rotate, width, height);
    // 开始状态下边缘触发状态
    const [beginEdgeX, beginX] = computePositionEdge(x, safeScale, currentWidth, innerWidth);
    const [beginEdgeY, beginY] = computePositionEdge(y, safeScale, currentHeight, innerHeight);
    const moveTime = Date.now() - touchedTime;
    // 时间过长、超出安全范围的情况下不执行滚动逻辑，恢复安全范围
    if (moveTime >= maxTouchTime || safeScale !== scale || Math.abs(lastScale - scale) > 1) {
      // 计算中心缩放点
      const {
        x: nextX,
        y: nextY
      } = getPositionOnMoveOrScale(x, y, width, height, scale, safeScale);
      const targetX = beginEdgeX ? beginX : nextX !== x ? nextX : null;
      const targetY = beginEdgeY ? beginY : nextY !== y ? nextY : null;
      if (targetX !== null) {
        easeOutMove(x, targetX, callback.X);
      }
      if (targetY !== null) {
        easeOutMove(y, targetY, callback.Y);
      }
      if (safeScale !== scale) {
        easeOutMove(scale, safeScale, callback.S);
      }
      return;
    }
    // 初始速度
    const speedX = (x - lastX) / moveTime;
    const speedY = (y - lastY) / moveTime;
    const speedT = Math.sqrt(speedX ** 2 + speedY ** 2);
    // 是否接触到边缘
    let edgeX = false;
    let edgeY = false;
    scrollMove(speedT, spatial => {
      const nextX = x + spatial * (speedX / speedT);
      const nextY = y + spatial * (speedY / speedT);
      const [isEdgeX, currentX] = computePositionEdge(nextX, scale, currentWidth, innerWidth);
      const [isEdgeY, currentY] = computePositionEdge(nextY, scale, currentHeight, innerHeight);
      if (isEdgeX && !edgeX) {
        edgeX = true;
        if (beginEdgeX) {
          easeOutMove(nextX, currentX, callback.X);
        } else {
          rebound(currentX, nextX + (nextX - currentX), callback.X);
        }
      }
      if (isEdgeY && !edgeY) {
        edgeY = true;
        if (beginEdgeY) {
          easeOutMove(nextY, currentY, callback.Y);
        } else {
          rebound(currentY, nextY + (nextY - currentY), callback.Y);
        }
      }
      // 同时接触边缘的情况下停止滚动
      if (edgeX && edgeY) {
        return false;
      }
      const resultX = edgeX || callback.X(currentX);
      const resultY = edgeY || callback.Y(currentY);
      return resultX && resultY;
    });
  };
}
// 加速度
const acceleration = -0.001;
// 阻力
const resistance = 0.0002;
/**
 * 通过速度滚动到停止
 */
function scrollMove(initialSpeed, callback) {
  let v = initialSpeed;
  let s = 0;
  let lastTime;
  let frameId = 0;
  const calcMove = now => {
    if (!lastTime) {
      lastTime = now;
    }
    const dt = now - lastTime;
    const direction = Math.sign(initialSpeed);
    const a = direction * acceleration;
    const f = Math.sign(-v) * v ** 2 * resistance;
    const ds = v * dt + (a + f) * dt ** 2 / 2;
    v += (a + f) * dt;
    s += ds;
    // move to s
    lastTime = now;
    if (direction * v <= 0) {
      caf();
      return;
    }
    if (callback(s)) {
      raf();
      return;
    }
    caf();
  };
  raf();
  function raf() {
    frameId = requestAnimationFrame(calcMove);
  }
  function caf() {
    cancelAnimationFrame(frameId);
  }
}
/**
 * 缓动函数
 */
const easeOutQuart = x => 1 - (1 - x) ** 4;
/**
 * 缓动回调
 */
function easeOutMove(start, end, callback, speed = defaultSpeed, easing = easeOutQuart, complete) {
  const distance = end - start;
  if (distance === 0) {
    return;
  }
  const startTime = Date.now();
  let frameId = 0;
  const calcMove = () => {
    const time = Math.min(1, (Date.now() - startTime) / speed);
    const result = callback(start + easing(time) * distance);
    if (result && time < 1) {
      raf();
      return;
    }
    cancelAnimationFrame(frameId);
    if (time >= 1 && complete) {
      complete();
    }
  };
  raf();
  function raf() {
    frameId = requestAnimationFrame(calcMove);
  }
}

const initialRect = {
  T: 0,
  L: 0,
  W: 0,
  H: 0,
  // 图像填充方式
  FIT: undefined
};
function useAnimationOrigin(visible, originRef, loaded, speed, updateEasing) {
  const [originRect, updateOriginRect] = useState(initialRect);
  // 动画状态
  const [easingMode, updateEasingMode] = useState(0);
  const initialTime = useRef(null);
  const fn = useMethods({
    OK: () => visible && updateEasingMode(4)
  });
  useEffect(() => {
    // 记录初始打开的时间
    if (!initialTime.current) {
      initialTime.current = Date.now();
    }
    if (!loaded) {
      return;
    }
    handleUpdateOrigin(originRef, updateOriginRect);
    // 打开动画处理
    if (visible) {
      // 小于最大允许动画时间，则执行缩放动画
      if (Date.now() - initialTime.current < maxWaitAnimationTime) {
        updateEasingMode(1);
        // 延时执行动画，保持 transition 生效
        requestAnimationFrame(() => {
          updateEasingMode(2);
          requestAnimationFrame(() => handleToShape(3));
        });
        setTimeout(fn.OK, speed);
        return;
      }
      // 超出则不执行
      updateEasingMode(4);
      return;
    }
    // 关闭动画处理
    handleToShape(5);
  }, [visible, loaded]);
  function handleToShape(currentShape) {
    updateEasing(false);
    updateEasingMode(currentShape);
  }
  return [easingMode, originRect];
}
/**
 * 更新缩略图位置信息
 */
function handleUpdateOrigin(originRef, updateOriginRect) {
  const element = originRef && originRef.current;
  if (element && element.nodeType === 1) {
    // 获取触发时节点位置
    const {
      top,
      left,
      width,
      height
    } = element.getBoundingClientRect();
    const isImage = element.tagName === 'IMG';
    updateOriginRect({
      T: top,
      L: left,
      W: width,
      H: height,
      FIT: isImage ? getComputedStyle(element).objectFit : undefined
    });
  }
}

/**
 * 目标缩放延迟处理
 */
function useTargetScale(realWidth, realHeight, realScale, speed, updateEasing) {
  const execRef = useRef(false);
  const [{
    lead,
    scale
  }, updateState] = useSetState({
    lead: true,
    scale: realScale
  });
  const moveScale = useDebounceCallback(function (current) {
    try {
      updateEasing(true);
      updateState({
        lead: false,
        scale: current
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }, {
    wait: speed
  });
  useIsomorphicLayoutEffect(() => {
    if (!execRef.current) {
      execRef.current = true;
      return;
    }
    updateEasing(false);
    updateState({
      lead: true
    });
    moveScale(realScale);
  }, [realScale]);
  // 运动开始
  if (lead) {
    return [realWidth * scale, realHeight * scale, realScale / scale];
  }
  // 运动结束
  return [realWidth * realScale, realHeight * realScale, 1];
}

function useAnimationPosition(visible, originRef, loaded, x, y, width, height, scale, speed, updateEasing) {
  // 延迟更新 width/height
  const [autoWidth, autoHeight, autoScale] = useTargetScale(width, height, scale, speed, updateEasing);
  // 动画源处理
  const [easingMode, originRect] = useAnimationOrigin(visible, originRef, loaded, speed, updateEasing);
  // 计算动画位置
  const {
    T,
    L,
    W,
    H,
    FIT
  } = originRect;
  // 偏移量，x: 0, y: 0 居中为初始
  const centerWidth = innerWidth / 2;
  const centerHeight = innerHeight / 2;
  const offsetX = centerWidth - width * scale / 2;
  const offsetY = centerHeight - height * scale / 2;
  // 缩略图状态
  const miniMode = easingMode < 3 || easingMode > 4;
  // 有缩略图时，则为缩略图的位置，否则居中
  const translateX = miniMode ? W ? L : centerWidth : x + offsetX;
  const translateY = miniMode ? W ? T : centerHeight : y + offsetY;
  // 最小值缩放
  const minScale = W / (width * scale) || 0.01;
  // 适应 objectFit 保持缩略图宽高比
  const currentHeight = miniMode && FIT ? autoWidth * (H / W) : autoHeight;
  // 初始加载情况无缩放
  const currentScale = easingMode === 0 ? autoScale : miniMode ? minScale : autoScale;
  const opacity = miniMode ? FIT ? 1 : 0 : 1;
  return [translateX, translateY, autoWidth, currentHeight, currentScale, opacity, easingMode, FIT];
}

const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};

// eslint-disable-next-line react/prop-types
function Spinner({
  className = '',
  ...props
}) {
  return React.createElement("div", {
    className: `PhotoView__Spinner ${className}`,
    ...props
  }, React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: "36",
    height: "36",
    fill: "white"
  }, React.createElement("path", {
    opacity: ".25",
    d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
  }), React.createElement("path", {
    d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"
  })));
}

function Photo({
  src,
  loaded,
  broken,
  className,
  onPhotoLoad,
  loadingElement,
  brokenElement,
  title,
  description,
  ...restProps
}) {
  const mountedRef = useMountedRef();
  function handleImageLoaded(e) {
    const {
      naturalWidth,
      naturalHeight
    } = e.target;
    if (mountedRef.current) {
      onPhotoLoad({
        loaded: true,
        naturalWidth,
        naturalHeight
      });
    }
  }
  function handleImageBroken() {
    if (mountedRef.current) {
      onPhotoLoad({
        broken: true
      });
    }
  }
  if (src && !broken) {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: `PhotoView__Photo__attr ${!loaded && 'loaded'}`
    }, loaded && title && React.createElement("div", {
      className: "PhotoView__Photo__title"
    }, title), React.createElement("img", {
      className: `PhotoView__Photo${className ? ` ${className}` : ''}`,
      src: src,
      onLoad: handleImageLoaded,
      onError: handleImageBroken,
      draggable: false,
      alt: "document",
      ...restProps
    }), loaded && description && React.createElement("div", {
      className: "PhotoView__Photo__description"
    }, description)), !loaded && (loadingElement ? React.createElement("span", {
      className: "PhotoView__icon"
    }, loadingElement) : React.createElement(Spinner, {
      className: "PhotoView__icon"
    })));
  }
  if (brokenElement) {
    return React.createElement("span", {
      className: "PhotoView__icon"
    }, typeof brokenElement === 'function' ? brokenElement({
      src
    }) : brokenElement);
  }
  return null;
}

const initialState$2 = {
  // 真实宽度
  naturalWidth: undefined,
  // 真实高度
  naturalHeight: undefined,
  // 宽度
  width: undefined,
  // 高度
  height: undefined,
  // 加载成功状态
  loaded: undefined,
  // 破碎状态
  broken: false,
  // 图片 X 偏移量
  x: 0,
  // 图片 y 偏移量
  y: 0,
  // 图片处于触摸的状态
  touched: false,
  // 背景处于触摸状态
  maskTouched: false,
  // 旋转状态
  rotate: 0,
  // 放大缩小
  scale: 1,
  // 触摸开始时 x 原始坐标
  CX: 0,
  // 触摸开始时 y 原始坐标
  CY: 0,
  // 触摸开始时图片 x 偏移量
  lastX: 0,
  // 触摸开始时图片 y 偏移量
  lastY: 0,
  // 上一个触摸状态 x 原始坐标
  lastCX: 0,
  // 上一个触摸状态 y 原始坐标
  lastCY: 0,
  // 上一个触摸状态的 scale
  lastScale: 1,
  // 触摸开始时时间
  touchTime: 0,
  // 多指触控间距
  touchLength: 0,
  // 是否暂停 transition
  pause: true,
  // 停止 Raf
  stopRaf: true,
  // 当前边缘触发状态
  reach: undefined
};
function PhotoBox({
  item: {
    src,
    render,
    width: customWidth = 0,
    height: customHeight = 0,
    originRef,
    title,
    description
  },
  visible,
  speed,
  easing,
  wrapClassName,
  className,
  style,
  loadingElement,
  brokenElement,
  onPhotoTap,
  onMaskTap,
  onReachMove,
  onReachUp,
  onPhotoResize,
  isActive,
  expose
}) {
  const [state, updateState] = useSetState(initialState$2);
  const initialTouchRef = useRef(0);
  const mounted = useMountedRef();
  const {
    naturalWidth = customWidth,
    naturalHeight = customHeight,
    width = customWidth,
    height = customHeight,
    loaded = !src,
    broken,
    x,
    y,
    touched,
    stopRaf,
    maskTouched,
    rotate,
    scale,
    CX,
    CY,
    lastX,
    lastY,
    lastCX,
    lastCY,
    lastScale,
    touchTime,
    touchLength,
    pause,
    reach
  } = state;
  const fn = useMethods({
    onScale: current => onScale(limitScale(current)),
    onRotate(current) {
      if (rotate !== current) {
        expose({
          rotate: current
        });
        updateState({
          rotate: current,
          ...getSuitableImageSize(naturalWidth, naturalHeight, current)
        });
      }
    }
  });
  // 默认为屏幕中心缩放
  function onScale(current, clientX, clientY) {
    if (scale !== current) {
      expose({
        scale: current
      });
      updateState({
        scale: current,
        ...getPositionOnMoveOrScale(x, y, width, height, scale, current, clientX, clientY),
        ...(current <= 1 && {
          x: 0,
          y: 0
        })
      });
    }
  }
  const handleMove = useDebounceCallback((nextClientX, nextClientY, currentTouchLength = 0) => {
    if ((touched || maskTouched) && isActive) {
      // 通过旋转调换宽高
      const [currentWidth, currentHeight] = getRotateSize(rotate, width, height);
      // 单指最小缩放下，以初始移动距离来判断意图
      if (currentTouchLength === 0 && initialTouchRef.current === 0) {
        const isStillX = Math.abs(nextClientX - CX) <= minStartTouchOffset;
        const isStillY = Math.abs(nextClientY - CY) <= minStartTouchOffset;
        // 初始移动距离不足
        if (isStillX && isStillY) {
          // 方向记录上次移动距离，以便平滑过渡
          updateState({
            lastCX: nextClientX,
            lastCY: nextClientY
          });
          return;
        }
        // 设置响应状态
        initialTouchRef.current = !isStillX ? 1 : nextClientY > CY ? 3 : 2;
      }
      const offsetX = nextClientX - lastCX;
      const offsetY = nextClientY - lastCY;
      // 边缘触发状态
      let currentReach;
      if (currentTouchLength === 0) {
        // 边缘超出状态
        const [horizontalCloseEdge] = computePositionEdge(offsetX + lastX, scale, currentWidth, innerWidth);
        const [verticalCloseEdge] = computePositionEdge(offsetY + lastY, scale, currentHeight, innerHeight);
        // 边缘触发检测
        currentReach = getReachType(initialTouchRef.current, horizontalCloseEdge, verticalCloseEdge, reach);
        // 接触边缘
        if (currentReach !== undefined) {
          onReachMove(currentReach, nextClientX, nextClientY, scale);
        }
      }
      // 横向边缘触发、背景触发禁用当前滑动
      if (currentReach === 'x' || maskTouched) {
        updateState({
          reach: 'x'
        });
        return;
      }
      // 目标倍数
      const toScale = limitScale(scale + (currentTouchLength - touchLength) / 100 / 2 * scale, naturalWidth / width, scaleBuffer);
      // 导出变量
      expose({
        scale: toScale
      });
      updateState({
        touchLength: currentTouchLength,
        reach: currentReach,
        scale: toScale,
        ...getPositionOnMoveOrScale(x, y, width, height, scale, toScale, nextClientX, nextClientY, offsetX, offsetY)
      });
    }
  }, {
    maxWait: 8
  });
  function updateRaf(position) {
    if (stopRaf || touched) {
      return false;
    }
    if (mounted.current) {
      // 下拉关闭时可以有动画
      updateState({
        ...position,
        pause: visible
      });
    }
    return mounted.current;
  }
  const slideToPosition = useScrollPosition(nextX => updateRaf({
    x: nextX
  }), nextY => updateRaf({
    y: nextY
  }), nextScale => {
    if (mounted.current) {
      expose({
        scale: nextScale
      });
      updateState({
        scale: nextScale
      });
    }
    return !touched && mounted.current;
  });
  const handlePhotoTap = useContinuousTap(onPhotoTap, (currentClientX, currentClientY) => {
    if (!reach) {
      // 若图片足够大，则放大适应的倍数
      const endScale = scale !== 1 ? 1 : Math.max(2, naturalWidth / width);
      onScale(endScale, currentClientX, currentClientY);
    }
  });
  function handleUp(nextClientX, nextClientY) {
    // 重置响应状态
    initialTouchRef.current = 0;
    if ((touched || maskTouched) && isActive) {
      updateState({
        touched: false,
        maskTouched: false,
        pause: false,
        stopRaf: false,
        reach: undefined
      });
      const safeScale = limitScale(scale, naturalWidth / width);
      // Go
      slideToPosition(x, y, lastX, lastY, width, height, scale, safeScale, lastScale, rotate, touchTime);
      onReachUp(nextClientX, nextClientY);
      // 触发 Tap 事件
      if (CX === nextClientX && CY === nextClientY) {
        if (touched) {
          handlePhotoTap(nextClientX, nextClientY);
          return;
        }
        if (maskTouched) {
          onMaskTap(nextClientX, nextClientY);
        }
      }
    }
  }
  useEventListener(isTouchDevice ? undefined : 'mousemove', e => {
    e.preventDefault();
    handleMove(e.clientX, e.clientY);
  });
  useEventListener(isTouchDevice ? undefined : 'mouseup', e => {
    handleUp(e.clientX, e.clientY);
  });
  useEventListener(isTouchDevice ? 'touchmove' : undefined, e => {
    e.preventDefault();
    const position = getMultipleTouchPosition(e);
    handleMove(...position);
  }, {
    passive: false
  });
  useEventListener(isTouchDevice ? 'touchend' : undefined, ({
    changedTouches
  }) => {
    const touch = changedTouches[0];
    handleUp(touch.clientX, touch.clientY);
  }, {
    passive: false
  });
  useEventListener('resize', useDebounceCallback(() => {
    if (loaded && !touched) {
      updateState(getSuitableImageSize(naturalWidth, naturalHeight, rotate));
      onPhotoResize();
    }
  }, {
    maxWait: 8
  }));
  useIsomorphicLayoutEffect(() => {
    if (isActive) {
      expose({
        scale,
        rotate,
        ...fn
      });
    }
  }, [isActive]);
  function handlePhotoLoad(params) {
    updateState({
      ...params,
      ...(params.loaded && getSuitableImageSize(params.naturalWidth || 0, params.naturalHeight || 0, rotate))
    });
  }
  function handleStart(currentClientX, currentClientY, currentTouchLength = 0) {
    updateState({
      touched: true,
      CX: currentClientX,
      CY: currentClientY,
      lastCX: currentClientX,
      lastCY: currentClientY,
      lastX: x,
      lastY: y,
      lastScale: scale,
      touchLength: currentTouchLength,
      touchTime: Date.now()
    });
  }
  function handleWheel(e) {
    if (!reach) {
      // 限制最大倍数和最小倍数
      const toScale = limitScale(scale - e.deltaY / 100 / 2, naturalWidth / width);
      updateState({
        stopRaf: true
      });
      onScale(toScale, e.clientX, e.clientY);
    }
  }
  function handleMaskStart(e) {
    updateState({
      maskTouched: true,
      CX: e.clientX,
      CY: e.clientY,
      lastX: x,
      lastY: y
    });
  }
  function handleTouchStart(e) {
    e.stopPropagation();
    handleStart(...getMultipleTouchPosition(e));
  }
  function handleMouseDown(e) {
    e.stopPropagation();
    if (e.button === 0) {
      handleStart(e.clientX, e.clientY, 0);
    }
  }
  // 计算位置
  const [translateX, translateY, currentWidth, currentHeight, currentScale, opacity, easingMode, FIT] = useAnimationPosition(visible, originRef, loaded, x, y, width, height, scale, speed, isPause => updateState({
    pause: isPause
  }));
  // 图片 objectFit 渐变时间
  const transitionLayoutTime = easingMode < 4 ? speed / 2 : easingMode > 4 ? speed : 0;
  const transitionCSS = `transform ${speed}ms ${easing}`;
  const attrs = {
    className,
    onMouseDown: isTouchDevice ? undefined : handleMouseDown,
    onTouchStart: isTouchDevice ? handleTouchStart : undefined,
    onWheel: handleWheel,
    style: {
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      opacity,
      objectFit: easingMode === 4 ? undefined : FIT,
      transform: rotate ? `rotate(${rotate}deg)` : undefined,
      transition:
      // 初始状态无渐变
      easingMode > 2 ? `${transitionCSS}, opacity ${speed}ms ease, height ${transitionLayoutTime}ms ${easing}` : undefined
    }
  };
  return React.createElement("div", {
    className: `PhotoView__PhotoWrap${wrapClassName ? ` ${wrapClassName}` : ''}`,
    style: style,
    onMouseDown: !isTouchDevice && isActive ? handleMaskStart : undefined,
    onTouchStart: isTouchDevice && isActive ? e => handleMaskStart(e.touches[0]) : undefined
  }, React.createElement("div", {
    className: "PhotoView__PhotoBox",
    style: {
      transform: `matrix(${currentScale}, 0, 0, ${currentScale}, ${translateX}, ${translateY})`,
      transition: touched || pause ? undefined : transitionCSS,
      willChange: isActive ? 'transform' : undefined
    }
  }, src ? React.createElement(Photo, {
    title: title,
    description: description,
    src: src,
    loaded: loaded,
    broken: broken,
    ...attrs,
    onPhotoLoad: handlePhotoLoad,
    loadingElement: loadingElement,
    brokenElement: brokenElement
  }) : render && render({
    attrs,
    scale: currentScale,
    rotate
  })));
}

const initialState$1 = {
  x: 0,
  touched: false,
  pause: false,
  lastCX: undefined,
  lastCY: undefined,
  bg: undefined,
  lastBg: undefined,
  overlay: true,
  minimal: true,
  scale: 1,
  rotate: 0
};
function PhotoSlider(props) {
  const {
    loop = 3,
    speed: speedFn,
    easing: easingFn,
    photoClosable,
    maskClosable = true,
    maskOpacity = defaultOpacity,
    pullClosable = true,
    bannerVisible = true,
    overlayRender,
    toolbarRender,
    className,
    maskClassName,
    photoClassName,
    photoWrapClassName,
    loadingElement,
    brokenElement,
    images,
    index: controlledIndex = 0,
    onIndexChange: controlledIndexChange,
    visible,
    onClose,
    afterClose,
    portalContainer
  } = props;
  const [state, updateState] = useSetState(initialState$1);
  const [innerIndex, updateInnerIndex] = useState(0);
  const {
    x,
    touched,
    pause,
    lastCX,
    lastCY,
    bg = maskOpacity,
    lastBg,
    overlay,
    minimal,
    scale,
    rotate,
    onScale,
    onRotate
  } = state;
  // 受控 index
  const isControlled = props.hasOwnProperty('index');
  const index = isControlled ? controlledIndex : innerIndex;
  const onIndexChange = isControlled ? controlledIndexChange : updateInnerIndex;
  // 内部虚拟 index
  const virtualIndexRef = useRef(index);
  // Очищаем классы при размонтировании компонента
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
      setTimeout(() => {
        document.body.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
      }, 1000);
    };
  }, []);
  // 当前图片
  const imageLength = images.length;
  const currentImage = images[index];
  // 是否开启
  // noinspection SuspiciousTypeOfGuard
  const enableLoop = typeof loop === 'boolean' ? loop : imageLength > loop;
  // 显示动画处理
  const [realVisible, activeAnimation, onAnimationEnd] = useAnimationVisible(visible, afterClose);
  useIsomorphicLayoutEffect(() => {
    // 显示弹出层，修正正确的指向
    if (realVisible) {
      updateState({
        pause: true,
        x: index * -(innerWidth + horizontalOffset)
      });
      virtualIndexRef.current = index;
      return;
    }
    // 关闭后清空状态
    updateState(initialState$1);
  }, [realVisible]);
  const {
    close,
    changeIndex
  } = useMethods({
    close(evt) {
      if (onRotate) {
        onRotate(0);
      }
      // Очищаем классы при закрытии
      document.body.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
      updateState({
        overlay: true,
        // 记录当前关闭时的透明度
        lastBg: bg
      });
      onClose(evt);
    },
    changeIndex(nextIndex, isPause = false) {
      // 当前索引
      const currentIndex = enableLoop ? virtualIndexRef.current + (nextIndex - index) : nextIndex;
      const max = imageLength - 1;
      // 虚拟 index
      // 非循环模式，限制区间
      const limitIndex = limitNumber(currentIndex, 0, max);
      const nextVirtualIndex = enableLoop ? currentIndex : limitIndex;
      // 单个屏幕宽度
      const singlePageWidth = innerWidth + horizontalOffset;
      updateState({
        touched: false,
        lastCX: undefined,
        lastCY: undefined,
        x: -singlePageWidth * nextVirtualIndex,
        pause: isPause
      });
      virtualIndexRef.current = nextVirtualIndex;
      // 更新真实的 index
      const realLoopIndex = nextIndex < 0 ? max : nextIndex > max ? 0 : nextIndex;
      if (onIndexChange) {
        onIndexChange(enableLoop ? realLoopIndex : limitIndex);
      }
    }
  });
  useEventListener('keydown', evt => {
    if (visible) {
      switch (evt.key) {
        case 'ArrowLeft':
          changeIndex(index - 1, true);
          break;
        case 'ArrowRight':
          changeIndex(index + 1, true);
          break;
        case 'Escape':
          close();
          break;
      }
    }
  });
  function handlePhotoTap(closeable) {
    return closeable ? close() : updateState({
      overlay: !overlay
    });
  }
  function handleResize() {
    updateState({
      x: -(innerWidth + horizontalOffset) * index,
      lastCX: undefined,
      lastCY: undefined,
      pause: true
    });
    virtualIndexRef.current = index;
  }
  function handleReachVerticalMove(clientY, nextScale) {
    if (lastCY === undefined) {
      updateState({
        touched: true,
        lastCY: clientY,
        bg,
        minimal: true
      });
      return;
    }
    const opacity = maskOpacity === null ? null : limitNumber(maskOpacity, 0.01, maskOpacity - Math.abs(clientY - lastCY) / 100 / 4);
    updateState({
      touched: true,
      lastCY,
      bg: nextScale === 1 ? opacity : maskOpacity,
      minimal: nextScale === 1
    });
  }
  function handleReachHorizontalMove(clientX) {
    if (lastCX === undefined) {
      updateState({
        touched: true,
        lastCX: clientX,
        x,
        pause: false
      });
      return;
    }
    const originOffsetClientX = clientX - lastCX;
    let offsetClientX = originOffsetClientX;
    // 第一张和最后一张超出距离减半
    if (!enableLoop && (index === 0 && originOffsetClientX > 0 || index === imageLength - 1 && originOffsetClientX < 0)) {
      offsetClientX = originOffsetClientX / 2;
    }
    updateState({
      touched: true,
      lastCX,
      x: -(innerWidth + horizontalOffset) * virtualIndexRef.current + offsetClientX,
      pause: false
    });
  }
  function handleReachMove(reachPosition, clientX, clientY, nextScale) {
    if (reachPosition === 'x') {
      handleReachHorizontalMove(clientX);
    } else if (reachPosition === 'y') {
      handleReachVerticalMove(clientY, nextScale);
    }
  }
  function handleReachUp(clientX, clientY) {
    const offsetClientX = clientX - (lastCX ?? clientX);
    const offsetClientY = clientY - (lastCY ?? clientY);
    let willClose = false;
    // 下一张
    if (offsetClientX < -maxMoveOffset) {
      changeIndex(index + 1);
      return;
    }
    // 上一张
    if (offsetClientX > maxMoveOffset) {
      changeIndex(index - 1);
      return;
    }
    const singlePageWidth = innerWidth + horizontalOffset;
    // 当前偏移
    const currentTranslateX = -singlePageWidth * virtualIndexRef.current;
    if (Math.abs(offsetClientY) > 100 && minimal && pullClosable) {
      willClose = true;
      close();
    }
    updateState({
      touched: false,
      x: currentTranslateX,
      lastCX: undefined,
      lastCY: undefined,
      bg: maskOpacity,
      overlay: willClose ? true : overlay
    });
  }
  // 截取相邻的图片
  const adjacentImages = useAdjacentImages(images, index, enableLoop);
  // Обработчики для кликов по порталу
  const handlePortalMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    // Удаляем оба класса перед добавлением нового
    document.body.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
    // Добавляем класс в зависимости от положения курсора
    if (cursorX <= halfWidth) {
      document.body.classList.add('modal__nav-arrow--left');
    } else {
      document.body.classList.add('modal__nav-arrow--right');
    }
  };
  const handlePortalMouseLeave = e => {
    document.body.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
  };
  const handlePortalClick = e => {
    const target = e.target;
    // Не обрабатываем клики по элементам управления
    if (target?.closest('.PhotoView-Slider__BannerRight') || target?.closest('.PhotoView-Slider__ArrowLeft') || target?.closest('.PhotoView-Slider__ArrowRight')) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    // Переключаем слайд в зависимости от позиции клика
    if (cursorX <= halfWidth) {
      if (enableLoop || index !== 0) {
        changeIndex(index - 1, true);
      }
    } else {
      if (enableLoop || index + 1 < imageLength) {
        changeIndex(index + 1, true);
      }
    }
  };
  if (!realVisible) {
    return null;
  }
  const currentOverlayVisible = overlay && !activeAnimation;
  // 关闭过程中使用下拉保存的透明度
  const currentOpacity = visible ? bg : lastBg;
  // 覆盖物参数
  const overlayParams = onScale && onRotate && {
    images,
    index,
    visible,
    onClose: close,
    onIndexChange: changeIndex,
    overlayVisible: currentOverlayVisible,
    overlay: currentImage && currentImage.overlay,
    scale,
    rotate,
    onScale,
    onRotate
  };
  // 动画时间
  const currentSpeed = speedFn ? speedFn(activeAnimation) : defaultSpeed;
  const currentEasing = easingFn ? easingFn(activeAnimation) : defaultEasing;
  const slideSpeed = speedFn ? speedFn(3) : defaultSpeed + 200;
  const slideEasing = easingFn ? easingFn(3) : defaultEasing;
  return React.createElement(SlidePortal, {
    className: `PhotoView-Portal${!currentOverlayVisible ? ' PhotoView-Slider__clean' : ''}${!visible ? ' PhotoView-Slider__willClose' : ''}${className ? ` ${className}` : ''}`,
    role: "dialog",
    onClick: e => {
      e.stopPropagation();
      handlePortalClick(e);
    },
    onMouseMove: handlePortalMouseMove,
    onMouseLeave: handlePortalMouseLeave,
    container: portalContainer
  }, visible && React.createElement(PreventScroll, null), React.createElement("div", {
    className: `PhotoView-Slider__Backdrop${maskClassName ? ` ${maskClassName}` : ''}${activeAnimation === 1 ? ' PhotoView-Slider__fadeIn' : activeAnimation === 2 ? ' PhotoView-Slider__fadeOut' : ''}`,
    style: {
      background: currentOpacity ? `rgba(0, 0, 0, ${currentOpacity})` : undefined,
      transitionTimingFunction: currentEasing,
      transitionDuration: `${touched ? 0 : currentSpeed}ms`,
      animationDuration: `${currentSpeed}ms`
    },
    onAnimationEnd: onAnimationEnd
  }), bannerVisible && React.createElement("div", {
    className: "PhotoView-Slider__BannerWrap"
  }, React.createElement("div", {
    className: "PhotoView-Slider__Counter"
  }, index + 1, " / ", imageLength), React.createElement("div", {
    className: "PhotoView-Slider__BannerRight"
  }, toolbarRender && overlayParams && toolbarRender(overlayParams), React.createElement(CloseIcon, {
    className: "close",
    onClick: close
  }))), adjacentImages.map((item, currentIndex) => {
    // 截取之前的索引位置
    const nextIndex = !enableLoop && index === 0 ? index + currentIndex : virtualIndexRef.current - 1 + currentIndex;
    return React.createElement(PhotoBox, {
      key: enableLoop ? `${item.key}/${item.src}/${nextIndex}` : item.key,
      item: item,
      speed: currentSpeed,
      easing: currentEasing,
      visible: visible,
      onReachMove: handleReachMove,
      onReachUp: handleReachUp,
      onPhotoTap: () => handlePhotoTap(photoClosable),
      onMaskTap: () => handlePhotoTap(maskClosable),
      wrapClassName: photoWrapClassName,
      className: photoClassName,
      style: {
        left: `${(innerWidth + horizontalOffset) * nextIndex}px`,
        transform: `translate3d(${x}px, 0px, 0)`,
        transition: touched || pause ? undefined : `transform ${slideSpeed}ms ${slideEasing}`
      },
      loadingElement: loadingElement,
      brokenElement: brokenElement,
      onPhotoResize: handleResize,
      isActive: virtualIndexRef.current === nextIndex,
      expose: updateState
    });
  }), !isTouchDevice && bannerVisible && React.createElement(React.Fragment, null, (enableLoop || index !== 0) && React.createElement("div", {
    className: "PhotoView-Slider__ArrowLeft",
    onClick: () => changeIndex(index - 1, true)
  }, React.createElement(ArrowLeft, null)), (enableLoop || index + 1 < imageLength) && React.createElement("div", {
    className: "PhotoView-Slider__ArrowRight",
    onClick: () => changeIndex(index + 1, true)
  }, React.createElement(ArrowRight, null))), overlayRender && overlayParams && React.createElement("div", {
    className: "PhotoView-Slider__Overlay"
  }, overlayRender(overlayParams)));
}

const initialState = {
  images: [],
  visible: false,
  index: 0
};
function PhotoProvider({
  children,
  onIndexChange,
  onVisibleChange,
  ...restProps
}) {
  const [state, updateState] = useSetState(initialState);
  const uniqueIdRef = useRef(0);
  const {
    images,
    visible,
    index
  } = state;
  const methods = useMethods({
    nextId() {
      return uniqueIdRef.current += 1;
    },
    update(imageItem) {
      const currentIndex = images.findIndex(n => n.key === imageItem.key);
      if (currentIndex > -1) {
        const nextImages = images.slice();
        nextImages.splice(currentIndex, 1, imageItem);
        updateState({
          images: nextImages
        });
        return;
      }
      updateState(prev => ({
        images: prev.images.concat(imageItem)
      }));
    },
    remove(key) {
      updateState(prev => {
        const nextImages = prev.images.filter(item => item.key !== key);
        const nextEndIndex = nextImages.length - 1;
        return {
          images: nextImages,
          index: Math.min(nextEndIndex, index)
        };
      });
    },
    show(key) {
      const currentIndex = images.findIndex(item => item.key === key);
      updateState({
        visible: true,
        index: currentIndex
      });
      if (onVisibleChange) {
        onVisibleChange(true, currentIndex, state);
      }
    }
  });
  const fn = useMethods({
    close() {
      updateState({
        visible: false
      });
      if (onVisibleChange) {
        onVisibleChange(false, index, state);
      }
    },
    changeIndex(nextIndex) {
      updateState({
        index: nextIndex
      });
      if (onIndexChange) {
        onIndexChange(nextIndex, state);
      }
    }
  });
  const value = useMemo(() => ({
    ...state,
    ...methods
  }), [state, methods]);
  return React.createElement(PhotoContext.Provider, {
    value: value
  }, children, React.createElement(PhotoSlider, {
    images: images,
    visible: visible,
    index: index,
    onIndexChange: fn.changeIndex,
    onClose: fn.close,
    ...restProps
  }));
}

function useInitial(callback) {
  const {
    current
  } = useRef({
    sign: false,
    fn: undefined
  });
  if (!current.sign) {
    current.sign = true;
    current.fn = callback();
  }
  return current.fn;
}

const PhotoView = ({
  src,
  render,
  overlay,
  width,
  height,
  triggers = ['onClick'],
  children,
  title,
  description
}) => {
  const photoContext = useContext(PhotoContext);
  const key = useInitial(() => photoContext.nextId());
  const originRef = useRef(null);
  // useImperativeHandle((children as React.FunctionComponentElement<HTMLElement>)?.ref, () => originRef.current);
  useEffect(() => {
    return () => {
      photoContext.remove(key);
    };
  }, []);
  function invokeChildrenFn(eventName, e) {
    if (children) {
      const eventFn = children.props[eventName];
      if (eventFn) {
        eventFn(e);
      }
    }
  }
  const fn = useMethods({
    render(props) {
      return render && render(props);
    },
    show(eventName, e) {
      photoContext.show(key);
      invokeChildrenFn(eventName, e);
    }
  });
  const eventListeners = useMemo(() => {
    const listener = {};
    triggers.forEach(eventName => {
      listener[eventName] = fn.show.bind(null, eventName);
    });
    return listener;
  }, []);
  useEffect(() => {
    photoContext.update({
      key,
      src,
      originRef,
      render: fn.render,
      overlay,
      width,
      height,
      title,
      description
    });
  }, [src]);
  if (children) {
    return Children.only(cloneElement(children, {
      ...eventListeners,
      ref: originRef
    }));
  }
  return null;
};

export { PhotoProvider, PhotoSlider, PhotoView };
//# sourceMappingURL=react-photo-view.module.js.map
