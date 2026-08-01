"use client";

import { useEffect, useRef } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import "./CircularGallery.css";

type GalleryItem = { image: string; text?: string };

type CircularGalleryProps = {
  items: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
};

// Adapted from React Bits' CircularGallery. Labels are intentionally omitted
// in this portfolio variant so the images occupy the page on their own.
export default function CircularGallery({ items, bend = 3, borderRadius = 0.05, scrollSpeed = 2, scrollEase = 0.045 }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;
    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 3) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);
    const camera = new Camera(gl);
    camera.fov = 45;
    camera.position.z = 20;
    const scene = new Transform();
    const geometry = new Plane(gl, { heightSegments: 48, widthSegments: 80 });
    const scroll = { current: 0, target: 0 };
    const repeatedItems = [...items, ...items, ...items];
    let viewport = { width: 1, height: 1 };
    let cardWidth = 1;
    let totalWidth = 1;
    let raf = 0;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const vertex = `precision highp float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
    const fragment = `precision highp float; uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; uniform sampler2D tMap; uniform float uBorderRadius; varying vec2 vUv; float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;} void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*.5,vUv.y*ratio.y+(1.0-ratio.y)*.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-.5,vec2(.5-uBorderRadius),uBorderRadius);float alpha=1.0-smoothstep(-.002,.002,d);gl_FragColor=vec4(color.rgb,alpha);}`;

    const medias = repeatedItems.map((item, index) => {
      const texture = new Texture(gl, { generateMipmaps: true });
      const program = new Program(gl, { depthTest: false, depthWrite: false, transparent: true, vertex, fragment, uniforms: { tMap: { value: texture }, uImageSizes: { value: [1, 1] }, uPlaneSizes: { value: [1, 1] }, uBorderRadius: { value: borderRadius } } });
      const image = new Image();
      image.src = item.image;
      image.onload = () => { texture.image = image; program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight]; };
      const plane = new Mesh(gl, { geometry, program });
      plane.setParent(scene);
      return { plane, program, index };
    });

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
      const fov = (camera.fov * Math.PI) / 180;
      viewport.height = 2 * Math.tan(fov / 2) * camera.position.z;
      viewport.width = viewport.height * camera.aspect;
      const scale = height / 1500;
      const planeHeight = (viewport.height * (900 * scale)) / height;
      const planeWidth = (viewport.width * (700 * scale)) / width;
      cardWidth = planeWidth + 1.9;
      totalWidth = cardWidth * medias.length;
      medias.forEach((media) => { media.plane.scale.set(planeWidth, planeHeight, 1); media.program.uniforms.uPlaneSizes.value = [planeWidth, planeHeight]; });
    };
    const wrap = (value: number, size: number) => ((value + size / 2) % size + size) % size - size / 2;
    const render = () => {
      scroll.current += (scroll.target - scroll.current) * scrollEase;
      medias.forEach((media) => {
        const x = wrap(media.index * cardWidth - scroll.current, totalWidth);
        media.plane.position.x = x;
        if (bend) {
          const half = viewport.width / 2;
          const b = Math.abs(bend);
          const radius = (half * half + b * b) / (2 * b);
          const effectiveX = Math.min(Math.abs(x), half);
          const arc = radius - Math.sqrt(Math.max(radius * radius - effectiveX * effectiveX, 0));
          media.plane.position.y = bend > 0 ? -arc : arc;
          media.plane.rotation.z = (bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(Math.min(effectiveX / radius, 1));
        }
      });
      renderer.render({ scene, camera });
      raf = window.requestAnimationFrame(render);
    };
    const onWheel = (event: WheelEvent) => { event.preventDefault(); event.stopPropagation(); scroll.target += Math.sign(event.deltaY) * scrollSpeed * 2.5; };
    const onPointerDown = (event: PointerEvent) => { dragging = true; startX = event.clientX; startScroll = scroll.target; container.setPointerCapture(event.pointerId); };
    const onPointerMove = (event: PointerEvent) => { if (dragging) scroll.target = startScroll + (startX - event.clientX) * scrollSpeed * 0.025; };
    const onPointerUp = (event: PointerEvent) => { dragging = false; container.releasePointerCapture?.(event.pointerId); };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); event.stopPropagation(); scroll.target += event.key === "ArrowRight" ? scrollSpeed * 5 : -scrollSpeed * 5; } };
    resize(); render();
    window.addEventListener("resize", resize);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("keydown", onKeyDown);
    return () => { window.cancelAnimationFrame(raf); window.removeEventListener("resize", resize); container.removeEventListener("wheel", onWheel); container.removeEventListener("pointerdown", onPointerDown); container.removeEventListener("pointermove", onPointerMove); container.removeEventListener("pointerup", onPointerUp); container.removeEventListener("pointercancel", onPointerUp); container.removeEventListener("keydown", onKeyDown); gl.canvas.remove(); };
  }, [items, bend, borderRadius, scrollEase, scrollSpeed]);
  return <div ref={containerRef} className="circular-gallery" tabIndex={0} role="region" aria-label="生活照片画廊，可滚动或拖动浏览" />;
}
