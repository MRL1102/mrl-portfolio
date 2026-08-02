"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import "./ShinyText.css";

type ShinyTextProps = {
  text: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function ShinyText({ text, color = "#d7d9d5", shineColor = "#ffffff", speed = 2.4, delay = 1.2, spread = 120, direction = "left", yoyo = false, pauseOnHover = false, disabled = false, className = "" }: ShinyTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const lastTime = useRef<number | null>(null);
  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;
  useAnimationFrame((time) => {
    if (disabled || isPaused) { lastTime.current = null; return; }
    if (lastTime.current === null) { lastTime.current = time; return; }
    elapsed.current += time - lastTime.current;
    lastTime.current = time;
    const cycleDuration = animationDuration + delayDuration;
    const cycleTime = elapsed.current % (yoyo ? cycleDuration * 2 : cycleDuration);
    let value = cycleTime < animationDuration ? cycleTime / animationDuration * 100 : 100;
    if (yoyo && cycleTime >= cycleDuration) value = cycleTime - cycleDuration < animationDuration ? 100 - (cycleTime - cycleDuration) / animationDuration * 100 : 0;
    progress.set(direction === "left" ? value : 100 - value);
  });
  useEffect(() => { elapsed.current = 0; progress.set(0); }, [direction, progress]);
  const backgroundPosition = useTransform(progress, (value) => `${150 - value * 2}% center`);
  const onEnter = useCallback(() => { if (pauseOnHover) setIsPaused(true); }, [pauseOnHover]);
  const onLeave = useCallback(() => { if (pauseOnHover) setIsPaused(false); }, [pauseOnHover]);
  return <motion.span className={`shiny-text ${className}`} style={{ backgroundImage:`linear-gradient(${spread}deg,${color} 0%,${color} 35%,${shineColor} 50%,${color} 65%,${color} 100%)`, backgroundPosition }} onMouseEnter={onEnter} onMouseLeave={onLeave}>{text}</motion.span>;
}
