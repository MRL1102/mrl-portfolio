"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CircularGallery from "./components/CircularGallery";
import MagicBento from "./components/MagicBento";
import ProfileCard from "./components/ProfileCard";
import ShinyText from "./components/ShinyText";

const assetBase = (import.meta as ImportMeta & { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";
const asset = (path: string) => `${assetBase}assets/${path}`;

const slides = ["首页", "科研", "实习", "项目", "生活", "联系"];
const internships = [
  { period: "2026.01—03", title: "北京炫图未来科技有限公司", label: "AI 产品增长运营实习生", description: ["参与炫图 AI 产品冷启动阶段的竞品与用户研究，围绕 AI 图像生成产品梳理核心功能、目标用户、使用场景、内容风格与差异化卖点，输出竞品调研及用户场景分析材料。", "负责制作产品演示视频，运营 TikTok、Instagram、YouTube 等海外账号；协助分析用户行为与运营数据，搭建“曝光—点击—安装/注册—核心功能使用”的基础增长漏斗，按渠道与内容类型优化后续选题。"], descriptionStyle: "paragraphs" as const, alt: "北京炫图未来科技实习经历" },
  { period: "2025.10—12", title: "南京元数信息技术有限公司", label: "模型测评实习生", description: ["面向大模型文本生成、视频理解与科研总结等场景，参与设计测试任务与评测 Prompt，覆盖指令理解、信息抽取、长文本总结、多轮推理等典型能力，沉淀可复用的测试样例与输入规范。", "执行模型输出质量评测，围绕指令遵循、事实准确性、完整性、逻辑一致性、复杂任务理解与输出稳定性等维度记录问题案例，归纳模型在边界条件和复杂指令下的主要失效模式。"], descriptionStyle: "paragraphs" as const, alt: "南京元数信息技术实习经历" },
  { period: "2025.06—08", title: "兰州金石资源环境科技有限公司", label: "研究发展管理部实习生", description: ["开展零碳园区与新能源专题研究：调研甘肃省工业园区的产业、能源与碳排放现状，梳理新能源应用、绿电直供、储能及智慧能源管理等零碳转型路径。", "完成成本效益与案例分析：围绕零碳园区的建筑、交通和绿电直供方案，运用全生命周期成本、NPV、IRR、投资回收期等方法，分析经济、环境及社会效益，并整理典型园区实践案例。", "参与项目资金申请的 AI 辅助研究：梳理资金申请报告的章节逻辑、所需材料和审批手续，研究如何结合可研报告、证照及政策文件，通过 AI 辅助生成项目申报、政策符合性和投资筹措等内容。"], descriptionStyle: "paragraphs" as const, alt: "兰州金石资源环境实习经历" },
  { period: "2025.03—05", title: "甘肃惠科资源环境科技有限公司", label: "工程咨询实习生", description: ["参与兰州新区 34 家化工企业现场核查，协助核实项目实际建设与生产状态、产能及能源使用情况；通过现场走访和资料比对，形成核查记录并整理影像佐证材料。", "开展化工项目用能与能效核查，汇总电力、蒸汽、天然气等能源数据，测算综合能耗及单位产品能耗；对照节能批复和实际生产情况，识别能源品种、设备能效与备案信息的不一致项。", "参与现场安全核查与隐患排查，关注生产装置、用能设备及现场管理状况，协助识别低能效或淘汰设备等风险点，并提出设备更换、技术改造和持续改进建议；具备化工现场巡查、问题记录与整改跟踪意识。"], descriptionStyle: "paragraphs" as const, alt: "甘肃惠科资源环境实习经历" },
];

const projects = [
  { period: "2026.03—NOW", title: "Resume Copilot", label: "全栈负责", description: ["从求职者反复填写网申表单的痛点出发，完成需求拆解、功能规划与产品实现，设计“简历导入—结构化编辑—字段识别—自动填写—人工校正—规则学习”的用户闭环。", "支持接入大模型 API 完成简历结构化解析与字段匹配，设计置信度、未匹配跳过及本地规则兜底机制；支持“人工修正后学习”提升重复投递场景的自动填写准确性与可用性。"], descriptionStyle: "paragraphs" as const, alt: "Resume Copilot 项目经历" },
  { period: "2025.09—12", title: "“巡河宝”数据智能挖掘", label: "主要负责", description: ["面向巡河宝小程序沉淀的 182.19 万条公众观测数据，设计“数据采集—AI 清洗—结构化分析—异常预警—反馈”的数据产品链路；服务覆盖全国 31 个省级行政区、超 120 万用户的平台场景。", "基于 Ollama 部署 Qwen 视觉问答模型，设计结构化输出流程，测试集漏检率为 0.10%；完成全部数据时空分析、异常点挖掘及志愿者运营分析。"], descriptionStyle: "paragraphs" as const, alt: "巡河宝数据智能挖掘项目经历" },
  { period: "2024.09—12", title: "多传感器融合的室内巡航感知智能机器人", label: "主要负责", description: ["基于 ROS2 搭建全向移动机器人室内巡航方案，融合 SLAM 建图定位与多传感器感知能力，实现自主导航、路径巡航与环境信息采集，面向室内场景提升巡检自动化水平。", "融合 VLM 视觉模型与 DeepSeek 大模型，将现场视觉信息与污染物检测结果转化为可理解的异常描述和溯源分析，形成“自主巡航—异常感知—信息解析—结果输出”的任务闭环，探索大模型在机器人巡检产品中的落地方式。"], descriptionStyle: "paragraphs" as const, alt: "多传感器融合的室内巡航感知智能机器人项目经历" },
  { period: "2026.03—05", title: "城市道路安全隐患智能识别与风险巡查", label: "主要负责", description: ["道路区域识别：基于无人机巡查影像训练语义分割模型，自动识别机动车道、停车区、人行道、非机动车道、斑马线和禁停区域等 6 类重点道路区域；模型整体像素识别准确率达 91.98%，道路区域 IoU 达 86.55%。", "车辆与违停风险判定：基于 YOLO 定位巡查区域车辆，并与道路区域识别结果进行 Mask 像素级空间匹配，自动识别正常停车、疑似违停和占道等安全隐患。"], descriptionStyle: "paragraphs" as const, alt: "城市道路安全隐患智能识别与风险巡查项目经历" },
  { period: "2026.06—NOW", title: "霓虹围城", label: "俯视角 Roguelike 生存射击 · 全栈负责", description: ["基于 Godot 4 + GDScript 开发，设计“击杀—经验拾取—随机三选一强化—敌潮升级”的局内成长循环，配置攻速、移速、伤害、生命等 5 类升级项，并通过刷新频率、敌人移速与经验需求递增构建难度曲线。", "基于完整单局体验补齐主菜单、战斗 HUD、升级选择、受击反馈与死亡结算等模块，记录存活时长、击杀数、等级等结果指标，支持后续玩法和数值调优。"], descriptionStyle: "paragraphs" as const, alt: "霓虹围城游戏项目经历" },
  { period: "2026.06—NOW", title: "Drift Rush", label: "俯视角漂移竞速网页游戏 · 全栈负责", description: ["基于 HTML5 Canvas、JavaScript、CSS 开发，设计 60 秒限时竞速、顺序检查点、漂移 Combo、氮气补给与撞墙惩罚机制，构建高风险高收益的漂移竞速循环。", "基于车辆前向惯性与横向滑移实现漂移手感、赛道碰撞和氮气加速，并加入粒子、震屏、得分提示及 LocalStorage 最高分记录，提升操作反馈与重复挑战意愿。"], descriptionStyle: "paragraphs" as const, alt: "Drift Rush 游戏项目经历" },
];

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

        <section className={`slide experience-slide ${active === 2 ? "is-active" : ""}`} aria-label="实习经历"><div className="workflow-backdrop" /><div className="slide-inner experience-inner"><p className="eyebrow experience-kicker reveal r1">03 / INTERNSHIP EXPERIENCE</p><MagicBento items={internships} className="internship-bento reveal r2" /></div></section>

        <section className={`slide project-slide ${active === 3 ? "is-active" : ""}`} aria-label="项目经历"><div className="workflow-backdrop project-bg" /><div className="slide-inner project-inner"><p className="eyebrow project-kicker reveal r1">04 / SELECTED PROJECTS</p><MagicBento items={projects} className="project-bento reveal r2" scrollable /></div></section>

        <section className={`slide strength-slide ${active === 4 ? "is-active" : ""}`} aria-label="教育与个人优势"><div className="education-backdrop" /><div className="slide-inner strength-inner"><div className="education-head reveal r1"><p className="eyebrow">04 / EDUCATION & STRENGTHS</p><h2>把专业训练，<br />变成持续的<span>能力。</span></h2></div><div className="education-timeline reveal r2"><article><span>2024 — NOW</span><h3>兰州大学</h3><p>环境工程 · 硕士研究生</p></article><article><span>2020 — 2024</span><h3>中国矿业大学</h3><p>安全工程 · 本科<br />A+ 学科 / 全国第一</p></article></div><div className="strengths">{[["01", "研究到落地", "把抽象问题变成可验证、可执行的路径。"], ["02", "AI Native", "以 Prompt、模型评测和 Vibe Coding 重构工作流。"], ["03", "推动发生", "20+ 场校院活动统筹经验，在限制中推进结果。"]].map((item, index) => <article className={`reveal r${index + 3}`} key={item[0]}><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p><i>↗</i></article>)}</div></div></section>

        <section className={`slide life-slide ${active === 4 ? "is-active" : ""}`} aria-label="生活与兴趣"><div className="life-wash" /><div className="life-bento-wrap"><MagicBento items={lifePhotos} className="life-bento" /></div></section>

        <section className={`slide contact-slide ${active === 5 ? "is-active" : ""}`} aria-label="联系方式"><div className="education-backdrop contact-bg" /><div className="slide-inner contact-inner"><p className="eyebrow reveal r1">06 / LET&apos;S MAKE THINGS HAPPEN</p><h2 className="reveal r2">下一个好问题，<br />从一封<span>邮件</span>开始。</h2><a className="email-link reveal r3" href="mailto:mrl1102@163.com"><ShinyText text="mrl1102@163.com" speed={1.15} delay={0.3} color="#eef0e9" shineColor="#b8df72" pauseOnHover /></a><div className="contact-data reveal r4"><p>Marell<br />LANZHOU UNIVERSITY</p><p>156 2042 0698<br />TIANJIN, CHINA</p></div></div></section>
      </div>
    </main>
  );
}
