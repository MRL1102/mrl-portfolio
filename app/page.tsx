import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "马瑞良 | Portfolio",
  description: "马瑞良的科研、AI 与产品实践作品集。",
};

const achievements = [
  {
    number: "01",
    title: "SCI 论文 · 第一作者",
    journal: "Building and Environment · CAS Q1 Top",
    detail:
      "Characterizing Dynamic Indoor Pollutant Dispersion Pathways using an Interpretable Attention-Driven Spatiotemporal Modeling Framework.",
    year: "2025",
  },
  {
    number: "02",
    title: "软件著作权 · 第二著作权人",
    journal: "室内环境质量智能监测与分析系统 V1.0 等",
    detail: "围绕室内环境智能监测与分析，参与 6 项软件著作权成果转化。",
    year: "06",
  },
];

const internships = [
  {
    period: "2026.01 — 03",
    company: "北京炫图未来科技有限公司",
    role: "AI 产品增长运营实习生",
    work: "参与炫图 AI 冷启动；完成竞品、用户行为与运营数据分析，梳理核心场景及产品差异。",
  },
  {
    period: "2025.10 — 12",
    company: "南京元数信息技术有限公司",
    role: "模型测评实习生",
    work: "评测大模型生成、视频理解与科研总结能力；通过 Prompt 设计验证应用表现。",
  },
  {
    period: "2025.06 — 08",
    company: "兰州金石资源环境科技有限公司",
    role: "研究发展管理部实习生",
    work: "调研甘肃省零碳园区建设，开展成本效益分析，梳理绿电直供的适用场景与实施条件。",
  },
  {
    period: "2025.03 — 05",
    company: "甘肃惠科资源环境科技有限公司",
    role: "工程咨询实习生",
    work: "参与 34 家化工企业现场核查，复核生产设备、能耗与能效数据，协助形成项目交付材料。",
  },
];

const projects = [
  {
    code: "P / 01",
    title: "Resume Copilot",
    label: "Vibe Coding · 2026.03 — NOW",
    description:
      "从重复填写网申信息的痛点出发，完成需求拆解、功能规划与原型开发，构建简历解析、字段匹配、自动填写及人工修正学习能力。",
    tags: ["0 → 1", "Product", "Codex", "Full stack"],
    graphic: "copilot",
  },
  {
    code: "P / 02",
    title: "巡河宝 · 数据智能挖掘",
    label: "MULTIMODAL AI · 2025.09 — 12",
    description:
      "基于 Ollama 部署 Qwen 多模态模型，设计河流图像 VQA、结构化输出、异常处理与高置信筛选流程，服务百万级数据清洗。",
    tags: ["Qwen", "Ollama", "VQA", "Data pipeline"],
    graphic: "river",
  },
];

const strengths = [
  ["01", "Research to reality", "从环境工程研究出发，把复杂问题转译成可验证、可交付的方案。"],
  ["02", "AI native", "熟悉 Prompt 设计、模型评测与 Vibe Coding，善于让 AI 成为工作流的一部分。"],
  ["03", "Make it happen", "有 20+ 校院活动统筹经验，习惯在有限时间和资源下推动事情落地。"],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top" aria-label="首页">
        <video className="hero-video" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2200&q=85">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-waves-in-motion-1246-large.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-grid" />
        <nav className="nav shell" aria-label="主导航">
          <a href="#top" className="brand" aria-label="马瑞良首页">MRL<span>·</span></a>
          <div className="nav-links">
            <a href="#research">RESEARCH</a>
            <a href="#experience">EXPERIENCE</a>
            <a href="#projects">SELECTED WORK</a>
          </div>
          <a className="nav-contact" href="mailto:mrl1102@163.com">LET&apos;S TALK <i>↗</i></a>
        </nav>

        <div className="hero-content shell">
          <div className="hero-eyebrow"><span /> ENVIRONMENT × INTELLIGENCE × PRODUCT</div>
          <h1>追踪问题<br />让<span>洞见</span>发生</h1>
          <div className="hero-bottom">
            <p>马瑞良 / 兰州大学环境工程硕士<br />研究、AI 与产品实践的交叉探索者。</p>
            <a className="scroll-cue" href="#research"><b>01</b><span>SCROLL TO EXPLORE</span><i>↓</i></a>
          </div>
        </div>
        <div className="hero-aside">PORTFOLIO / 2026</div>
      </section>

      <section id="research" className="section research-section shell">
        <div className="section-intro split-heading">
          <p className="kicker">01 / RESEARCH OUTPUT</p>
          <h2>研究不是终点，<br />是理解<span>世界</span>的方式。</h2>
          <p className="side-note">聚焦环境污染物时空传播、智能监测与可解释建模。<br />用数据描述复杂系统，也用技术回应真实场景。</p>
        </div>
        <div className="achievement-list">
          {achievements.map((item) => (
            <article className="achievement" key={item.number}>
              <span className="item-number">{item.number}</span>
              <div><p className="overline">{item.title}</p><h3>{item.journal}</h3></div>
              <p className="achievement-detail">{item.detail}</p>
              <span className="year">{item.year}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="shell">
          <div className="section-intro experience-heading"><p className="kicker">02 / FIELD NOTES</p><h2>在真实场景里，<br />把<span>研究</span>变成行动。</h2></div>
          <div className="timeline">
            {internships.map((item) => (
              <article className="timeline-item" key={item.company}>
                <div className="timeline-date">{item.period}</div>
                <div className="timeline-marker" />
                <div className="timeline-copy"><h3>{item.company}</h3><p className="role">{item.role}</p><p>{item.work}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section project-section shell">
        <div className="section-intro project-heading"><p className="kicker">03 / SELECTED WORK</p><h2>把模糊的需求，<br />做成可用的<span>系统</span>。</h2></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.graphic}`} key={project.code}>
              <div className="project-visual" aria-hidden="true"><span className="visual-label">{project.graphic === "copilot" ? "FORM / PARSE / MATCH" : "VQA / FILTER / FLOW"}</span><div className="graphic-core" /><div className="graphic-line line-one" /><div className="graphic-line line-two" /><div className="graphic-dot dot-one" /><div className="graphic-dot dot-two" /></div>
              <div className="project-body"><p className="project-code">{project.code}</p><h3>{project.title}</h3><p className="project-label">{project.label}</p><p className="project-description">{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section strength-section">
        <div className="shell"><div className="section-intro strength-heading"><p className="kicker">04 / HOW I WORK</p><h2>理性拆解，<br />感性<span>连接</span>。</h2></div>
          <div className="strength-list">{strengths.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p><i>↗</i></article>)}</div>
        </div>
      </section>

      <section className="hobby-section shell" id="hobbies">
        <div className="hobby-panel"><div><p className="kicker">05 / OFF THE CLOCK</p><h2>球场、<br /><span>人群</span>与现场。</h2></div><div className="hobby-copy"><p>作为研究生会文体发展中心负责人，曾牵头在 4 天内完成全校研究生篮球赛落地；也在一次次活动现场，学习如何带动一群人走向共同目标。</p><div className="hobby-stats"><span><b>20+</b>校 / 院级活动</span><span><b>04</b>天完成篮球赛落地</span></div></div><div className="hobby-orbit" aria-hidden="true"><span>COURT</span><span>COMMUNITY</span><b>×</b></div></div>
      </section>

      <footer className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="shell contact-inner"><p className="kicker">06 / GET IN TOUCH</p><p className="contact-small">如果你正在思考一个关于环境、AI 或产品的问题，<br />欢迎与我开始一段对话。</p><a href="mailto:mrl1102@163.com" className="contact-mail">mrl1102@<em>163.com</em><span>↗</span></a><div className="contact-footer"><p>马瑞良 / MRL<br />LANZHOU UNIVERSITY</p><p>156 2042 0698<br />TIANJIN, CHINA</p><p>© 2026 MRL PORTFOLIO</p></div></div>
      </footer>
    </main>
  );
}
