# Consensus 使用指南：AI 科研证据分析工具

## 它不是又一个论文搜索引擎

传统的 Google Scholar、PubMed 做的是一件事：**给你一篇篇的论文**。你搜一个关键词，出来几百篇，自己读标题、筛摘要、判断证据强弱——文献综述的前期工作可以花掉几周。

Consensus 做的事情不同：**你问一个研究问题，它在 2.2 亿+ 学术论文数据库中检索相关文献，用 AI 对高相关论文做摘要、分类和综合，告诉你证据指向哪个方向，且关键结论附带来源论文。**

```
你：Does intermittent fasting improve cognitive function?
Consensus：
  ✅ Yes（12 篇支持）
  ❓ Possibly（5 篇部分支持）
  ❌ No（3 篇反对）
  ↓ 每篇附带摘要 + 方法学快照 + 原文链接
```

这不是 ChatGPT 的"我觉得"。这是从真实论文中提取的证据。

---

## 一、跟通用 AI 的核心区别

| | 通用 AI（ChatGPT/Claude） | Consensus |
|---|---|---|
| **回答基础** | 训练数据中的知识，可能过时 | 实时检索 2.2 亿+ 学术论文 |
| **引用** | 可能编造（幻觉） | 基于真实论文，对 Yes/No 问题生成 Consensus Meter 显示证据方向 |
| **回答形式** | 自由生成文本 | 证据分布仪表盘 + 论文列表 + 可选的生成式深度分析 |
| **可验证** | 难 | 每篇论文可跳转原文 |
| **数据库** | 训练时的快照 | 持续更新的学术数据库 |

**ChatGPT 告诉你它"认为"什么，Consensus 告诉你学界"发现"了什么——但后者同样需要你判断证据质量。**

---

## 二、核心特色功能

### 2.1 Consensus Meter — 证据分布仪表盘

当你问一个 Yes/No 研究问题，Consensus 会：

1. 从全库召回候选论文
2. 对高相关性结果进行重排和 AI 分析
3. 按 Yes / Possibly / No 三栏归类
4. 显示每栏的论文数量

你**一眼就能看到学界对该问题的分歧程度**。如果 20:2 指向相对明确；如果 10:12 说明这个领域还在争论中——这本身就是有价值的发现。

> 实操提示：不只盯着 Yes，Possibly 和 No 栏同样重要。点进论文看 Study Snapshots 判断证据等级。

### 2.2 Study Snapshots — 研究方法快照

每篇论文展开后直接看到：

- **Population** — 研究人群
- **Study Design** — 研究设计（RCT、Meta-analysis、Cohort 等）
- **Outcomes** — 主要结局指标
- **Results** — 关键结果
- **Sample Size** — 样本量

这是 Consensus 中最实用的论文速览功能之一。不看 PDF 就能了解论文的基本方法学特征（2026 年更新为侧边栏一键查看）。

### 2.3 Research Agent — 复杂研究问题（2026 年 5 月上线）

当问题需要多步推理时——比如"比较间歇性禁食、生酮饮食和地中海饮食对 2 型糖尿病患者的血糖控制效果，考虑成本效益"——Research Agent 会自动：拆解问题 → 规划搜索策略 → 链式调用多个工具 → 返回引证完备的综合回答。不再是简单的 Yes/No，而是结构化的研究简报。

### 2.4 Citation Graph — 引用网络（2026 年 2 月上线）

输入最多 5 篇种子论文，自动绘制引用网络图，支持 20/40/60 篇展开。可以快速定位奠基性研究、追踪后续发展脉络。**在小规模引用网络探索上可承担 Research Rabbit 的部分工作，但 Citation Graph 上限 60 篇，远不及 RR 的全库网络探索能力。**

### 2.5 Deep Search — 深度分析（2025 年 7 月上线，2026 年 6 月升级）

对最多 50 篇论文生成长篇分析报告。2026 年 6 月更新后支持：在 Library 和 Collections 内运行、自定义输出格式（PICO/SPIDER 综述、阅读清单、范围界定图谱等）。

### 2.6 My Library — 文献库管理

2025-2026 年持续强化的核心功能：

- **导入 Zotero**（2026.02 上线）
- 上传 PDF（手稿、方案、报告等，私密保存）
- DOI / RIS / BibTeX 导入
- 创建 Collections 并按项目组织
- **分享 Collections** — 协作者可查看或编辑（2026.06）
- **Chat with Collection** — 对整个文献集合提问
- 参考文献生成（支持常见引用格式）
- LaTeX 导出（用于 Overleaf）

### 2.7 AI 工具集成（MCP / API）

Consensus 可以通过 MCP（Model Context Protocol）连接到你已有的 AI 工具。目前官方支持的集成包括：

- **ChatGPT** — 作为 ChatGPT App 调用（2024 年上线 Consensus GPT，2026 年升级为 App 连接）
- **Claude / Claude Code** — 通过 MCP 直接在对话中搜索文献
- **Codex** — 在 Codex CLI 中调用
- **自定义工具** — 通过 Consensus API 构建

这些集成让你的研究助手可以直接获取学术文献，不需要切到浏览器搜索。

---

## 三、适合什么，不适合什么

Consensus 不是万能工具。了解它的边界和正确使用它的方式同样重要。

### 适合的问题类型

| 类型 | 例子 | 效果 |
|------|------|------|
| Yes/No 研究问题 | "Does mindfulness meditation reduce anxiety in college students?" | ⭐⭐⭐⭐⭐ |
| PICO 问题 | "In adults with chronic pain, does acupuncture reduce pain more than NSAIDs?" | ⭐⭐⭐⭐⭐ |
| 干预效果 | "Does the Mediterranean diet reduce cardiovascular mortality?" | ⭐⭐⭐⭐ |
| 风险因素 | "Is air pollution linked to cognitive decline?" | ⭐⭐⭐⭐ |
| 研究现状速览 | "What does the literature say about X?"（先用 Consensus Meter） | ⭐⭐⭐⭐ |

### 不适合的问题类型

| 类型 | 原因 |
|------|------|
| 开放式理论问题 | "What is consciousness?" — 太宽泛，数据库无法精确定位 |
| 非英文文献 | Consensus 以英文论文为主，中文、日文等覆盖有限 |
| 灰色文献 | 政策文件、技术报告、学位论文等未经同行评审的内容覆盖不足 |
| 最新预印本 | 未经同行评审的论文可能未被收录 |
| 具体数字查询 | "What was the exact sample size in Smith et al. 2020?" — 问一篇具体论文时用 Ask Paper 更好 |

---

## 四、完整实操指南

### Step 0：注册

访问 [consensus.app](https://consensus.app/)，免费版有一定搜索额度。Premium 付费版解锁更多功能（学生折扣）。

### Step 1：搜索

有三种搜索模式：

| 模式 | 什么时候用 |
|------|-----------|
| **研究问题**（默认） | 问一个具体问题，需要看证据分布 |
| **论文搜索**（Paper Search） | 已经知道要找哪篇论文，直接搜标题/作者 |
| **高级搜索** | 需要精确筛选：19 种研究设计 + 44 家出版商 + 人体/动物研究（2026.07 更新） |

关键词技巧：
- 要具体：`Does mindfulness meditation reduce anxiety in college students?`
- 加限定：`in Chinese population`、`in older adults`、`RCT`
- 不要宽泛的开放式问题：`Tell me about meditation`（效果差）

### Step 2：读 Consensus Meter

三栏比例比绝对数量重要：

- Yes 明显多于 No → 学界相对一致的结论
- Yes ≈ No → 有争议，需要你自己判断双方证据质量
- Possibly 占比大 → 证据不充分或研究异质性高

### Step 3：筛选和深入

左侧筛选栏：年份 / 19 种研究设计 / 44 家出版商 / 人体或动物研究 / 被引次数排序。

找到感兴趣的论文后：**Study Snapshots** → 看方法学特征 → **Open PDF** → 读原文（能否看全文取决于出版商开放权限和机构订阅；Consensus 的全文索引主要用于 AI 分析，不等于全文阅读授权）。

### Step 4：分析模式

- **Ask Paper** — 对单篇论文提问，AI 基于全文回答
- **Chat with Papers** — 同时和最多 5 篇论文对话，对比方法和结论
- **Copilot / Threads** — 对话式追问：
  - 追问细节："What were the sample sizes?"
  - 对比研究："How do RCT results differ from observational studies?"
  - 找矛盾："Which studies oppose this conclusion and why?"
  - 扩展问题："What about effects on elderly populations?"

### Step 5：用 Research Agent 做复杂分析

当问题需要多步推理时，启动 Research Agent 比逐条搜索效率高得多。

### Step 6：用 Citation Graph 拓展文献

找 3-5 篇核心论文 → 展开引用网络 → 发现相关文献 → 加入 Collection。

### Step 7：保存到 My Library

导入 Zotero / 上传 PDF → 创建 Collection → 导出引用 → 分享协作。

---

## 五、工作流推荐

### 场景一：快速验证一个研究问题

```
Consensus Meter → 看证据分布 → Study Snapshots 检查方法学 → 读关键论文原文
（10-15 分钟，适合写作中引证或快速了解一个陌生问题）
```

### 场景二：做系统综述前期筛选

```
Research Agent 初探 → Deep Search 深度分析 → Citation Graph 拓展
→ My Library 整理 → Chat with Collection 综合验证
（几天的工作压缩到几小时，但**不能替代人工精读和证据质量评估**）
```

### 场景三：分析已有文献库

```
导入 Zotero → 在 My Library 中搜索 → Chat with Collection → 生成引用
（适合已有大量文献收集，需要快速梳理的研究阶段）
```

---

## 六、学术诚信与注意事项

### Consensus 的定位

Consensus 加速的是文献综述中**前几个环节**：搜索 → 筛选 → 分类 → 初读。

**仍需人工完成**：精读 → 方法学评估 → 综合 → 撰写。

### 必须注意的五个坑

1. **AI 提取可能有偏差** — 引用真实，但 AI 对论文结论的提取不一定 100% 准确。关键论文必须读原文。
2. **不自动区分证据等级** — 一篇 RCT 和一篇病例报告在 Consensus 中权重相同。你需要自己判断。
3. **数据库不完整** — 2.2 亿篇很多，但非英文文献、灰色文献、最新预印本可能缺失。
4. **免费版有额度限制** — 大量搜索需 Premium 或机构订阅。
5. **不替换人工判断** — 举个例子：Consensus 不会告诉你一篇论文的 funding source 是谁，而这可能影响结果的可信度。

### 证据质量自检清单

拿到 Consensus 给出的论文后，建议逐个问自己：

- [ ] 研究设计是什么？RCT → Meta-analysis → Cohort → Case-control → Case report（大致按证据等级排列）
- [ ] 样本量够吗？小样本的阳性结果可能是偶然
- [ ] 效应量和置信区间如何？区间太宽说明精度不够
- [ ] 有没有已知混杂因素未被控制？
- [ ] 这篇论文的发表时间是否还相关？
- [ ] 资助方是谁？有没有利益冲突嫌疑？

---

## 七、2026 年版特性总览

| 功能 | 上线时间 | 一句话 | 付费墙 |
|------|---------|--------|--------|
| Consensus Meter | 2024.01 | 证据分布仪表盘 | 免费 |
| Study Snapshots | 2024 | 研究方法速览 | 免费+ |
| Copilot / Threads | 2024.02 | 对话式追问 | 付费 |
| Ask Paper | 2024.09 | 对单篇论文提问 | 付费 |
| Deep Search | 2025.07 | 50 篇论文深度分析 | 付费 |
| Medical Mode | 2025.10 | 临床研究专用模式 | 付费 |
| My Library | 2026.01 | 文献库管理 | 免费+ |
| Zotero 导入 | 2026.02 | 直接导入 Zotero | 免费 |
| Citation Graph | 2026.02 | 引用网络可视化 | 付费 |
| MCP 集成 | 2026.03 | 接入 Claude/ChatGPT | 免费 |
| Research Agent | 2026.05 | 多步复杂研究问题 | 付费 |
| 全文索引 | 2026.05 | 主要出版商全文接入 AI 分析 | 机构订阅 |
| 19 种研究设计筛选 | 2026.07 | 精细方法学筛选 | 免费 |
| 44 家出版商筛选 | 2026.07 | 按出版商过滤 | 免费 |
| Collection 分享 | 2026.06 | 协作文献管理 | 付费 |

> 注：上线时间为根据 Consensus 产品更新记录整理。

---

## 八、总结

Consensus 的独特价值不在于帮你"找论文"——很多工具都能做到。它的价值在于帮你**理解证据的分布和方向**。它把文献综述中最耗时的一部分——读大量摘要、对比各方观点、判断学界共识——压缩到几分钟。

2025-2026 年之间，Consensus 从一个搜索工具扩展为包含文献管理（My Library）、引用网络（Citation Graph）、复杂分析（Research Agent / Deep Search）和 AI 工具集成（MCP）的研究平台。

最值得记住的一句话：

**Consensus 不是搜索引擎，而是证据聚合器——它告诉你的不是"有哪些论文"，而是"学界对这个问题怎么看"。并且，它的关键结论指向一篇篇真实存在的论文——但你仍需要自己去读、去判断。**

---

### 参考资料

- [Consensus Help Center: How Consensus Works](https://help.consensus.app/en/articles/9922673-how-consensus-works)
- [Consensus Product Changelog](https://help.consensus.app/en/articles/11954907-consensus-product-changelog)
- [Consensus Blog: Research Agent](https://consensus.app/home/features/research-agent/)
- [Consensus MCP Integration](https://consensus.app/home/mcp/)
- [Consensus Blog: $30M Fundraise](https://consensus.app/home/blog/30m-in-new-funding-to-reach-the-next-10m-researchers/)
