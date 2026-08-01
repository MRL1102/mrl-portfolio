"use client";

import { gsap } from "gsap";
import { useRef, type CSSProperties, type MouseEvent, type RefObject, type WheelEvent } from "react";
import "./MagicBento.css";

export type MagicBentoItem = {
  image: string;
  alt: string;
  title?: string;
  label?: string;
  href?: string;
  featured?: boolean;
};

type MagicBentoProps = {
  items: MagicBentoItem[];
  className?: string;
  scrollable?: boolean;
  glowColor?: string;
};

function MagicBentoCard({ item, glowColor }: { item: MagicBentoItem; glowColor: string }) {
  const cardRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  const clearParticles = () => {
    particlesRef.current.forEach((particle) => gsap.to(particle, { opacity: 0, scale: 0, duration: 0.24, onComplete: () => particle.remove() }));
    particlesRef.current = [];
  };
  const onEnter = () => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(max-width: 768px)").matches) return;
    const { width, height } = card.getBoundingClientRect();
    particlesRef.current = Array.from({ length: 10 }, () => {
      const particle = document.createElement("i");
      particle.className = "magic-bento-particle";
      particle.style.left = `${Math.random() * width}px`;
      particle.style.top = `${Math.random() * height}px`;
      particle.style.setProperty("--particle-color", glowColor);
      card.appendChild(particle);
      gsap.fromTo(particle, { opacity: 0, scale: 0 }, { opacity: 0.92, scale: 1, duration: 0.26, ease: "back.out(1.7)" });
      gsap.to(particle, { x: (Math.random() - 0.5) * 86, y: (Math.random() - 0.5) * 86, duration: 2 + Math.random() * 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      return particle;
    });
  };
  const onMove = (event: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
    gsap.to(card, { rotateX: ((y - rect.height / 2) / rect.height) * -5, rotateY: ((x - rect.width / 2) / rect.width) * 5, x: (x - rect.width / 2) * 0.018, y: (y - rect.height / 2) * 0.018, duration: 0.18, ease: "power2.out", transformPerspective: 1100 });
  };
  const onLeave = () => {
    clearParticles();
    if (cardRef.current) gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.36, ease: "power2.out" });
  };
  const onClick = (event: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const radius = Math.max(Math.hypot(event.clientX - rect.left, event.clientY - rect.top), Math.hypot(event.clientX - rect.right, event.clientY - rect.bottom));
    const ripple = document.createElement("i");
    ripple.className = "magic-bento-ripple";
    ripple.style.width = `${radius * 2}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.style.setProperty("--particle-color", glowColor);
    card.appendChild(ripple);
    gsap.fromTo(ripple, { opacity: 0.85, scale: 0 }, { opacity: 0, scale: 1, duration: 0.72, ease: "power2.out", onComplete: () => ripple.remove() });
  };
  const content = <><img src={item.image} alt={item.alt} loading="eager" decoding="sync" /><span className="magic-bento-shade" />{(item.label || item.title) && <div className="magic-bento-copy">{item.label && <small>{item.label}</small>}{item.title && <h3>{item.title}</h3>}</div>}</>;
  const className = `magic-bento-card${item.featured ? " is-featured" : ""}`;
  const style = { "--magic-glow": glowColor } as CSSProperties;
  if (item.href) return <a ref={cardRef as unknown as RefObject<HTMLAnchorElement>} className={className} style={style} href={item.href} target="_blank" rel="noreferrer" onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>{content}</a>;
  return <article ref={cardRef} className={className} style={style} onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>{content}</article>;
}

export default function MagicBento({ items, className = "", scrollable = false, glowColor = "184, 223, 114" }: MagicBentoProps) {
  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!scrollable) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.scrollLeft += event.deltaY;
  };
  return <div className={`magic-bento-grid${scrollable ? " is-scrollable" : ""} ${className}`} onWheel={onWheel}>{items.map((item) => <MagicBentoCard key={item.image} item={item} glowColor={glowColor} />)}</div>;
}
