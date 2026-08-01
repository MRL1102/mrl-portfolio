"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import OrbitImages from "./components/OrbitImages";

const slides = ["首页", "科研", "实习", "项目", "教育与优势", "生活", "联系"];
const quotes = [
  { text: "教育不是注满一桶水，\n而是点燃一把火。", author: "W. B. 叶芝" },
  { text: "最重要的问题，\n往往不是已经有答案的问题。", author: "阿尔伯特·爱因斯坦" },
  { text: "真正的发现之旅，\n不在于寻找新的风景。", author: "马塞尔·普鲁斯特" },
  { text: "世界上那些最容易的事情中，\n拖延时间最不费力。", author: "塞缪尔·约翰逊" },
];

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

export default function Home() {
  const [active, setActive] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [lifePaused, setLifePaused] = useState(false);
  const locked = useRef(false);
  const touchStart = useRef(0);
  const quote = quotes[quoteIndex];

  const goTo = useCallback((index: number) => setActive(Math.max(0, Math.min(slides.length - 1, index))), []);
  const move = useCallback((direction: number) => setActive((current) => Math.max(0, Math.min(slides.length - 1, current + direction))), []);

  useEffect(() => { setQuoteIndex(Math.floor(Math.random() * quotes.length)); }, []);
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
          <div className="slide-inner hero-inner"><p className="quote-label reveal r1">A THOUGHT FOR TODAY / 2026</p><h1 className="quote-text reveal r2">{quote.text.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p className="quote-author reveal r3">— {quote.author}</p><button className="scroll-more reveal r4" onClick={() => move(1)}>下滑了解更多 <i>↓</i></button></div>
        </section>

        <section className={`slide research-slide ${active === 1 ? "is-active" : ""}`} aria-label="科研成果"><div className="research-backdrop" /><div className="slide-inner research-inner"><div className="research-heading reveal r1"><p className="eyebrow">01 / RESEARCH OUTPUT</p><h2>研究不仅产出成果，<br />也留下<span>方法。</span></h2></div><div className="research-grid">
          <a className="research-feature paper-feature reveal r2" href="https://www.sciencedirect.com/science/article/pii/S0360132325016439" target="_blank" rel="noreferrer"><img src="/assets/research-paper.jpg" alt="SCI 论文首页" /><div className="research-overlay"><span>SCI / FIRST AUTHOR / 2026</span><h3>Indoor pollutant<br />dispersion pathways</h3><p>提出可解释的 X-GAT-GRU 框架，利用真实居住环境传感器数据，动态解析室内 PM₂.₅ 扩散路径。</p><b>阅读论文 <i>↗</i></b></div></a>
          <article className="research-feature patent-feature reveal r3"><img src="/assets/research-patent.png" alt="发明专利申请通知书" /><div className="research-overlay"><span>INVENTION PATENTS / 02</span><h3>发明专利</h3><div className="patent-status"><p><b>01</b><em>已授权</em><small>室内环境智能监测相关技术</small></p><p><b>02</b><em>申请中</em><small>低碳与环境数据分析相关技术</small></p></div><b>查看状态 <i>↗</i></b></div></article>
          <article className="research-feature copyright-feature reveal r4"><img src="/assets/research-copyright.png" alt="计算机软件著作权登记证书" /><div className="research-overlay"><span>SOFTWARE COPYRIGHT / 06</span><h3>授权成果</h3><p>作为第二著作权人，参与《建筑室内空气净化效能评估与优化平台 V1.0》等 6 项软件著作权。</p><b>证书一览 <i>↗</i></b></div></article>
        </div></div></section>

        <section className={`slide experience-slide ${active === 2 ? "is-active" : ""}`} aria-label="实习经历"><div className="workflow-backdrop" /><div className="slide-inner"><div className="experience-head"><div><p className="eyebrow reveal r1">02 / FIELD NOTES</p><h2 className="reveal r2">不只记录，<br />更进入<span>现场。</span></h2></div><p className="reveal r3">从产业现场到 AI 产品，<br />每一段实践都在校准我解决问题的方式。</p></div><div className="experience-grid">{internships.map((item, index) => <article className={`experience-card reveal r${index + 2}`} key={item[1]}><span>{item[0]}</span><div className="card-plus">+</div><h3>{item[1]}</h3><b>{item[2]}</b><p>{item[3]}</p></article>)}</div></div></section>

        <section className={`slide project-slide ${active === 3 ? "is-active" : ""}`} aria-label="项目经历"><div className="workflow-backdrop project-bg" /><div className="slide-inner"><div className="project-head"><p className="eyebrow reveal r1">03 / SELECTED WORK</p><h2 className="reveal r2">把想法做成<br /><span>可用的东西。</span></h2><p className="reveal r3">点击卡片，查看项目关键词。</p></div><div className="project-list">{projects.map((project, index) => <button type="button" onClick={() => setSelectedProject(index)} className={`project-card reveal r${index + 2} ${selectedProject === index ? "selected" : ""}`} key={project[0]}><span className="project-index">{project[0]}</span><div className="project-orb"><i /><i /><i /></div><div className="project-copy"><p>{project[2]}</p><h3>{project[1]}</h3><span>{project[3]}</span><div className="project-tags">{project[4].map((tag) => <b key={tag}>{tag}</b>)}</div></div><em>查看<br />焦点 ↗</em></button>)}</div></div></section>

        <section className={`slide strength-slide ${active === 4 ? "is-active" : ""}`} aria-label="教育与个人优势"><div className="education-backdrop" /><div className="slide-inner strength-inner"><div className="education-head reveal r1"><p className="eyebrow">04 / EDUCATION & STRENGTHS</p><h2>把专业训练，<br />变成持续的<span>能力。</span></h2></div><div className="education-timeline reveal r2"><article><span>2024 — NOW</span><h3>兰州大学</h3><p>环境工程 · 硕士研究生</p></article><article><span>2020 — 2024</span><h3>中国矿业大学</h3><p>安全工程 · 本科<br />A+ 学科 / 全国第一</p></article></div><div className="strengths">{[["01", "研究到落地", "把抽象问题变成可验证、可执行的路径。"], ["02", "AI Native", "以 Prompt、模型评测和 Vibe Coding 重构工作流。"], ["03", "推动发生", "20+ 场校院活动统筹经验，在限制中推进结果。"]].map((item, index) => <article className={`reveal r${index + 3}`} key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><i>↗</i></article>)}</div></div></section>

        <section className={`slide life-slide ${active === 5 ? "is-active" : ""}`} aria-label="生活与兴趣"><div className="life-wash" /><div className="slide-inner life-inner"><p className="eyebrow life-kicker reveal r1">05 / OFF THE CLOCK</p><div className="life-orbit reveal r2" onMouseEnter={() => setLifePaused(true)} onMouseLeave={() => setLifePaused(false)}><OrbitImages images={["/assets/life-basketball.jpg", "/assets/life-award.jpg", "/assets/life-mountain.jpg", "/assets/life-basketball.jpg", "/assets/life-award.jpg", "/assets/life-mountain.jpg"]} radiusX={490} radiusY={180} rotation={-8} duration={34} itemSize={178} paused={lifePaused} className="life-orbit-images" centerContent={<div className="life-center"><h2>球场、山野<br />与<span>正在发生。</span></h2><p>研究之外，也在真实的现场里<br />保持好奇、热爱与行动。</p><b>{lifePaused ? "PAUSED / EXPLORE" : "ORBITING / MEMORIES"}</b></div>} /></div></div></section>

        <section className={`slide contact-slide ${active === 6 ? "is-active" : ""}`} aria-label="联系方式"><div className="education-backdrop contact-bg" /><div className="contact-spark" /><div className="slide-inner contact-inner"><p className="eyebrow reveal r1">06 / LET&apos;S MAKE THINGS HAPPEN</p><h2 className="reveal r2">下一个好问题，<br />从一封<span>邮件</span>开始。</h2><a className="email-link reveal r3" href="mailto:mrl1102@163.com">mrl1102@163.com <i>↗</i></a><div className="contact-data reveal r4"><p>马瑞良 / MRL<br />LANZHOU UNIVERSITY</p><p>156 2042 0698<br />TIANJIN, CHINA</p><button onClick={() => goTo(0)}>回到首页 ↑</button></div></div></section>
      </div>
    </main>
  );
}
