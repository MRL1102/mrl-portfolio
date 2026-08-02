"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";
import "./CircularGallery.css";

type GalleryItem = { image: string; text?: string; href?: string };

type CircularGalleryProps = {
  items: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
};

// DOM-based circular gallery: the source JPEGs are rendered directly by the
// browser, while transforms preserve the curved, draggable presentation.
export default function CircularGallery({ items, bend = 3, borderRadius = 0.05, scrollSpeed = 2, scrollEase = 0.045 }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".circular-gallery__item"));
    let width = 1;
    let height = 1;
    let step = 420;
    let total = step * items.length;
    let current = step;
    let target = step;
    let frame = 0;
    let dragging = false;
    let dragged = false;
    let startX = 0;
    let startTarget = 0;

    const wrap = (value: number, size: number) => ((value + size / 2) % size + size) % size - size / 2;
    const resize = () => {
      width = Math.max(container.clientWidth, 1);
      height = Math.max(container.clientHeight, 1);
      const cardWidth = Math.min(440, Math.max(310, width * 0.285));
      const cardHeight = Math.min(height * 0.76, cardWidth * 1.42);
      step = cardWidth + Math.min(72, Math.max(42, width * 0.045));
      total = step * items.length;
      cards.forEach((card) => {
        card.style.width = `${cardWidth}px`;
        card.style.height = `${cardHeight}px`;
        card.style.borderRadius = `${Math.max(3, borderRadius * 420)}px`;
      });
    };
    const render = () => {
      current += (target - current) * scrollEase;
      cards.forEach((card, index) => {
        const x = wrap(index * step - current, total);
        const normalized = x / Math.max(width * 0.5, 1);
        const edge = Math.min(Math.abs(normalized), 1.35);
        const y = edge * edge * (38 + bend * 21);
        const rotation = -normalized * (3.5 + bend * 2.2);
        const scale = 1 - Math.min(0.08, edge * 0.035);
        card.style.transform = `translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),0) rotate(${rotation}deg) scale(${scale})`;
        card.style.zIndex = `${1000 - Math.round(Math.abs(x))}`;
        card.style.opacity = Math.abs(x) > width * 0.78 ? "0" : "1";
        card.style.pointerEvents = Math.abs(x) > width * 0.68 ? "none" : "auto";
      });
      frame = window.requestAnimationFrame(render);
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      target += Math.sign(event.deltaY || event.deltaX) * step * scrollSpeed * 0.42;
    };
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      dragged = false;
      startX = event.clientX;
      startTarget = target;
      container.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const delta = startX - event.clientX;
      if (Math.abs(delta) > 6) dragged = true;
      target = startTarget + delta * Math.max(0.75, scrollSpeed * 0.52);
    };
    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      container.releasePointerCapture?.(event.pointerId);
    };
    const onClickCapture = (event: globalThis.MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      event.stopPropagation();
      target += event.key === "ArrowRight" ? step : -step;
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("click", onClickCapture, true);
    container.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("click", onClickCapture, true);
      container.removeEventListener("keydown", onKeyDown);
    };
  }, [items, bend, borderRadius, scrollEase, scrollSpeed]);

  const preventImageDrag = (event: ReactMouseEvent<HTMLImageElement>) => event.preventDefault();
  return (
    <div ref={containerRef} className="circular-gallery" tabIndex={0} role="region" aria-label="科研成果画廊，可滚动或拖动浏览">
      {items.map((item, index) => {
        const content = <><img src={item.image} alt={item.text ?? `科研成果 ${index + 1}`} loading="eager" decoding="sync" draggable={false} onDragStart={preventImageDrag} />{item.href && item.text ? <span className="circular-gallery__link">{item.text}</span> : null}</>;
        const style = { "--gallery-order": index } as CSSProperties;
        return item.href ? <a className="circular-gallery__item" style={style} href={item.href} target="_blank" rel="noreferrer" key={item.image}>{content}</a> : <article className="circular-gallery__item" style={style} key={item.image}>{content}</article>;
      })}
    </div>
  );
}
