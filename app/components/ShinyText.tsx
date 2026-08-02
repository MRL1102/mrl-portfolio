"use client";

import { useAnimationFrame, useMotionValue, useTransform, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./ShinyText.css";

type ShinyTextProps = {
  text: string;
  className?: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
};

export default function ShinyText({ text, className = "", color = "#eef0e9", shineColor = "#ffffff", speed = 3.2, delay = 3.5 }: ShinyTextProps) {
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const previous = useRef<number | null>(null);
  useAnimationFrame((time) => {
    if (paused) { previous.current = null; return; }
    if (previous.current === null) { previous.current = time; return; }
    elapsed.current += time - previous.current;
    previous.current = time;
    const duration = speed * 1000 + delay * 1000;
    progress.set((elapsed.current % duration) / duration * 100);
  });
  useEffect(() => { elapsed.current = 0; progress.set(0); }, [delay, progress, speed]);
  const backgroundPosition = useTransform(progress, (value) => `${155 - value * 2.1}% center`);
  return <motion.span className={`shiny-text ${className}`} style={{ backgroundImage:`linear-gradient(118deg,${color} 0%,${color} 39%,${shineColor} 50%,${color} 61%,${color} 100%)`, backgroundPosition }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>{text}</motion.span>;
}
