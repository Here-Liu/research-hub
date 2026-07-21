#!/usr/bin/env python3
"""
Auto Content Site Generator
- Reads research from ./research/*.md
- Generates HTML articles + index page
- Output to ./public/
"""

import os
import re
import glob
from datetime import datetime, date
from pathlib import Path

# Resolve paths relative to this script's location (works locally and in CI)
SCRIPT_DIR = Path(__file__).parent.resolve()
BASE_DIR = SCRIPT_DIR
RESEARCH_DIR = BASE_DIR / "research"
OUTPUT_DIR = BASE_DIR / "public"
TEMPLATE = BASE_DIR / "templates" / "base.html"
SITE_TITLE = "Research Hub"
SITE_DESC = "AI 自动生成的研究效率工具指南"

ensure = lambda p: p.mkdir(parents=True, exist_ok=True)
ensure(OUTPUT_DIR)

def read_template():
    with open(TEMPLATE, encoding="utf-8") as f:
        return f.read()

def _inline_format(text):
    """Convert **bold**, *italic*, `code`, and [links](url) to HTML."""
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'`(.+?)`', r'<code>\1</code>', text)
    text = re.sub(r'\[(.+?)\]\((.+?)\)', r'<a href="\2">\1</a>', text)
    return text

def md_to_html(md_text):
    """Simple markdown to HTML conversion for our structured format."""
    html = ""
    in_list = False
    in_code = False
    lines = md_text.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        # fenced code block
        if line.strip().startswith("```"):
            if not in_code:
                html += "<pre><code>\n"
                in_code = True
            else:
                html += "</code></pre>\n"
                in_code = False
            i += 1
            continue
        if in_code:
            html += line + "\n"
            i += 1
            continue
        # Headers
        if line.startswith("### "):
            html += f"<h3>{line[4:]}</h3>\n"
            i += 1
            continue
        elif line.startswith("## "):
            html += f"<h2>{line[3:]}</h2>\n"
            i += 1
            continue
        elif line.startswith("# "):
            html += f"<h1>{line[2:]}</h1>\n"
            i += 1
            continue
        # list detection (strip leading whitespace)
        stripped = line.lstrip()
        if stripped.startswith("- **") and "**：" in stripped:
            key = stripped[2:].split("**：", 1)[0]
            val = stripped.split("**：", 1)[1]
            html += "<p><strong>" + key.strip("*") + "</strong>\uff1a" + _inline_format(val.strip()) + "</p>\n"
        elif stripped.startswith("- "):
            html += "<li>" + _inline_format(stripped[2:]) + "</li>\n"
        elif stripped and stripped[0].isdigit() and stripped[1:3] in (". ", ".\t"):
            html += "<li>" + _inline_format(stripped[3:]) + "</li>\n"
            in_list = True
        # table detection
        elif line.strip().startswith("|") and line.strip().endswith("|"):
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            # detect separator row (|---|)
            is_sep = all(re.match(r'^-{1,}$', c) for c in cells)
            if is_sep:
                i += 1
                continue  # skip separator row, table already started
            if not hasattr(md_to_html, "_in_table"):
                md_to_html._in_table = False
                md_to_html._table_header = True
            if not md_to_html._in_table:
                html += "<table>\n<thead>\n<tr>"
                for c in cells:
                    html += f"<th>{_inline_format(c)}</th>"
                html += "</tr>\n</thead>\n<tbody>\n"
                md_to_html._in_table = True
                md_to_html._table_header = False
            elif md_to_html._table_header:
                # This shouldn't happen if we skip separators, but just in case
                md_to_html._table_header = False
            else:
                html += "<tr>"
                for c in cells:
                    html += f"<td>{_inline_format(c)}</td>"
                html += "</tr>\n"
        elif line.strip() == "":
            if in_list:
                html += "</ul>\n"
                in_list = False
            # close table if open
            if hasattr(md_to_html, "_in_table") and md_to_html._in_table:
                html += "</tbody>\n</table>\n"
                md_to_html._in_table = False
            html += "\n"
        else:
            if in_list:
                html += "</ul>\n"
                in_list = False
            # inline formatting
            html += f"<p>{_inline_format(line)}</p>\n"
        i += 1
    if in_list:
        html += "</ul>\n"
    return html

def parse_research(filepath):
    """Parse a research markdown file and extract metadata."""
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    # Extract title from first header or filename
    title_match = re.search(r'^# (.+)', content)
    if not title_match:
        title_match = re.search(r'^## (.+)', content)
    if not title_match:
        title_match = re.search(r'今日主题[：:]\s*(.+)', content)

    title = title_match.group(1).strip() if title_match else Path(filepath).stem

    # Extract feasibility score
    score_match = re.search(r'可行性评分\*\*[：:]\s*(\d+)', content)
    if not score_match:
        score_match = re.search(r'可行性评分[：:]\s*(\d+)', content)
    score = int(score_match.group(1)) if score_match else 0

    # Extract date from filename or content
    date_match = re.search(r'(\d{4}-\d{2}-\d{2})', filepath.name)
    article_date = date_match.group(1) if date_match else ""

    # Get first ~150 chars as excerpt
    # Look for explicit description paragraph, fallback to first meaningful paragraph
    desc_match = re.search(r'^[^#\n].{0,300}(?:。|\.|\n\n)', content, re.MULTILINE)
    if desc_match:
        excerpt = desc_match.group(0).strip().replace("\n", " ")
    else:
        excerpt = content[:300].strip().replace("\n", " ")
    # strip markdown formatting
    excerpt = re.sub(r'\*\*(.+?)\*\*', r'\1', excerpt)
    excerpt = re.sub(r'#+\s*', '', excerpt)
    excerpt = re.sub(r'\s+', ' ', excerpt).strip()
    # truncate at the first proper sentence or to 200 chars
    if len(excerpt) > 200:
        sentences = re.split(r'([。！？])', excerpt[:200])
        if len(sentences) > 1:
            excerpt = ''.join(sentences[:2]).rstrip()
        else:
            excerpt = excerpt[:197] + "..."

    return {
        "title": title,
        "date": article_date,
        "score": score,
        "excerpt": excerpt,
        "content": content,
        "slug": Path(filepath).stem,
    }

def render_page(template, body, title=SITE_TITLE, desc=SITE_DESC):
    return template.replace("{{ TITLE }}", title) \
                   .replace("{{ DESCRIPTION }}", desc) \
                   .replace("{{ CONTENT }}", body)

def build_site():
    template = read_template()
    files = sorted(glob.glob(str(RESEARCH_DIR / "*.md")), reverse=True)

    articles = []
    for f in files:
        try:
            a = parse_research(Path(f))
            articles.append(a)
        except Exception as e:
            print(f"  [skip] {f}: {e}")

    if not articles:
        print("No research articles found yet. Run the cron job first or create sample data.")
        # Build an empty index
        body = f"""
        <header>
            <h1>{SITE_TITLE}</h1>
            <p>{SITE_DESC}</p>
        </header>
        <div class="article-content">
            <p>暂无文章。每日 cron job 会在每天早上 9:00 产出研究内容。</p>
        </div>
        """
        index_html = render_page(template, body)
        with open(OUTPUT_DIR / "index.html", "w", encoding="utf-8") as f:
            f.write(index_html)
        print("Empty index generated.")
        return

    # --- Build index page ---
    body = f"""
    <header>
        <h1>{SITE_TITLE}</h1>
        <p>{SITE_DESC} · 共 {len(articles)} 篇</p>
    </header>
    <div class="article-list">
    """
    for a in articles:
        tag_html = f'<span class="article-tag">可行性 {a["score"]}/5</span>' if a["score"] > 0 else ''
        body += f"""
        <div class="article-item">
            <h2><a href="articles/{a['slug']}.html">{a['title']}</a></h2>
            <div class="article-meta">
                {tag_html}
                <span>{a['date']}</span>
            </div>
            <div class="article-excerpt">{a['excerpt']}</div>
        </div>
        """
    body += "</div>\n"

    index_html = render_page(template, body)
    with open(OUTPUT_DIR / "index.html", "w", encoding="utf-8") as f:
        f.write(index_html)
    print(f"Index generated: {len(articles)} articles")

    # --- Build article detail pages ---
    articles_dir = OUTPUT_DIR / "articles"
    ensure(articles_dir)

    for a in articles:
        content_html = md_to_html(a["content"])
        score_line = f"{a['date']} · 可行性 <div class=\"score-bar\" style=\"--score: {min(a['score'] * 20, 100)}%\"></div> <span>{a['score']}/5</span>" if a["score"] > 0 else a["date"]

        body = f"""
        <header>
            <a href="../index.html" class="back-link">← 返回首页</a>
            <h1>{a['title']}</h1>
            <p style="color:var(--muted);font-size:0.85em;">
                {score_line}
            </p>
        </header>
        <div class="article-content">
            {content_html}
        </div>
        """

        article_title = a["title"][:60]
        article_html = render_page(template, body, title=article_title, desc=a["excerpt"])
        with open(articles_dir / f"{a['slug']}.html", "w", encoding="utf-8") as f:
            f.write(article_html)
        print(f"  Article: {a['slug']}.html")

    print(f"Site built: {OUTPUT_DIR}")
    return True

if __name__ == "__main__":
    build_site()
