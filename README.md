# 科研提效日报 · Research Hub

每日 AI 自动调研一个科研提效工具/工作流。

## 内容

覆盖科研工作全流程：
- AI + Research Rabbit — 文献发现与引用网络可视化
- Zotero + Obsidian — 文献管理与笔记自动化
- MinerU / PDF 转 Markdown
- AI 辅助论文精读
- 学术视频/讲座自动总结
- 学术写作 AI 提效
- 综合科研工作流编排

## 技术架构

```
GitHub → Actions (build_site.py) → GitHub Pages
                                ↕
cron job (macOS 本地 9:00) → ~/finance-research/*.md
```

- cron job 每天早上 9:00 自动研究一个选题，产出 markdown
- push 到 main 分支后，GitHub Actions 自动构建并部署到 Pages
