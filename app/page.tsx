"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CircularGallery from "./components/CircularGallery";
import MagicBento from "./components/MagicBento";
import ProfileCard from "./components/ProfileCard";

const slides = ["首页", "科研", "实习", "项目", "教育与优势", "生活", "联系"];
const internships = [
  ["2026.01—03", "北京炫图未来科技", "AI 产品增长运营", "冷启动竞品、用户行为和运营数据分析"],
  ["2025.10—12", "南京元数信息技术", "模型测评", "大模型生成、视频理解与 Prompt 验证"],
  ["2025.06—08", "兰州金石资源环境", "研究发展管理", "零碳园区与绿电直供的成本效益研究"],
  ["2025.03—05", "甘肃惠科资源环境", "工程咨询", "34 家化工企业现场核查与能效评估"],
];

const projects = [
  ["01", "Resume Copilot", "VIBE CODING / FULL STACK", "把繁琐网申变成自动化工作流：简历解析、字段匹配、自动填写与人工修正学习。", ["0→1 产品", "Codex", "AI Workflow"]],
  ["02", "巡河宝", "MULTIMODAL AI / DATA", "以 Ollama 部署 Qwen 多模态模型，完成图像 VQA、结构化输出、异常处理与百万级数据清洗。", ["Qwen", "Ollama", "VQA"]],
];

const lifePhotos = [
  { image: "/assets/life-basketball.jpg", alt: "篮球赛生活照", featured: true, fit: "contain" },
  { image: "/assets/life-changsha.jpg", alt: "长沙生活照", fit: "contain" },
  { image: "/assets/life-softball.jpg", alt: "校运会垒球掷远生活照", fit: "contain" },
  { image: "/assets/life-award.jpg", alt: "校运会获奖生活照", fit: "contain" },
  { image: "/assets/life-wushaoling.jpg", alt: "乌鞘岭生活照", fit: "contain" },
  { image: "/assets/life-binggouhe.jpg", alt: "冰沟河生活照", fit: "contain" },
  { image: "/assets/life-gangshika.jpg", alt: "岗什卡大本营生活照", featured: true, fit: "contain" },
];

const researchGalleryItems = [
  { image: "/assets/research-pages/research-01.png", href: "https://www.sciencedirect.com/science/article/pii/S0360132325016439" },
  { image: "/assets/research-pages/research-02.png" },
  { image: "/assets/research-pages/research-09.png" },
  { image: "/assets/research-pages/research-03.png" },
  { image: "/assets/research-pages/research-04.png" },
  { image: "/assets/research-pages/research-05.png" },
  { image: "/assets/research-pages/research-06.png" },
  { image: "/assets/research-pages/research-07.png" },
  { image: "/assets/research-pages/research-08.png" },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const locked = useRef(false);
  const touchStart = useRef(0);

  const goTo = useCallback((index: number) => setActive(Math.max(0, Math.min(slides.length - 1, index))), []);
  const move = useCallback((direction: number) => setActive((current) => Math.max(0, Math.min(slides.length - 1, current + direction))), []);

  useEffect(() => {
    const release = () => { locked.current = false; };
    const onWheel = (event: WheelEvent) => { event.preventDefault(); if (locked.current || Math.abs(event.deltaY) < 12) return; locked.current = true; move(event.deltaY > 0 ? 1 : -1); window.setTimeout(release, 760); };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); move(1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); move(-1); }
      if (event.key === "Home") { event.preventDefault(); goTo(0); }
      if (event.key === "End") { event.preventDefault(); goTo(slides.length - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false }); window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("wheel", onWheel); window.removeEventListener("keydown", onKey); };
  }, [goTo, move]);

  return (
    <main className="portfolio" onTouchStart={(event) => { touchStart.current = event.touches[0].clientY; }} onTouchEnd={(event) => { const delta = touchStart.current - event.changedTouches[0].clientY; if (Math.abs(delta) > 45) move(delta > 0 ? 1 : -1); }}>
      <nav className="top-nav" aria-label="作品集导航"><div className="nav-items">{slides.slice(1, 6).map((label, index) => <button key={label} className={active === index + 1 ? "active" : ""} onClick={() => goTo(index + 1)}>{label === "教育与优势" ? "优势" : label}</button>)}</div></nav>
      <aside className="page-rail" aria-label="页面进度">{slides.map((label, index) => <button key={label} onClick={() => goTo(index)} className={active === index ? "active" : ""} aria-label={`前往${label}`}><span>{String(index + 1).padStart(2, "0")}</span></button>)}</aside>

      <div className="deck" style={{ transform: `translate3d(0, -${active * 100}svh, 0)` }}>
        <section className={`slide hero-slide ${active === 0 ? "is-active" : ""}`} aria-label="首页">
          <div className="hero-backdrop" /><div className="hero-grain" />
          <div className="slide-inner hero-inner">
            <div className="hero-profile-copy">
              <p className="hero-kicker reveal r1">MARUILIANG / PERSONAL PORTFOLIO</p>
              <h1 className="hero-name reveal r2">马瑞良</h1>
              <p className="hero-role reveal r2">环境工程 · AI 产品 · 研究实践</p>
              <div className="hero-data reveal r3">
                <article><span>电话</span><b>156 2042 0698</b></article>
                <article><span>籍贯</span><b>天津市</b></article>
                <article><span>邮箱</span><b>mrl1102@163.com</b></article>
                <article><span>教育经历</span><b>兰州大学 · 环境工程硕士研究生<br />中国矿业大学 · 安全工程本科</b></article>
              </div>
              <button className="scroll-more reveal r4" onClick={() => move(1)}>下滑了解更多 <i>↓</i></button>
            </div>
            <div className="hero-profile-card reveal r3"><ProfileCard avatarUrl="/assets/profile-headshot.jpg" name="马瑞良" title="ENVIRONMENTAL ENGINEERING / AI" /></div>
          </div>
        </section>

        <section className={`slide research-slide ${active === 1 ? "is-active" : ""}`} aria-label="科研成果"><div className="research-backdrop" /><div className="research-circular"><CircularGallery items={researchGalleryItems} bend={2.35} borderRadius={0.018} scrollSpeed={2.3} scrollEase={0.04} /></div></section>

        <section className={`slide experience-slide ${active === 2 ? "is-active" : ""}`} aria-label="实习经历"><div className="workflow-backdrop" /><div className="slide-inner"><div className="experience-head"><div><p className="eyebrow reveal r1">02 / FIELD NOTES</p><h2 className="reveal r2">不只记录，<br />更进入<span>现场。</span></h2></div><p className="reveal r3">从产业现场到 AI 产品，<br />每一段实践都在校准我解决问题的方式。</p></div><div className="experience-grid">{internships.map((item, index) => <article className={`experience-card reveal r${index + 2}`} key={item[1]}><span>{item[0]}</span><div className="card-plus">+</div><h3>{item[1]}</h3><b>{item[2]}</b><p>{item[3]}</p></article>)}</div></div></section>

        <section className={`slide project-slide ${active === 3 ? "is-active" : ""}`} aria-label="项目经历"><div className="workflow-backdrop project-bg" /><div className="slide-inner"><div className="project-head"><p className="eyebrow reveal r1">03 / SELECTED WORK</p><h2 className="reveal r2">把想法做成<br /><span>可用的东西。</span></h2><p className="reveal r3">点击卡片，查看项目关键词。</p></div><div className="project-list">{projects.map((project, index) => <button type="button" onClick={() => setSelectedProject(index)} className={`project-card reveal r${index + 2} ${selectedProject === index ? "selected" : ""}`} key={project[0]}><span className="project-index">{project[0]}</span><div className="project-orb"><i /><i /><i /></div><div className="project-copy"><p>{project[2]}</p><h3>{project[1]}</h3><span>{project[3]}</span><div className="project-tags">{project[4].map((tag) => <b key={tag}>{tag}</b>)}</div></div><em>查看<br />焦点 ↗</em></button>)}</div></div></section>

        <section className={`slide strength-slide ${active === 4 ? "is-active" : ""}`} aria-label="教育与个人优势"><div className="education-backdrop" /><div className="slide-inner strength-inner"><div className="education-head reveal r1"><p className="eyebrow">04 / EDUCATION & STRENGTHS</p><h2>把专业训练，<br />变成持续的<span>能力。</span></h2></div><div className="education-timeline reveal r2"><article><span>2024 — NOW</span><h3>兰州大学</h3><p>环境工程 · 硕士研究生</p></article><article><span>2020 — 2024</span><h3>中国矿业大学</h3><p>安全工程 · 本科<br />A+ 学科 / 全国第一</p></article></div><div className="strengths">{[["01", "研究到落地", "把抽象问题变成可验证、可执行的路径。"], ["02", "AI Native", "以 Prompt、模型评测和 Vibe Coding 重构工作流。"], ["03", "推动发生", "20+ 场校院活动统筹经验，在限制中推进结果。"]].map((item, index) => <article className={`reveal r${index + 3}`} key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><i>↗</i></article>)}</div></div></section>

        <section className={`slide life-slide ${active === 5 ? "is-active" : ""}`} aria-label="生活与兴趣"><div className="life-wash" /><div className="life-bento-wrap"><MagicBento items={lifePhotos} className="life-bento" showCursor /></div></section>

        <section className={`slide contact-slide ${active === 6 ? "is-active" : ""}`} aria-label="联系方式"><div className="education-backdrop contact-bg" /><div className="contact-spark" /><div className="slide-inner contact-inner"><p className="eyebrow reveal r1">06 / LET&apos;S MAKE THINGS HAPPEN</p><h2 className="reveal r2">下一个好问题，<br />从一封<span>邮件</span>开始。</h2><a className="email-link reveal r3" href="mailto:mrl1102@163.com">mrl1102@163.com <i>↗</i></a><div className="contact-data reveal r4"><p>马瑞良 / MRL<br />LANZHOU UNIVERSITY</p><p>156 2042 0698<br />TIANJIN, CHINA</p><button onClick={() => goTo(0)}>回到首页 ↑</button></div></div></section>
      </div>
    </main>
  );
}
