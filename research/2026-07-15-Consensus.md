# Consensus 完全指南：AI 文献搜索与证据分析工具

## 一、它解决什么问题？

做文献调研时，你经常遇到这些场景：

- 想知道"XX 疗法对 XX 疾病有效吗？"——传统搜索给你一堆论文，你得自己逐篇读摘要找结论
- 写论文时需要引用证据支持某个论点，但不确定有没有最新的研究反驳你的观点
- 刚进入一个新领域，需要快速了解学界对这个问题的"共识"是什么

传统的 Google Scholar 返回的是论文列表，你需要自己读、自己总结、自己判断哪边的证据更强。这个过程极其耗时。

**Consensus** 解决的方式完全不同：你直接问一个问题，它搜索 2.2 亿+ 篇同行评审论文，用 AI 读完后告诉你"答案是 Yes / No / Possibly"，并且给出每篇支持论文的证据摘要。

## 二、核心原理

### 2.1 不是聊天机器人，是研究助手

Consensus 和 ChatGPT、Claude 这类通用 AI 的关键区别在于：

- **ChatGPT/Claude**：基于训练数据生成回答，可能会"编造"引用（幻觉），引用可能指向不存在的论文
- **Consensus**：不生成自由回答，而是**先搜索学术数据库**，找到真实存在的论文，再从论文中提取答案

它的数据库覆盖 **2.2 亿+** 篇论文，数据来源于 Semantic Scholar、OpenAlex 和网络爬取。

### 2.2 核心功能：研究问题问答

这是 Consensus 最独特的功能。你可以问一个 Yes/No 类型的研究问题，比如：

> "Does intermittent fasting improve cognitive function?"

Consensus 会返回一个仪表盘：
- **Yes** — 支持该结论的论文数量
- **No** — 反对该结论的论文数量
- **Possibly** — 结论不明确的论文数量

每篇论文都附带摘要和引用链接，你可以一键查看原文。

### 2.3 其他功能

- **Copilot**：AI 对话模式，可以针对搜索结果追问细节
- **Topic Summary**：对某个主题自动生成研究总结
- **Paper Analysis**：上传或搜索某篇论文，AI 帮你分析研究方法、样本量、局限性
- **Reference Finder**：写作时输入一段话，Consensus 找到支持这段话的学术引用
- **Collections**：保存和组织论文到项目文件夹
- **Consensus Meter**：可视化展示学界对该问题的共识分布

## 三、完整实操指南

### Step 0：注册

访问 [consensus.app](https://consensus.app/)，注册免费账号。免费版每天有一定次数的搜索额度。如果需要更多，有 Premium 付费版（学生折扣）。

### Step 1：提出研究问题

在搜索框输入一个具体的研究问题。关键技巧：

- **要具体**：不要问"Does diet affect health?"，太宽泛了
- **要可回答**：最好是 Yes/No 类型的问题
- **好的例子**："Does mindfulness meditation reduce anxiety in college students?"
- **差的例子**："Tell me about meditation"

### Step 2：阅读 Consensus Meter

搜索结果页顶部是一个共识仪表盘，分为三栏：

| Yes | Possibly | No |
|-----|----------|-----|
| 12 篇支持 | 5 篇部分支持 | 3 篇反对 |

每栏下面是论文列表，显示：
- 论文标题和作者
- 发表年份和期刊
- 一句话摘要（AI 从论文中提取的对该问题的结论）
- "Study Snapshots" 按钮（展开研究方法、样本量等详情）

### Step 3：筛选和深入

使用左侧筛选器：
- 按发表年份范围筛选（只看近 5 年）
- 按研究方法筛选（RCT、Meta-analysis、Observational 等）
- 按期刊/领域筛选
- 按被引次数排序

找到感兴趣的论文后：
- 点击标题查看完整摘要
- 点击 "Open PDF" 跳转到原文
- 点击 "Cite" 导出引用格式（APA、MLA 等）

### Step 4：使用 Copilot 深入探索

点击 "Copilot" 进入对话模式。你可以：

- **追问细节**："What were the sample sizes in these studies?"
- **对比研究**："How do the RCT results differ from observational studies?"
- **找矛盾**："Which studies oppose this conclusion and why?"
- **扩展问题**："What about the effects on elderly populations?"

Copilot 的回答都基于数据库中的真实论文，不会自由发挥。

### Step 5：保存到 Collection

- 创建项目文件夹，比如"论文文献综述"、"开题报告参考"
- 把相关的论文拖入 Collection
- 导出 Collection 为 CSV 或 RIS 格式，导入到 Zotero

## 四、同类工具对比

| 特性 | Consensus | Research Rabbit | Elicit | 关键词搜索 |
|------|-----------|-----------------|--------|-----------|
| 核心能力 | 研究问题问答 | 引用网络发现 | 论文筛选与提取 | 关键词匹配 |
| 搜索方式 | 自然语言问题 | 种子论文 | 关键词/问题 | 关键词 |
| 数据库 | 2.2 亿篇 | 2.7 亿篇 | 1.2 亿篇 | 依平台 |
| 答案形式 | Yes/No/证据摘要 | 图谱可视化 | 表格提取 | 列表 |
| 引用溯源 | ✅ 每句有引用 | ✅ 论文关联 | ✅ 表格 + 引用 | ❌ |
| 免费版 | ✅ 有限搜索/天 | ✅ 完全免费 | ✅ 有限 | ✅ 完全免费 |
| Zotero 集成 | ❌ | ✅ | ❌ | 手动 |

### 选型建议

- **快速验证一个研究问题** → Consensus（直接问 Yes/No，看证据分布）
- **做文献综述、找全相关论文** → Research Rabbit（从种子论文出发，引用网络扩散）
- **提取论文中的关键数据** → Elicit（表格化提取方法、样本量等）
- **日常搜索** → 三者互补：Consensus 问问题 → RR 找全文献 → Elicit 提取数据

## 五、实用技巧与注意事项

### 提问技巧
- 用 Yes/No 问句格式，Consensus 的效果最好
- 加上人群限定词："in older adults"、"in Chinese population" 等
- 如果结果太少，放宽问题范围；结果太多，增加限定条件
- 用 Copilot 模式处理开放式问题（"What are the key factors..."）

### 常见误区
- **把 Consensus 当通用 AI 用** — 不要问它"写一篇论文"，它不擅长自由生成
- **只看 Yes 栏** — 学术研究中有争议是常态，Possibly 和 No 栏同样有价值
- **不验证引用** — 虽然 Consensus 的引用是真实的，但 AI 提取的摘要可能有偏差，关键论文还是要去读原文
- **忽略研究方法** — 一篇 RCT 和一篇回顾性研究的证据等级不同，Consensus 不会自动区分，需要你自己判断

### 和 Research Rabbit 搭配使用

两者互补性很强：

1. **先 Consensus**：快速了解一个研究问题，找到 5-10 篇核心论文
2. **再到 RR**：用这些核心论文做种子，通过引用网络发现更多相关文献
3. **回 Consensus**：用新发现的问题再去问，验证自己的研究方向

## 六、总结

Consensus 的独特价值不是帮你"找论文"——Paper 在这一点上做得更好——而是帮你**理解论文的证据指向**。它把文献综述中最耗时的一部分（读几十篇摘要、对比各方观点）压缩成几分钟。

最值得记住的一句话：
Consensus 不是搜索引擎，而是证据聚合器——它告诉你的不是"有哪些论文"，而是"学界对这个问题怎么看"。
