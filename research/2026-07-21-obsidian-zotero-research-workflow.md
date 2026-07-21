# Zotero + Obsidian：科研精读工作流

读论文这件事，最痛苦的不是读，而是**读完了找不着**。

日积月累几十上百篇 PDF，存在微信收藏、浏览器书签、文件夹、云盘里，每次写东西都要翻三遍。更麻烦的是：文献里的核心段落、自己的批注、当时想到的灵感，分散在四个地方，最后根本连不起来。

Zotero + Obsidian 这条链路就是用来解决这个问题的：

- **Zotero** 负责「收集、管理、标注、引用」文献
- **Obsidian** 负责「把标注变成笔记，把笔记连成知识网络」

整个流程只有三个环节：入库 → 标注 → 出笔记。

---

## 一、先让 Zotero 把文献管起来

Zotero 是一个开源文献管理器。它的核心作用不是存 PDF，而是给每篇文献建立一个**结构化条目**：标题、作者、期刊、年份、DOI、PDF 附件、你的标签、你的笔记。

### 1.1 安装与同步

1. 下载 [Zotero 7](https://www.zotero.org/) 桌面版
2. 安装浏览器插件 Zotero Connector
3. 注册账号并开启同步

浏览器插件是最关键的一步。看到网页上的论文 PDF，点一下插件图标，整篇论文的元数据和 PDF 会一起进入 Zotero 库。

### 1.2 安装 Better BibTeX

Better BibTeX 是 Zotero 的插件，用来给每篇文献生成一个唯一的**引用键（citekey）**，比如 `clark_1998`、`phelan_2023`。

这个 citekey 是后续在 Obsidian 里引用文献的基础。

安装方式：

1. 下载 [Better BibTeX for Zotero 7](https://retorque.re/zotero-better-bibtex/) 的 `.xpi` 文件
2. 在 Zotero 菜单里选择 **Tools → Plugins → Install Plugin From File**
3. 重启 Zotero

引用键格式建议用 `auth.year`，简洁稳定。

---

## 二、在 Obsidian 里接文献

Zotero 只解决「文献管理」；要让文献真正进入你的知识系统，需要 Obsidian 里的两个插件。

### 2.1 插件清单

| 插件 | 作用 |
|---|---|---|
| **Zotero Integration** | 把 Zotero 里的文献条目、元数据、PDF 标注批量导入 Obsidian |
| **Pandoc Reference List** | 在 Obsidian 里写论文时自动格式化引用 |
| **Templater** | 让导入的文献笔记按统一模板生成 |

Zotero Integration 是核心。Pandoc Reference List 只有在写论文输出时才需要。Templater 则决定了你的文献笔记长什么样。

### 2.2 配置 Zotero Integration

安装后进入插件设置：

1. **开启 PDF Utility**：插件会自动下载一个 PDF 处理工具，用来读取标注。
2. **添加 Import Format**：
   - 名称：`Literature Note`
   - 输出路径：`Sources/Literature Notes/@{{citekey}}.md`
   - 图片附件路径：`Sources/Literature Notes/attachments`
3. **关联模板文件**：选择你准备好的 Templater 模板。

输出路径中的 `{{citekey}}` 会动态替换为 Better BibTeX 生成的引用键。所以运行一次命令后，Obsidian 里会自动生成一篇名为 `@clark_1998.md` 的文献笔记。

---

## 三、文献笔记模板

下面是一份经过验证的 Templater 模板。它的核心目标是把 Zotero 里的元数据和 PDF 标注一次性落到 Obsidian 里，同时保留后续追加标注的能力。

```markdown
---
category: literaturenote
tags: {% if allTags %}{{allTags}}{% endif %}
citekey: {{citekey}}
status: unread
---

> [!Cite]
> {{bibliography}}

> [!Meta]
> **Title**:: {{title}}
> **Year**:: {{date | format("YYYY")}}
> **Citekey**:: {{citekey}}
> **Journal**:: {{publicationTitle}}
> **DOI**:: {{DOI}}
> **Link**:: [PDF](file://{{attachment.path}})

> [!Abstract]
> {{abstractNote}}

# Notes
{{markdownNotes}}

# Annotations
{% persist "annotations" %}
{% set newAnnotations = annotations | filterby("date", "dateafter", lastImportDate) %}
{% if newAnnotations.length > 0 %}

### Imported: {{importDate | format("YYYY-MM-DD")}}

{% for a in newAnnotations %}
{{calloutHeader(a.type, a.color)}}
> {{a.annotatedText}}
{% endfor %}

{% endif %}
{% endpersist %}
```

关键部分：

- `{{bibliography}}`：自动输出按你选定的引用格式（如 APA）生成的完整引用
- `{{abstractNote}}`：导入摘要
- `{{markdownNotes}}`：导入你在 Zotero 里写的笔记
- `annotations` 块：用 `persist` 包裹，保证重新导入时**只追加新标注，不覆盖旧笔记**

`calloutHeader` 是一个小宏，可以根据标注类型（高亮/文本）和颜色给不同段落打上分类。

---

## 四、实际工作流

### 4.1 收集阶段

在浏览器里看到论文，点击 Zotero Connector，选择要放入的文件夹，确认即可。PDF 和元数据会一起进入 Zotero。

如果有网页文章，也可以保存为 snapshot。

### 4.2 标注阶段

在 Zotero 的 PDF 阅读器里直接划线、写批注。建议用一套颜色规则，比如：

| 颜色 | 含义 |
|---|---|---|
| 🟡 黄色 | 重要观点或论据 |
| 🔴 红色 | 质疑或不同意的部分 |
| 🟢 绿色 | 与已有知识一致、可确认的内容 |
| 🟣 紫色 | 不懂、需要后续查证 |

颜色规则不是强制的，但有一个统一的编码会方便后续整理。

### 4.3 导入阶段

在 Obsidian 里按 `Cmd/Ctrl + P` 打开命令面板，运行 **Zotero Integration: Create Literature Note**。在弹出的搜索框里输入论文名称或 citekey，回车。

几秒后，Obsidian 的 `Sources/Literature Notes/` 目录下会生成一篇文献笔记，包含：

- 完整引用格式
- 元数据
- 摘要
- 你的批注
- 高亮段落

### 4.4 重新导入追加标注

同一篇文献可以重复导入。由于模板里用了 `persist` 块，新标注会被追加到已有笔记末尾，旧内容不会被覆盖。

这一点对长期跟踪文献特别有用。你可以分多次读一篇论文，每次的标注都自动合并到同一篇笔记里。

---

## 五、从文献笔记到写作

文献笔记本身不是终点。下一步是在 Obsidian 里把它变成自己的思考单元。

### 5.1 创建原子笔记

从文献笔记里挑出一个值得深入的概念，创建一篇新的原子笔记，比如：

```markdown
# 延展认知（Extended Mind）

延展认知认为，认知过程不仅发生在大脑内，也可以延伸到外部工具和环境之中。

来源：[[@clark_1998]]
```

这就是双链笔记的威力。`[[@clark_1998]]` 既是一个内部链接，又指向那篇文献笔记。

### 5.2 用 Pandoc 写正式论文

如果你要写论文，可以打开 Pandoc Reference List：

1. 在插件设置里启用 **Pull Bibliography from Zotero**
2. 开启 **Show Citekey Suggestions**
3. 在文中需要引用的地方输入 `[@clark_1998]`

插件会自动把引用格式化为 APA 等样式，并在侧边栏生成可复制的参考文献列表。

---

## 六、常见坑与建议

| 问题 | 原因 | 解决 |
|---|---|---|
| 导入后 PDF 链接打不开 | 路径里带空格或中文 | 用模板里的 `replace(" ", "%20")` 处理 |
| 重新导入覆盖了旧笔记 | 没用 `persist` 块 | 在模板里加上 `persist` |
| 标注识别乱码 | 老 PDF 没有 OCR | 换成清晰版本或用 MinerU 预处理 |
| Zotero 同步失败 | 文件没同步到云端 | 检查 Edit → Preferences → Sync |
| 引用格式不对 | 没选 CSL | 在 Zotero 或插件设置里指定样式 |

---

## 七、适合谁

这条工作流最适合：

- 需要长期跟踪大量文献的研究生、博士生、科研人员
- 写综述、论文时需要反复引用同一批文献的人
- 习惯用双链笔记做知识管理，但想把文献系统接进来的人

如果你只是偶尔读一两篇论文，这套工作流的前期成本有点高。但一旦论文数量超过 20 篇，Zotero + Obsidian 的回报会非常明显。

---

## 八、总结

```
Zotero Connector 收集
        ↓
Zotero 管理 + PDF 标注
        ↓
Zotero Integration → Obsidian 文献笔记
        ↓
原子笔记 + 双链连接
        ↓
Pandoc 输出论文
```

这套流程的终点不是「笔记很漂亮」，而是**你能随时找到读过的内容，并把它真正用起来**。
