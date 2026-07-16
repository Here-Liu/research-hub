import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("public/articles/ResearchRabbit-小红书配图");
fs.mkdirSync(outDir, { recursive: true });

const cards = [
  {
    file: "A1-笔记风-HTML-封面",
    eyebrow: "Research Rabbit",
    title: ["别再用", "关键词", "找文献了"],
    subtitle: "用引用网络发现你漏掉的关键论文",
    chips: ["科研工具", "文献发现", "Zotero 工作流"],
    accent: "关键词",
    mode: "cover",
  },
  {
    file: "A2-笔记风-HTML-痛点",
    eyebrow: "痛点",
    title: ["找文献最难的", "不是读"],
    subtitle: "而是你根本不知道该搜什么",
    chips: ["新领域", "关键词焦虑", "开题/综述"],
    note: "先要知道答案，才能问对问题，这就是传统检索的死循环。",
    accent: "不是读",
  },
  {
    file: "A3-笔记风-HTML-核心逻辑",
    eyebrow: "核心逻辑",
    title: ["用一篇对的论文", "找到论文邻居"],
    subtitle: "不靠猜关键词，靠引用关系扩散",
    chips: ["References", "Cited By", "Similar Work"],
    note: "引用了谁 / 谁引用它 / 谁经常一起出现",
    accent: "论文邻居",
  },
  {
    file: "A4-笔记风-HTML-种子论文",
    eyebrow: "Step 1",
    title: ["先放", "3-5 篇", "种子论文"],
    subtitle: "种子选得准，图谱才不会散",
    bullets: ["一篇高引用经典论文", "一篇近期论文", "几篇高度相关论文"],
    accent: "3-5 篇",
  },
  {
    file: "A5-笔记风-HTML-看图谱",
    eyebrow: "Step 2",
    title: ["这样看", "文献图谱"],
    subtitle: "位置比列表更容易暴露价值",
    map: true,
    bullets: ["右上：近期 + 高影响力", "左上：早期 + 高影响力", "右下：新方向 / 冷门分支"],
    accent: "图谱",
  },
  {
    file: "A6-笔记风-HTML-工作流",
    eyebrow: "完整闭环",
    title: ["从发现到写作", "这样串起来"],
    subtitle: "Research Rabbit 不是孤立工具",
    flow: ["RR 发现", "Zotero 管理", "PDF 精读", "Obsidian 内化", "写作回搜"],
    accent: "写作",
  },
  {
    file: "A7-笔记风-HTML-适合谁",
    eyebrow: "适合谁",
    title: ["这 4 类人", "可以直接用"],
    subtitle: "尤其适合科研早期和综述阶段",
    bullets: ["刚进新领域的人", "正在写综述的人", "怕漏关键文献的人", "已经用 Zotero 的人"],
    accent: "4 类人",
  },
  {
    file: "A8-笔记风-HTML-总结",
    eyebrow: "记住这句",
    title: ["不是搜关键词", "而是探索引用网络"],
    subtitle: "发现你不知道，但应该知道的论文",
    chips: ["少漏文献", "看清关系", "持续迭代"],
    note: "Research Rabbit 改变的不是搜索入口，而是文献发现方式。",
    accent: "引用网络",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderTitle(lines, accent) {
  return lines
    .map((line) => {
      const safe = escapeHtml(line);
      if (accent && line.includes(accent)) {
        return `<div>${safe.replace(escapeHtml(accent), `<span>${escapeHtml(accent)}</span>`)}</div>`;
      }
      return `<div>${safe}</div>`;
    })
    .join("");
}

function renderCard(card, index) {
  const bullets = card.bullets
    ? `<div class="bullets">${card.bullets.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`
    : "";
  const chips = card.chips
    ? `<div class="chips">${card.chips.map((item) => `<b>${escapeHtml(item)}</b>`).join("")}</div>`
    : "";
  const note = card.note ? `<div class="note">${escapeHtml(card.note)}</div>` : "";
  const map = card.map
    ? `<div class="map">
        <div class="axis y">影响力</div><div class="axis x">时间</div>
        <i style="left:24%;top:22%"></i><i class="hot" style="left:76%;top:20%"></i>
        <i style="left:70%;top:66%"></i><i style="left:38%;top:48%"></i>
        <svg viewBox="0 0 520 280" aria-hidden="true">
          <path d="M120 80 C220 120 270 120 400 75" />
          <path d="M120 80 C190 160 250 180 365 205" />
          <path d="M210 145 C285 112 350 110 400 75" />
        </svg>
      </div>`
    : "";
  const flow = card.flow
    ? `<div class="flow">${card.flow.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`
    : "";

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(card.file)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      width: 1080px;
      height: 1440px;
      overflow: hidden;
      font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
      background: #fdf6ec;
      color: #261b12;
    }
    .page {
      position: relative;
      width: 1080px;
      height: 1440px;
      padding: 86px 70px 72px;
      background:
        linear-gradient(rgba(217,119,6,.055) 1px, transparent 1px),
        linear-gradient(90deg, rgba(74,144,217,.055) 1px, transparent 1px),
        radial-gradient(circle at 16% 12%, rgba(255, 222, 158, .78), transparent 22%),
        radial-gradient(circle at 92% 82%, rgba(74,144,217,.16), transparent 24%),
        #fdf6ec;
      background-size: 42px 42px, 42px 42px, auto, auto, auto;
    }
    .page:before {
      content: "";
      position: absolute;
      inset: 34px;
      border: 3px solid rgba(38,27,18,.72);
      border-radius: 26px;
      transform: rotate(-.35deg);
      pointer-events: none;
    }
    .tape {
      display: inline-block;
      padding: 14px 28px;
      margin-left: 6px;
      background: #d8ecff;
      color: #225f99;
      font-size: 38px;
      font-weight: 800;
      line-height: 1;
      transform: rotate(-2deg);
      box-shadow: 0 10px 0 rgba(74,144,217,.12);
    }
    .number {
      position: absolute;
      right: 84px;
      top: 86px;
      width: 98px;
      height: 98px;
      border-radius: 999px;
      border: 4px solid #d97706;
      color: #d97706;
      display: grid;
      place-items: center;
      font-size: 36px;
      font-weight: 900;
      transform: rotate(5deg);
      background: rgba(255,255,255,.38);
    }
    h1 {
      margin: 84px 0 0;
      font-size: ${card.mode === "cover" ? "140px" : "104px"};
      line-height: .98;
      font-weight: 950;
      letter-spacing: 0;
    }
    h1 span {
      color: #d97706;
      position: relative;
      display: inline-block;
    }
    h1 span:after {
      content: "";
      position: absolute;
      left: -10px;
      right: -10px;
      bottom: 8px;
      height: 24px;
      background: rgba(255, 107, 53, .2);
      z-index: -1;
      transform: rotate(-1deg);
    }
    .subtitle {
      width: 88%;
      margin-top: 38px;
      font-size: 42px;
      line-height: 1.22;
      font-weight: 700;
      color: #4b3a2a;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      margin-top: 54px;
    }
    .chips b {
      padding: 15px 22px 14px;
      border: 3px solid #4a90d9;
      border-radius: 999px;
      color: #225f99;
      background: rgba(255,255,255,.45);
      font-size: 30px;
      line-height: 1;
    }
    .note {
      margin-top: 58px;
      padding: 26px 30px;
      border-left: 10px solid #d97706;
      background: rgba(255,255,255,.56);
      font-size: 34px;
      line-height: 1.36;
      font-weight: 700;
      color: #594432;
    }
    .bullets {
      margin-top: 56px;
      display: grid;
      gap: 20px;
    }
    .bullets p {
      margin: 0;
      padding: 24px 28px 24px 78px;
      min-height: 86px;
      position: relative;
      background: rgba(255,255,255,.58);
      border: 3px solid rgba(38,27,18,.72);
      border-radius: 18px;
      font-size: 36px;
      font-weight: 800;
      line-height: 1.14;
      box-shadow: 8px 8px 0 rgba(217,119,6,.14);
    }
    .bullets p:before {
      content: "";
      position: absolute;
      left: 27px;
      top: 31px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #d97706;
      box-shadow: 0 0 0 8px rgba(217,119,6,.16);
    }
    .flow {
      margin-top: 62px;
      display: grid;
      gap: 16px;
    }
    .flow p {
      margin: 0;
      padding: 22px 28px;
      width: max-content;
      min-width: 420px;
      background: rgba(255,255,255,.62);
      border: 3px solid #4a90d9;
      border-radius: 18px;
      color: #225f99;
      font-size: 34px;
      font-weight: 900;
      position: relative;
    }
    .flow p:nth-child(even) { margin-left: 185px; border-color: #d97706; color: #9a4f00; }
    .flow p:not(:last-child):after {
      content: "↓";
      position: absolute;
      right: -64px;
      bottom: -42px;
      color: #d97706;
      font-size: 42px;
      transform: rotate(-12deg);
    }
    .map {
      margin-top: 42px;
      width: 850px;
      height: 430px;
      position: relative;
      background: rgba(255,255,255,.58);
      border: 4px solid #261b12;
      border-radius: 22px;
      box-shadow: 10px 10px 0 rgba(74,144,217,.13);
    }
    .map:before, .map:after {
      content: "";
      position: absolute;
      background: #261b12;
    }
    .map:before { left: 78px; top: 48px; bottom: 66px; width: 4px; }
    .map:after { left: 78px; right: 58px; bottom: 66px; height: 4px; }
    .axis {
      position: absolute;
      color: #7b6048;
      font-size: 27px;
      font-weight: 900;
    }
    .axis.y { left: 28px; top: 40px; writing-mode: vertical-rl; }
    .axis.x { right: 50px; bottom: 20px; }
    .map i {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #4a90d9;
      border: 4px solid #fff;
      box-shadow: 0 0 0 5px rgba(74,144,217,.2);
      z-index: 2;
    }
    .map i.hot {
      width: 40px;
      height: 40px;
      background: #d97706;
      box-shadow: 0 0 0 8px rgba(217,119,6,.18);
    }
    .map svg {
      position: absolute;
      left: 110px;
      top: 58px;
      width: 650px;
      height: 310px;
    }
    .map path {
      fill: none;
      stroke: rgba(38,27,18,.42);
      stroke-width: 5;
      stroke-linecap: round;
      stroke-dasharray: 10 12;
    }
    .doodles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .ring {
      position: absolute;
      width: 128px;
      height: 128px;
      border: 8px solid rgba(217,119,6,.26);
      border-radius: 50%;
      transform: rotate(-12deg);
    }
    .ring.one { right: 112px; bottom: 158px; }
    .ring.two { left: 112px; bottom: 96px; border-color: rgba(74,144,217,.24); width: 92px; height: 92px; }
    .footer {
      position: absolute;
      left: 72px;
      bottom: 72px;
      right: 72px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #7b6048;
      font-size: 27px;
      font-weight: 800;
    }
    .seal {
      padding: 12px 18px;
      border: 4px solid #d97706;
      color: #d97706;
      border-radius: 12px;
      transform: rotate(-3deg);
      background: rgba(255,255,255,.5);
    }
  </style>
</head>
<body>
  <main class="page">
    <div class="tape">${escapeHtml(card.eyebrow)}</div>
    <div class="number">${String(index + 1).padStart(2, "0")}</div>
    <h1>${renderTitle(card.title, card.accent)}</h1>
    <div class="subtitle">${escapeHtml(card.subtitle)}</div>
    ${chips}
    ${bullets}
    ${map}
    ${flow}
    ${note}
    <div class="doodles"><div class="ring one"></div><div class="ring two"></div></div>
    <div class="footer"><span>文献发现工作流</span><span class="seal">收藏备用</span></div>
  </main>
</body>
</html>`;
}

for (const [index, card] of cards.entries()) {
  fs.writeFileSync(path.join(outDir, `${card.file}.html`), renderCard(card, index), "utf8");
}

console.log(`Generated ${cards.length} HTML cards in ${outDir}`);
