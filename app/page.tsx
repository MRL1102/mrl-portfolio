"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const slides = ["首页", "科研", "实习", "项目", "优势", "生活", "联系"];

const research = [
  ["SCI / 01", "Building and Environment", "第一作者｜中科院工程技术一区 Top", "可解释注意力驱动的时空建模，刻画室内污染物动态扩散路径。"],
  ["IP / 06", "智能环境监测系统", "第二著作权人｜软件著作权", "围绕室内环境质量智能监测与分析，完成 6 项成果转化。"],
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
  const locked = useRef(false);
  const touchStart = useRef(0);

  const goTo = useCallback((index: number) => {
    setActive(Math.max(0, Math.min(slides.length - 1, index)));
  }, []);

  const move = useCallback((direction: number) => {
    setActive((current) => Math.max(0, Math.min(slides.length - 1, current + direction)));
  }, []);

  useEffect(() => {
    const release = () => { locked.current = false; };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (locked.current || Math.abs(event.deltaY) < 12) return;
      locked.current = true;
      move(event.deltaY > 0 ? 1 : -1);
      window.setTimeout(release, 760);
    };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); move(1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); move(-1); }
      if (event.key === "Home") { event.preventDefault(); goTo(0); }
      if (event.key === "End") { event.preventDefault(); goTo(slides.length - 1); }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("wheel", onWheel); window.removeEventListener("keydown", onKey); };
  }, [goTo, move]);

  return (
    <main className="portfolio" onTouchStart={(event) => { touchStart.current = event.touches[0].clientY; }} onTouchEnd={(event) => { const delta = touchStart.current - event.changedTouches[0].clientY; if (Math.abs(delta) > 45) move(delta > 0 ? 1 : -1); }}>
      <nav className="top-nav" aria-label="作品集导航">
        <button className="brand" onClick={() => goTo(0)} aria-label="回到首页">MRL<span>•</span></button>
        <div className="nav-items">{slides.slice(1, 6).map((label, index) => <button key={label} className={active === index + 1 ? "active" : ""} onClick={() => goTo(index + 1)}>{label}</button>)}</div>
        <button className="talk-button" onClick={() => goTo(6)}>联系我 <b>↗</b></button>
      </nav>

      <aside className="page-rail" aria-label="页面进度">{slides.map((label, index) => <button key={label} onClick={() => goTo(index)} className={active === index ? "active" : ""} aria-label={`前往${label}`}><span>{String(index + 1).padStart(2, "0")}</span></button>)}</aside>
      <div className="deck" style={{ transform: `translate3d(0, -${active * 100}svh, 0)` }}>
        <section className={`slide hero-slide ${active === 0 ? "is-active" : ""}`} aria-label="首页">
          <div className="blue-noise" /><div className="hero-art" aria-hidden="true" /><div className="hero-vine vine-one" /><div className="hero-vine vine-two" />
          <div className="slide-inner hero-inner">
            <p className="eyebrow reveal r1">PORTFOLIO / 2026</p>
            <p className="hero-english reveal r2">Research Like a Designer</p>
            <h1 className="reveal r3">让复杂问题<br />变成<span>清晰答案</span></h1>
            <p className="hero-sub reveal r4">环境工程 × 人工智能 × 产品实践<br />马瑞良的跨学科探索记录</p>
            <button className="round-next reveal r5" onClick={() => move(1)} aria-label="查看科研成果">探索作品集 <i>↓</i></button>
          </div>
          <div className="hero-corner reveal r5">M A  R U I L I A N G<br />LANZHOU UNIVERSITY</div>
        </section>

        <section className={`slide research-slide ${active === 1 ? "is-active" : ""}`} aria-label="科研成果"><div className="paper-texture" /><div className="slide-inner split-layout"><div className="slide-title"><p className="eyebrow reveal r1">01 / RESEARCH OUTPUT</p><h2 className="reveal r2">研究，<br />也是一种<span>设计。</span></h2><p className="reveal r3">用可解释建模理解复杂环境，<br />让研究成果靠近真实应用。</p></div><div className="research-list">{research.map((item, index) => <article className={`research-card reveal r${index + 2}`} key={item[0]}><div><span>{item[0]}</span><b>{item[1]}</b></div><p className="research-meta">{item[2]}</p><p>{item[3]}</p><i>↗</i></article>)}</div></div><p className="slide-stamp">BUILDING AND ENVIRONMENT / INDOOR INTELLIGENCE</p></section>

        <section className={`slide experience-slide ${active === 2 ? "is-active" : ""}`} aria-label="实习经历"><div className="blue-noise" /><div className="slide-inner"><div className="experience-head"><div><p className="eyebrow reveal r1">02 / FIELD NOTES</p><h2 className="reveal r2">不只记录，<br />更进入<span>现场。</span></h2></div><p className="reveal r3">从产业现场到 AI 产品，<br />每一段实践都在校准我解决问题的方式。</p></div><div className="experience-grid">{internships.map((item, index) => <article className={`experience-card reveal r${index + 2}`} key={item[1]}><span>{item[0]}</span><div className="card-plus">+</div><h3>{item[1]}</h3><b>{item[2]}</b><p>{item[3]}</p></article>)}</div></div></section>

        <section className={`slide project-slide ${active === 3 ? "is-active" : ""}`} aria-label="项目经历"><div className="slide-inner"><div className="project-head"><p className="eyebrow reveal r1">03 / SELECTED WORK</p><h2 className="reveal r2">把想法做成<br /><span>可用的东西。</span></h2><p className="reveal r3">点击卡片，查看项目关键词。</p></div><div className="project-list">{projects.map((project, index) => <button type="button" onClick={() => setSelectedProject(index)} className={`project-card reveal r${index + 2} ${selectedProject === index ? "selected" : ""}`} key={project[0]}><span className="project-index">{project[0]}</span><div className="project-orb"><i /><i /><i /></div><div className="project-copy"><p>{project[2]}</p><h3>{project[1]}</h3><span>{project[3]}</span><div className="project-tags">{project[4].map((tag) => <b key={tag}>{tag}</b>)}</div></div><em>查看<br />焦点 ↗</em></button>)}</div></div></section>

        <section className={`slide strength-slide ${active === 4 ? "is-active" : ""}`} aria-label="个人优势"><div className="paper-texture" /><div className="slide-inner"><p className="eyebrow reveal r1">04 / HOW I WORK</p><h2 className="reveal r2">理性拆解，<br /><span>感性连接。</span></h2><div className="strengths">{[["01", "研究到落地", "把抽象问题变成可验证、可执行的路径。"], ["02", "AI Native", "以 Prompt、模型评测和 Vibe Coding 重构工作流。"], ["03", "推动发生", "20+ 场校院活动统筹经验，在限制中推进结果。"]].map((item, index) => <article className={`reveal r${index + 2}`} key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><i>↗</i></article>)}</div></div></section>

        <section className={`slide life-slide ${active === 5 ? "is-active" : ""}`} aria-label="兴趣爱好"><div className="blue-noise" /><div className="life-doodle doodle-left" /><div className="life-doodle doodle-right" /><div className="slide-inner life-inner"><p className="eyebrow reveal r1">05 / OFF THE CLOCK</p><p className="life-small reveal r2">球场、人群与<br />热烈的现场。</p><h2 className="reveal r3"><span>20+</span>次<br />一起发生</h2><div className="life-copy reveal r4"><p>作为研究生会文体发展中心负责人，曾在 4 天内完成全校研究生篮球赛落地。研究之外，我也喜欢用一次活动把陌生人变成同路人。</p><b>SPORT / COMMUNITY / ACTION</b></div></div></section>

        <section className={`slide contact-slide ${active === 6 ? "is-active" : ""}`} aria-label="联系方式"><div className="paper-texture" /><div className="contact-spark" /><div className="slide-inner contact-inner"><p className="eyebrow reveal r1">06 / LET&apos;S MAKE THINGS HAPPEN</p><h2 className="reveal r2">下一个好问题，<br />从一封<span>邮件</span>开始。</h2><a className="email-link reveal r3" href="mailto:mrl1102@163.com">mrl1102@163.com <i>↗</i></a><div className="contact-data reveal r4"><p>马瑞良 / MRL<br />LANZHOU UNIVERSITY</p><p>156 2042 0698<br />TIANJIN, CHINA</p><button onClick={() => goTo(0)}>回到封面 ↑</button></div></div></section>
      </div>
    </main>
  );
}
