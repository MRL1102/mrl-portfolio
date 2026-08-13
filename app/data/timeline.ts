export type TimelineKind = "internship" | "project";

export type TimelineHighlight = {
  value: string;
  label: string;
};

export type TimelineEntry = {
  id: string;
  kind: TimelineKind;
  period: string;
  title: string;
  subtitle: string;
  role: string;
  summary: string;
  details: string[];
  tags: string[];
  highlights?: TimelineHighlight[];
};

export const internshipTimeline: TimelineEntry[] = [
  {
    id: "huike-ehs",
    kind: "internship",
    period: "2025.03 — 05",
    title: "甘肃惠科资源环境科技有限公司",
    subtitle: "化工企业现场核查与节能数据分析",
    role: "工程咨询实习生",
    summary: "走进真实化工生产现场，把建设状态、能源数据与安全问题转化为可核查、可追踪的工程记录。",
    details: [
      "参与兰州市 34 家化工企业现场核查，协助核查项目实际建设与生产状态、产能及能源使用情况。",
      "通过规范化访谈与资料比对，形成核查记录并整理影像佐证材料。",
      "开展化工项目用能与能效核查，汇总电力、蒸汽、天然气等能源数据。",
      "测算综合能耗及单位产值能耗，对照节能批复和实际生产情况识别问题。",
      "参与现场安全检查与隐患排查，关注装置、用能设备和现场管理情况。",
      "形成现场巡查、问题记录与整改跟踪意识。",
    ],
    tags: ["现场核查", "节能分析", "安全巡查", "整改跟踪"],
    highlights: [
      { value: "34", label: "家化工企业" },
      { value: "EHS", label: "现场与能效核查" },
    ],
  },
  {
    id: "jinshi-zero-carbon",
    kind: "internship",
    period: "2025.06 — 08",
    title: "兰州金石资源环境科技有限公司",
    subtitle: "零碳园区规划与资金申报辅助研究",
    role: "研究发展管理部实习生",
    summary: "从园区能源与碳排放现状出发，研究零碳路径、投资回报与资金申报逻辑。",
    details: [
      "开展零碳园区与新能源专题研究，调研甘肃省工业园区能源与碳排放现状。",
      "梳理新能源应用、绿电直供、储能及智慧能源管理等零碳转型路径。",
      "完成成本效益与案例分析。",
      "围绕建筑、交通和绿色电力场景，进行全生命周期成本、NPV、IRR、投资回收期等分析。",
      "参与项目资金申请辅助研究，梳理申报逻辑、所需材料和审批流程。",
      "研究可研报告、项目建议书等内容，并尝试通过 AI 辅助生成部分申报和投资材料。",
    ],
    tags: ["零碳园区", "绿电直供", "成本效益", "资金申报", "AI 辅助研究"],
    highlights: [
      { value: "NPV / IRR", label: "投资分析" },
      { value: "ZERO", label: "零碳转型路径" },
    ],
  },
  {
    id: "yuanshu-llm-eval",
    kind: "internship",
    period: "2025.10 — 12",
    title: "南京元数信息技术有限公司",
    subtitle: "大模型测评与 Prompt 设计",
    role: "模型测评实习生",
    summary: "把复杂任务拆成可复用测试样例，用一致的评价维度识别大模型在边界场景下的失效模式。",
    details: [
      "面向大模型文本生成、视频理解与科研总结等场景，参与设计测试任务与测评 Prompt。",
      "覆盖语义理解、信息抽取、长文本总结、多轮推理等典型能力。",
      "沉淀可复用的测试样例与输入规范。",
      "执行模型输出质量评测。",
      "围绕指令遵循、事实准确性、完整性、逻辑一致性、复杂任务理解与输出稳定性等维度记录问题案例。",
      "总结模型在边界条件和复杂指令下的主要失效模式。",
    ],
    tags: ["LLM Evaluation", "Prompt Design", "视频理解", "长文本总结", "失效分析"],
    highlights: [
      { value: "6D", label: "核心评价维度" },
      { value: "PROMPT", label: "可复用测试规范" },
    ],
  },
  {
    id: "xuantu-growth",
    kind: "internship",
    period: "2026.01 — 03",
    title: "北京炫图未来科技有限公司",
    subtitle: "AI 修图产品增长运营",
    role: "AI 产品增长运营实习生",
    summary: "围绕 AI 图像产品冷启动，从竞品、用户、内容到数据漏斗形成增长验证闭环。",
    details: [
      "参与炫图 AI 产品冷启动阶段的竞品与用户研究。",
      "围绕 AI 图像生成功能，梳理目标用户、使用场景、内容偏好及差异化卖点。",
      "输出竞品调研及用户场景分析材料。",
      "负责制作产品演示视频。",
      "运营 TikTok、Instagram、YouTube 等海外账号。",
      "协助分析用户行为与运营数据。",
      "搭建“曝光—点击—安装—核心功能使用”的基础增长漏斗。",
      "按渠道与内容类型持续优化后续选题和投放策略。",
    ],
    tags: ["AI 产品", "用户研究", "增长漏斗", "海外运营", "内容测试"],
    highlights: [
      { value: "3", label: "海外内容渠道" },
      { value: "AARRR", label: "增长验证意识" },
    ],
  },
];

export const projectTimeline: TimelineEntry[] = [
  {
    id: "resume-copilot",
    kind: "project",
    period: "2026.03 — Now",
    title: "Resume Copilot",
    subtitle: "全栈负责",
    role: "产品设计 / 全栈开发",
    summary: "一款面向求职者的网申自动化助手，让重复填写变成可校正、可学习的工作流。",
    details: [
      "从求职者反馈填写网申表单痛点出发，完成需求拆解、功能规划与产品实现。",
      "设计“简历导入—结构化编辑—字段识别—自动填写—人工校正—规则学习”的用户闭环。",
      "接入大模型 API 完成简历结构化解析与字段匹配。",
      "设计置信度、未匹配跳过及本地规则兜底机制。",
      "支持“人工修正后学习”，提升重复投递场景下的自动填写准确性与可用性。",
    ],
    tags: ["React", "LLM API", "信息抽取", "浏览器自动化", "Product Design"],
    highlights: [
      { value: "0 → 1", label: "产品闭环" },
      { value: "HITL", label: "人工校正学习" },
    ],
  },
  {
    id: "river-insight",
    kind: "project",
    period: "2025.09 — 12",
    title: "“巡河宝”数据智能挖掘",
    subtitle: "主要负责",
    role: "数据产品 / 多模态分析",
    summary: "用视觉问答模型清洗百万级公众观测数据，连接异常识别、空间分析与志愿者运营。",
    details: [
      "面向巡河宝小程序沉淀的 182.19 万条公众观测数据。",
      "设计“数据采集—AI 清洗—结构化分析—异常预警—反馈”的数据产品链路。",
      "服务覆盖全国 31 个省级行政区、超 120 万用户的平台场景。",
      "基于 Ollama 部署 Qwen 视觉问答模型，设计结构化输出流程。",
      "测试集漏检率为 0.10%。",
      "完成全部数据时空分析、异常点挖掘及志愿者运营分析。",
    ],
    tags: ["Ollama", "Qwen VLM", "VQA", "时空分析", "异常预警"],
    highlights: [
      { value: "182.19 万", label: "公众观测数据" },
      { value: "0.10%", label: "测试集漏检率" },
      { value: "120 万+", label: "平台用户" },
    ],
  },
  {
    id: "indoor-robot",
    kind: "project",
    period: "2024.09 — 12",
    title: "多传感器融合的室内巡航感知智能机器人",
    subtitle: "主要负责",
    role: "机器人方案 / 多模态感知",
    summary: "融合自主巡航、传感器观测与多模态大模型，让室内巡检结果能够被理解与追溯。",
    details: [
      "基于 ROS2 搭建全向移动机器人室内巡航方案。",
      "融合 SLAM 建图与多传感器感知能力，实现自主导航、路径巡航与环境信息采集。",
      "面向室内场景提升巡检自动化水平。",
      "融合 VLM 视觉模型与 DeepSeek 大模型。",
      "将现场视觉信息与传感器观测结果转化为可理解的异常描述和溯源分析。",
      "形成“自主巡航—感知—信息解析—结果输出”的任务闭环。",
      "探索大模型在机器人巡检场景中的落地方式。",
    ],
    tags: ["ROS2", "SLAM", "VLM", "DeepSeek", "多传感器融合"],
    highlights: [
      { value: "ROS2", label: "自主巡航底座" },
      { value: "VLM + LLM", label: "异常理解与溯源" },
    ],
  },
  {
    id: "road-safety",
    kind: "project",
    period: "2026.03 — 05",
    title: "城市道路安全隐患智能识别与风险巡查",
    subtitle: "核心负责",
    role: "算法方案 / 风险评估",
    summary: "将道路场景语义分割、目标检测与风险评估串联为可执行的智能巡查流程。",
    details: [
      "设计城市道路安全隐患智能识别与风险巡查方案。",
      "基于场景语义分割完成道路空间、边界及重点区域识别，覆盖 6 类关键区域。",
      "模型测试准确率达到 91.98%，IoU 达到 86.55%。",
      "融合 YOLO 目标检测与 Mask 分割，识别障碍物、车辆及道路异常区域。",
      "将识别结果转化为风险等级、位置与巡查建议，形成可用于现场核查的输出。",
    ],
    tags: ["Semantic Segmentation", "YOLO", "Mask", "风险巡查", "Computer Vision"],
    highlights: [
      { value: "91.98%", label: "测试准确率" },
      { value: "86.55%", label: "IoU" },
    ],
  },
  {
    id: "neon-siege",
    kind: "project",
    period: "2026.06 — Now",
    title: "《霓虹围城》",
    subtitle: "独立开发",
    role: "游戏策划 / 程序实现",
    summary: "围绕快节奏战斗与可组合成长，搭建具有反馈感和重复可玩性的 Roguelike 原型。",
    details: [
      "使用 Godot 与 GDScript 独立完成 Roguelike 游戏原型。",
      "设计移动、攻击、敌人生成、碰撞、生命值与升级系统。",
      "构建 5 类升级方向，并通过属性叠加形成可组合成长路线。",
      "围绕打击反馈、节奏变化与局内选择持续迭代数值和交互表现。",
    ],
    tags: ["Godot", "GDScript", "Roguelike", "系统策划", "数值迭代"],
    highlights: [
      { value: "5", label: "升级方向" },
      { value: "SOLO", label: "独立开发" },
    ],
  },
  {
    id: "drift-rush",
    kind: "project",
    period: "2026.06 — Now",
    title: "Drift Rush",
    subtitle: "独立开发",
    role: "玩法设计 / 前端开发",
    summary: "用 60 秒短局、连击和风险收益选择，构建轻量但有竞技张力的漂移体验。",
    details: [
      "基于 Canvas 与 JavaScript 完成俯视角漂移游戏原型。",
      "设计 60 秒限时挑战、漂移判定、Combo 倍率与得分结算。",
      "通过速度、转向、障碍与奖励区间形成风险收益选择。",
      "优化实时反馈、赛后数据与再次挑战路径，提升短局循环体验。",
    ],
    tags: ["Canvas", "JavaScript", "Game Loop", "Combo", "交互反馈"],
    highlights: [
      { value: "60s", label: "单局挑战" },
      { value: "COMBO", label: "核心反馈机制" },
    ],
  },
];
