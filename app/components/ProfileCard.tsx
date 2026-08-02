"use client";

import { useRef } from "react";
import "./ProfileCard.css";

type ProfileCardProps = {
  avatarUrl: string;
};

export default function ProfileCard({ avatarUrl }: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const resetCard = () => {
    cardRef.current?.style.setProperty("--rotate-x", "0deg");
    cardRef.current?.style.setProperty("--rotate-y", "0deg");
    cardRef.current?.style.setProperty("--pointer-x", "50%");
    cardRef.current?.style.setProperty("--pointer-y", "50%");
  };

  const moveCard = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    card.style.setProperty("--pointer-x", `${x}%`);
    card.style.setProperty("--pointer-y", `${y}%`);
    card.style.setProperty("--rotate-x", `${(50 - y) / 7}deg`);
    card.style.setProperty("--rotate-y", `${(x - 50) / 7}deg`);
  };

  return (
    <div className="profile-card-wrap">
      <div className="profile-card-glow" aria-hidden="true" />
      <div ref={cardRef} className="profile-card" onPointerMove={moveCard} onPointerLeave={resetCard}>
        <img className="profile-card-avatar" src={avatarUrl} alt="马瑞良证件照" />
        <div className="profile-card-foil" aria-hidden="true" />
        <div className="profile-card-grain" aria-hidden="true" />
        <div className="profile-card-top">
          <span>PERSONAL FILE</span>
          <b>2026</b>
        </div>
      </div>
    </div>
  );
}
