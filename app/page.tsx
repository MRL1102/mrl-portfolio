"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CircularGallery from "./components/CircularGallery";
import MagicBento from "./components/MagicBento";
import ProfileCard from "./components/ProfileCard";
import ShinyText from "./components/ShinyText";
import { ExperienceTimeline, ProjectTimeline } from "./components/TimelineExperience";
import { internshipTimeline, projectTimeline } from "./data/timeline";

const assetBase = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";
const asset = (path: string) => `${assetBase}assets/${path}`;

const slides = ["首页", "科研", "实习", "项目", "生活", "联系"];
const lifePhotos = [
  { image: asset("life-gangshika.jpg"), alt: "岗什卡大本营生活照", fit: "contain" as const },
  { image: asset("life-wushaoling.jpg"), alt: "乌鞘岭生活照", fit: "contain" as const },
  { image: asset("life-basketball.jpg"), alt: "篮球赛生活照", fit: "contain" as const },
  { image: asset("life-binggouhe.jpg"), alt: "冰沟河徒步生活照", fit: "contain" as const },
  { image: asset("life-softball.jpg"), alt: "运动场生活照", fit: "contain" as const },
  { image: asset("life-changsha.jpg"), alt: "长沙旅行生活照", fit: "contain" as const },
];

const researchGalleryItems = [
  { image: asset("research-original/research-01.jpg"), text: "论文原文 ↗", href: "https://www.sciencedirect.com/science/article/pii/S0360132325016439" },
  { image: asset("research-original/research-09.jpg") },
  { image: asset("research-original/research-02.jpg") },
  { image: asset("research-original/research-03.jpg") },
  { image: asset("research-original/research-04.jpg") },
  { image: asset("research-original/research-05.jpg") },
  { image: asset("research-original/research-06.jpg") },
  { image: asset("research-original/research-07.jpg") },
  { image: asset("research-original/research-08.jpg") },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const locked = useRef(false);
  const touchStart = useRef(0);

  const goTo = useCallback((index: number) => setActive(Math.max(0, Math.min(slides.length - 1, index))), []);
  const move = useCallback((direction: number) => setActive((current) => Math.max(0, Math.min(slides.length - 1, current + direction))), []);

  useEffect(() => {
    const release = () => { locked.current = false; };
    const onWheel = (event: WheelEvent) => { if (dialogOpen) return; event.preventDefault(); if (locked.current || Math.abs(event.deltaY) < 12) return; locked.current = true; move(event.deltaY > 0 ? 1 : -1); window.setTimeout(release, 760); };
    const onKey = (event: KeyboardEvent) => {
      if (dialogOpen) return;
      if (["ArrowDown", "ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); move(1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); move(-1); }
      if (event.key === "Home") { event.preventDefault(); goTo(0); }
      if (event.key === "End") { event.preventDefault(); goTo(slides.length - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false }); window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("wheel", onWheel); window.removeEventListener("keydown", onKey); };
  }, [dialogOpen, goTo, move]);

  return (
    <main className={`portfolio${dialogOpen ? " is-dialog-open" : ""}`} aria-hidden={dialogOpen || undefined} onTouchStart={(event) => { if (!dialogOpen) touchStart.current = event.touches[0].clientY; }} onTouchEnd={(event) => { if (dialogOpen) return; const delta = touchStart.current - event.changedTouches[0].clientY; if (Math.abs(delta) > 45) move(delta > 0 ? 1 : -1); }}>
      <nav className="top-nav" aria-label="作品集导航"><div className="nav-items">{slides.slice(1, 5).map((label, index) => <button key={label} className={active === index + 1 ? "active" : ""} onClick={() => goTo(index + 1)}>{label}</button>)}</div></nav>
      <aside className="page-rail" aria-label="页面进度">{slides.map((label, index) => <button key={label} onClick={() => goTo(index)} className={active === index ? "active" : ""} aria-label={`前往${label}`}><span>{String(index + 1).padStart(2, "0")}</span></button>)}</aside>

      <div className="deck" style={{ transform: `translate3d(0, -${active * 100}svh, 0)` }}>
        <section className={`slide hero-slide ${active === 0 ? "is-active" : ""}`} aria-label="首页">
          <div className="hero-backdrop" /><div className="hero-grain" />
          <div className="slide-inner hero-inner">
            <div className="hero-profile-copy">
              <p className="hero-kicker reveal r1">MARUILIANG / PERSONAL PORTFOLIO</p>
              <h1 className="hero-name reveal r2">马瑞良</h1>
              <div className="hero-data reveal r3">
                <article><span>电话</span><b>156 2042 0698</b></article>
                <article><span>籍贯</span><b>天津市</b></article>
                <article><span>邮箱</span><b>mrl1102@163.com</b></article>
                <article><span>教育经历</span><b className="education-value"><em>兰州大学</em><i>环境工程　硕士</i><em>中国矿业大学</em><i>安全工程　本科</i></b></article>
                <article><span>政治面貌</span><b>中共预备党员</b></article>
              </div>
            </div>
            <div className="hero-profile-card reveal r3"><ProfileCard avatarUrl={asset("profile-headshot.jpg")} /></div>
          </div>
        </section>

        <section className={`slide research-slide ${active === 1 ? "is-active" : ""}`} aria-label="科研成果"><div className="research-backdrop" /><div className="research-circular"><CircularGallery items={researchGalleryItems} bend={2.35} borderRadius={0.018} scrollSpeed={2.3} scrollEase={0.04} /></div></section>

        <section className={`slide experience-slide ${active === 2 ? "is-active" : ""}`} aria-label="实习经历"><div className="workflow-backdrop" /><ExperienceTimeline entries={internshipTimeline} isActive={active === 2} onDialogOpenChange={setDialogOpen} /></section>

        <section className={`slide project-slide ${active === 3 ? "is-active" : ""}`} aria-label="项目经历"><div className="workflow-backdrop project-bg" /><ProjectTimeline entries={projectTimeline} isActive={active === 3} onDialogOpenChange={setDialogOpen} /></section>

        <section className={`slide strength-slide ${active === 4 ? "is-active" : ""}`} aria-label="教育与个人优势"><div className="education-backdrop" /><div className="slide-inner strength-inner"><div className="education-head reveal r1"><p className="eyebrow">04 / EDUCATION & STRENGTHS</p><h2>把专业训练，<br />变成持续的<span>能力。</span></h2></div><div className="education-timeline reveal r2"><article><span>2024 — NOW</span><h3>兰州大学</h3><p>环境工程 · 硕士研究生</p></article><article><span>2020 — 2024</span><h3>中国矿业大学</h3><p>安全工程 · 本科<br />A+ 学科 / 全国第一</p></article></div><div className="strengths">{[["01", "研究到落地", "把抽象问题变成可验证、可执行的路径。"], ["02", "AI Native", "以 Prompt、模型评测和 Vibe Coding 重构工作流。"], ["03", "推动发生", "20+ 场校院活动统筹经验，在限制中推进结果。"]].map((item, index) => <article className={`reveal r${index + 3}`} key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><i>↗</i></article>)}</div></div></section>

        <section className={`slide life-slide ${active === 4 ? "is-active" : ""}`} aria-label="生活与兴趣"><div className="life-wash" /><div className="life-bento-wrap"><MagicBento items={lifePhotos} className="life-bento" /></div></section>

        <section className={`slide contact-slide ${active === 5 ? "is-active" : ""}`} aria-label="联系方式"><div className="education-backdrop contact-bg" /><div className="slide-inner contact-inner"><p className="eyebrow reveal r1">06 / LET&apos;S MAKE THINGS HAPPEN</p><h2 className="reveal r2">下一个好问题，<br />从一封<span>邮件</span>开始。</h2><a className="email-link reveal r3" href="mailto:mrl1102@163.com"><ShinyText text="mrl1102@163.com" speed={1.15} delay={0.3} color="#eef0e9" shineColor="#b8df72" pauseOnHover /></a><div className="contact-data reveal r4"><p>Marell<br />LANZHOU UNIVERSITY</p><p>156 2042 0698<br />TIANJIN, CHINA</p></div></div></section>
      </div>
    </main>
  );
}
