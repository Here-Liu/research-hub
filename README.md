# Research Hub

个人研究效率工具指南。

## 技术架构

```
GitHub → Actions (build_site.py) → GitHub Pages
```

push 到 main 分支后，GitHub Actions 自动构建并部署到 Pages。

文章源文件在 `research/` 目录下，每篇为一个 markdown 文件。
