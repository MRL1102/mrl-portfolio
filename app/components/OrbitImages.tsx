"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import "./OrbitImages.css";

type OrbitImagesProps = {
  images: string[];
  altPrefix?: string;
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: "normal" | "reverse";
  paused?: boolean;
  centerContent?: ReactNode;
  className?: string;
};

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

export default function OrbitImages({
  images,
  altPrefix = "生活照片",
  radiusX = 500,
  radiusY = 190,
  rotation = -7,
  duration = 30,
  itemSize = 170,
  direction = "normal",
  paused = false,
  centerContent,
  className = "",
}: OrbitImagesProps) {
  const baseWidth = 1400;
  const center = baseWidth / 2;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const progress = useMotionValue(0);
  const path = useMemo(() => ellipsePath(center, center, radiusX, radiusY), [center, radiusX, radiusY]);

  useLayoutEffect(() => {
    const updateScale = () => setScale((containerRef.current?.clientWidth || baseWidth) / baseWidth);
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === "reverse" ? -100 : 100, { duration, ease: "linear", repeat: Infinity, repeatType: "loop" });
    return () => controls.stop();
  }, [direction, duration, paused, progress]);

  return (
    <div ref={containerRef} className={`orbit-container ${className}`} aria-hidden="true">
      <div className="orbit-scaling-container" style={{ width: baseWidth, height: baseWidth, transform: `translate(-50%, -50%) scale(${scale})`, visibility: scale ? "visible" : "hidden" }}>
        <div className="orbit-rotation-wrapper" style={{ transform: `rotate(${rotation}deg)` }}>
          {images.map((src, index) => <OrbitItem key={`${src}-${index}`} src={src} index={index} total={images.length} path={path} itemSize={itemSize} progress={progress} rotation={rotation} alt={`${altPrefix} ${index + 1}`} />)}
        </div>
      </div>
      {centerContent && <div className="orbit-center-content">{centerContent}</div>}
    </div>
  );
}

function OrbitItem({ src, index, total, path, itemSize, progress, rotation, alt }: { src: string; index: number; total: number; path: string; itemSize: number; progress: ReturnType<typeof useMotionValue>; rotation: number; alt: string }) {
  const offsetDistance = useTransform(progress, (value) => `${(((value + (index / total) * 100) % 100) + 100) % 100}%`);
  return <motion.div className="orbit-item" style={{ width: itemSize, height: itemSize, offsetPath: `path("${path}")`, offsetRotate: "0deg", offsetAnchor: "center center", offsetDistance } as never}><div style={{ transform: `rotate(${-rotation}deg)` }}><img src={src} alt={alt} draggable={false} className="orbit-image" /></div></motion.div>;
}
