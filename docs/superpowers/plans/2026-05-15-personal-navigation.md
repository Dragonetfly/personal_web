# Personal Navigation Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a warm, GitHub Pages ready personal navigation page with editable link data, search, lightweight motion, and responsive layout.

**Architecture:** Use a pure static single page at the repository root. `index.html` provides semantic shell and static fallbacks, `styles.css` owns the visual system and motion, and `script.js` owns editable content data, rendering, and search filtering.

**Tech Stack:** HTML, CSS, vanilla JavaScript, local static browser preview.

---

## File Structure

- Create `D:\personal_web\index.html`: semantic page shell, profile sections, search input, containers for featured links and categories, no build dependencies.
- Create `D:\personal_web\styles.css`: responsive warm visual style, richer UI details, hover/focus states, entrance animations, reduced-motion support.
- Create `D:\personal_web\script.js`: editable profile/social/featured/category data, DOM rendering, search filtering, no-match state.
- Create `D:\personal_web\.gitignore`: ignore `.superpowers/` local brainstorm artifacts.
- Optionally create `D:\personal_web\README.md`: short GitHub Pages usage and editing notes.

### Task 1: Project Static Shell

**Files:**
- Create: `D:\personal_web\index.html`
- Create: `D:\personal_web\.gitignore`

- [ ] **Step 1: Create the HTML shell**

Create `index.html` with:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A warm personal navigation hub for favorite links, tools, notes, and daily resources.">
    <title>Personal Navigation Hub</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
  </head>
  <body>
    <main class="page-shell">
      <section class="hero" aria-labelledby="profile-name">
        <div class="profile-card">
          <div class="avatar" aria-hidden="true">P</div>
          <div class="profile-copy">
            <p class="eyebrow">Personal Hub</p>
            <h1 id="profile-name">你的名字</h1>
            <p class="tagline">写代码，也收集有用和有趣的东西。</p>
            <div class="status-tags" id="status-tags" aria-label="Status tags"></div>
          </div>
        </div>
        <nav class="social-links" id="social-links" aria-label="Social links"></nav>
      </section>

      <section class="quick-grid" aria-label="Featured links and note">
        <div class="panel featured-panel">
          <div class="section-heading">
            <p class="eyebrow">Pinned</p>
            <h2>精选入口</h2>
          </div>
          <div class="featured-links" id="featured-links"></div>
        </div>
        <aside class="panel note-panel" aria-label="Daily note">
          <p class="eyebrow">Today</p>
          <p class="note-text">Keep a small garden of useful links.</p>
        </aside>
      </section>

      <section class="navigation-area" aria-labelledby="nav-title">
        <div class="section-heading nav-heading">
          <div>
            <p class="eyebrow">Bookmarks</p>
            <h2 id="nav-title">常用导航</h2>
          </div>
          <label class="search-box">
            <span class="sr-only">搜索链接</span>
            <input id="search-input" type="search" placeholder="搜索链接、分类或描述..." autocomplete="off">
          </label>
        </div>
        <div class="category-grid" id="category-grid"></div>
        <p class="empty-state" id="empty-state" hidden>没有找到匹配的链接，换个关键词试试。</p>
      </section>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Ignore local brainstorm artifacts**

Create `.gitignore` with:

```gitignore
.superpowers/
```

- [ ] **Step 3: Verify shell loads**

Run: `Test-Path D:\personal_web\index.html`

Expected: `True`

### Task 2: Content Data And Rendering

**Files:**
- Create: `D:\personal_web\script.js`

- [ ] **Step 1: Add editable data and render functions**

Create `script.js` with:

```javascript
const profile = {
  tags: ['Shanghai', 'AI Tools', 'Reading', 'Learning in public'],
  social: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'Blog', url: 'https://example.com/' },
    { label: 'Email', url: 'mailto:hello@example.com' }
  ],
  featured: [
    { title: '个人博客', description: '写作、笔记和长期想法', url: 'https://example.com/' },
    { title: 'GitHub', description: '代码、项目和实验', url: 'https://github.com/' },
    { title: '作品集', description: '整理值得展示的作品', url: 'https://example.com/' }
  ]
};

const categories = [
  {
    title: 'AI',
    accent: 'coral',
    links: [
      { title: 'ChatGPT', description: 'AI assistant and research partner', url: 'https://chatgpt.com/' },
      { title: 'Claude', description: 'Long-form thinking and writing', url: 'https://claude.ai/' },
      { title: 'Perplexity', description: 'Search with source-backed answers', url: 'https://www.perplexity.ai/' }
    ]
  },
  {
    title: '开发',
    accent: 'sage',
    links: [
      { title: 'GitHub', description: 'Code hosting and collaboration', url: 'https://github.com/' },
      { title: 'MDN', description: 'Web platform documentation', url: 'https://developer.mozilla.org/' },
      { title: 'Vercel', description: 'Frontend deployment platform', url: 'https://vercel.com/' }
    ]
  },
  {
    title: '阅读',
    accent: 'gold',
    links: [
      { title: 'Readwise Reader', description: 'Read, highlight, and review', url: 'https://readwise.io/read' },
      { title: '豆瓣读书', description: 'Books and reviews', url: 'https://book.douban.com/' },
      { title: '少数派', description: 'Digital life and productivity writing', url: 'https://sspai.com/' }
    ]
  },
  {
    title: '工具',
    accent: 'blue',
    links: [
      { title: 'Notion', description: 'Notes, docs, and lightweight systems', url: 'https://www.notion.so/' },
      { title: 'Figma', description: 'Design and interface references', url: 'https://www.figma.com/' },
      { title: 'Excalidraw', description: 'Fast sketching and diagrams', url: 'https://excalidraw.com/' }
    ]
  },
  {
    title: '影音',
    accent: 'rose',
    links: [
      { title: 'YouTube', description: 'Videos, talks, and tutorials', url: 'https://www.youtube.com/' },
      { title: 'Bilibili', description: '中文视频和学习内容', url: 'https://www.bilibili.com/' },
      { title: 'Spotify', description: 'Music and podcasts', url: 'https://open.spotify.com/' }
    ]
  },
  {
    title: '生活',
    accent: 'green',
    links: [
      { title: 'Google Maps', description: 'Places and routes', url: 'https://maps.google.com/' },
      { title: '小红书', description: '生活灵感和本地探索', url: 'https://www.xiaohongshu.com/' },
      { title: '天气', description: 'Daily weather glance', url: 'https://weather.com/' }
    ]
  }
];

const byId = (id) => document.getElementById(id);
const normalize = (value) => value.toLowerCase().trim();

function createLinkCard(link, categoryTitle) {
  const anchor = document.createElement('a');
  anchor.className = 'link-card';
  anchor.href = link.url;
  anchor.target = '_blank';
  anchor.rel = 'noreferrer noopener';
  anchor.dataset.search = normalize(`${link.title} ${link.description} ${categoryTitle}`);
  anchor.innerHTML = `
    <span class="link-mark" aria-hidden="true">${link.title.slice(0, 1)}</span>
    <span class="link-copy">
      <strong>${link.title}</strong>
      <small>${link.description}</small>
    </span>
  `;
  return anchor;
}

function renderProfile() {
  byId('status-tags').innerHTML = profile.tags.map((tag) => `<span>${tag}</span>`).join('');
  byId('social-links').innerHTML = profile.social
    .map((item) => `<a href="${item.url}" target="_blank" rel="noreferrer noopener">${item.label}</a>`)
    .join('');
  byId('featured-links').innerHTML = profile.featured
    .map((item) => `
      <a class="featured-card" href="${item.url}" target="_blank" rel="noreferrer noopener">
        <strong>${item.title}</strong>
        <small>${item.description}</small>
      </a>
    `)
    .join('');
}

function renderCategories() {
  const grid = byId('category-grid');
  grid.innerHTML = '';
  categories.forEach((category) => {
    const section = document.createElement('section');
    section.className = `category-card accent-${category.accent}`;
    section.dataset.category = category.title;
    section.innerHTML = `
      <div class="category-title">
        <h3>${category.title}</h3>
        <span>${category.links.length}</span>
      </div>
      <div class="link-list"></div>
    `;
    const list = section.querySelector('.link-list');
    category.links.forEach((link) => list.appendChild(createLinkCard(link, category.title)));
    grid.appendChild(section);
  });
}

function filterLinks(query) {
  const term = normalize(query);
  let visibleCount = 0;

  document.querySelectorAll('.category-card').forEach((category) => {
    let categoryVisible = 0;
    category.querySelectorAll('.link-card').forEach((card) => {
      const isVisible = !term || card.dataset.search.includes(term);
      card.toggleAttribute('hidden', !isVisible);
      if (isVisible) categoryVisible += 1;
    });
    category.toggleAttribute('hidden', categoryVisible === 0);
    visibleCount += categoryVisible;
  });

  byId('empty-state').hidden = visibleCount !== 0;
}

function init() {
  renderProfile();
  renderCategories();
  byId('search-input').addEventListener('input', (event) => filterLinks(event.target.value));
}

init();
```

- [ ] **Step 2: Verify JavaScript syntax**

Run: `node --check D:\personal_web\script.js`

Expected: no output and exit code `0`.

### Task 3: Warm Responsive Styling And Motion

**Files:**
- Create: `D:\personal_web\styles.css`

- [ ] **Step 1: Add complete stylesheet**

Create `styles.css` with:

```css
:root {
  color-scheme: light;
  --paper: #fbf6ef;
  --surface: #fffdf9;
  --surface-soft: #fff8ee;
  --ink: #332a24;
  --muted: #7a695c;
  --line: #eadfce;
  --terracotta: #c96f4a;
  --sage: #769072;
  --gold: #c6953d;
  --blue: #6d8ea0;
  --rose: #bd7a82;
  --green: #698f6a;
  --shadow: 0 18px 50px rgba(73, 48, 31, 0.11);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(201, 111, 74, 0.14), transparent 34rem),
    linear-gradient(135deg, #fbf6ef 0%, #f6efe5 44%, #eef4ed 100%);
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

.page-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 48px;
}

.hero,
.quick-grid,
.navigation-area {
  animation: rise-in 620ms ease both;
}

.quick-grid {
  animation-delay: 80ms;
}

.navigation-area {
  animation-delay: 140ms;
}

.hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.profile-card,
.panel,
.category-card {
  border: 1px solid var(--line);
  background: rgba(255, 253, 249, 0.82);
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
}

.profile-card {
  display: flex;
  gap: 18px;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 22px;
  border-radius: 8px;
}

.avatar {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  flex: 0 0 auto;
  border: 3px solid #fff;
  border-radius: 50%;
  background: linear-gradient(135deg, #d9a071, #f3dbc0);
  color: #6b3b24;
  font-size: 28px;
  font-weight: 800;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--terracotta);
  font-size: 12px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 6px;
  font-size: clamp(32px, 6vw, 56px);
  line-height: 1;
  letter-spacing: 0;
}

h2 {
  margin-bottom: 0;
  font-size: 22px;
}

h3 {
  margin-bottom: 0;
  font-size: 17px;
}

.tagline {
  margin-bottom: 14px;
  color: var(--muted);
}

.status-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.status-tags span,
.category-title span {
  border: 1px solid var(--line);
  background: var(--surface-soft);
  color: var(--muted);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  max-width: 320px;
}

.social-links a {
  border: 1px solid var(--line);
  background: var(--surface);
  padding: 10px 13px;
  border-radius: 999px;
  color: var(--muted);
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, color 180ms ease;
}

.quick-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(260px, 0.8fr);
  gap: 18px;
  margin-bottom: 22px;
}

.panel {
  border-radius: 8px;
  padding: 20px;
}

.section-heading,
.nav-heading {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 16px;
}

.featured-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.featured-card,
.link-card {
  display: flex;
  gap: 12px;
  min-width: 0;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.featured-card {
  flex-direction: column;
  padding: 14px;
  border-radius: 8px;
}

.featured-card small,
.link-card small,
.note-text {
  color: var(--muted);
}

.note-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.note-text {
  margin-bottom: 0;
  font-size: 18px;
}

.navigation-area {
  padding-top: 4px;
}

.search-box {
  width: min(420px, 100%);
}

.search-box input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  padding: 12px 16px;
  outline: none;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.search-box input:focus {
  border-color: rgba(201, 111, 74, 0.76);
  box-shadow: 0 0 0 4px rgba(201, 111, 74, 0.14);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.category-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding: 16px;
}

.category-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: var(--accent, var(--terracotta));
}

.accent-coral { --accent: var(--terracotta); }
.accent-sage { --accent: var(--sage); }
.accent-gold { --accent: var(--gold); }
.accent-blue { --accent: var(--blue); }
.accent-rose { --accent: var(--rose); }
.accent-green { --accent: var(--green); }

.category-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.link-list {
  display: grid;
  gap: 10px;
}

.link-card {
  align-items: center;
  padding: 12px;
  border-radius: 8px;
}

.link-mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accent) 16%, white);
  color: var(--accent);
  font-weight: 800;
}

.link-copy {
  display: grid;
  min-width: 0;
}

.link-copy strong,
.link-copy small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.featured-card:hover,
.link-card:hover,
.social-links a:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent, var(--terracotta)) 45%, var(--line));
  box-shadow: 0 14px 30px rgba(73, 48, 31, 0.12);
}

.empty-state {
  border: 1px dashed var(--line);
  border-radius: 8px;
  margin: 18px 0 0;
  padding: 18px;
  color: var(--muted);
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

[hidden] {
  display: none !important;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 860px) {
  .hero,
  .section-heading,
  .nav-heading {
    align-items: stretch;
    flex-direction: column;
  }

  .social-links {
    justify-content: flex-start;
    max-width: none;
  }

  .quick-grid,
  .category-grid {
    grid-template-columns: 1fr;
  }

  .featured-links {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .page-shell {
    width: min(100% - 22px, 1120px);
    padding-top: 16px;
  }

  .profile-card {
    align-items: flex-start;
    flex-direction: column;
  }

  h1 {
    font-size: 38px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}
```

- [ ] **Step 2: Verify stylesheet exists**

Run: `Test-Path D:\personal_web\styles.css`

Expected: `True`

### Task 4: Local Preview And Behavior Check

**Files:**
- Modify after visual QA if needed: `D:\personal_web\index.html`, `D:\personal_web\styles.css`, `D:\personal_web\script.js`

- [ ] **Step 1: Start a static server**

Run: `python -m http.server 8000`

Expected: server prints it is serving HTTP on port `8000`.

- [ ] **Step 2: Verify page responds**

Run in a second shell if needed: `Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8000/ | Select-Object StatusCode`

Expected: `StatusCode` is `200`.

- [ ] **Step 3: Manual browser verification**

Open `http://127.0.0.1:8000/` and verify:

- Profile card renders.
- Featured links render.
- Six categories render.
- Search for `github` shows matching cards.
- Search for `zzzz` shows the no-match state.
- At mobile width, the page stacks without text overflow.

- [ ] **Step 4: Fix visual issues only if observed**

If text overflows inside a card, reduce card text density by changing `.link-copy small` to allow wrapping:

```css
.link-copy small {
  white-space: normal;
}
```

If the palette reads too beige, increase sage/green presence by adjusting the page background:

```css
background:
  radial-gradient(circle at top left, rgba(201, 111, 74, 0.14), transparent 34rem),
  radial-gradient(circle at bottom right, rgba(118, 144, 114, 0.18), transparent 30rem),
  linear-gradient(135deg, #fbf6ef 0%, #f6efe5 44%, #eef4ed 100%);
```

### Task 5: GitHub Pages Notes

**Files:**
- Create: `D:\personal_web\README.md`

- [ ] **Step 1: Add README**

Create `README.md` with:

```markdown
# Personal Navigation Hub

A pure static personal navigation page for GitHub Pages.

## Edit Content

Update `script.js` to change:

- profile tags
- social links
- featured links
- navigation categories
- link titles, descriptions, and URLs

## Local Preview

```powershell
python -m http.server 8000
```

Open `http://127.0.0.1:8000/`.

## GitHub Pages

Publish from the repository root. The site only needs `index.html`, `styles.css`, and `script.js`.
```

- [ ] **Step 2: Final static file check**

Run: `Get-ChildItem D:\personal_web -File | Select-Object Name`

Expected includes:

- `index.html`
- `styles.css`
- `script.js`
- `.gitignore`
- `README.md`

---

## Self-Review

- Spec coverage: the plan covers pure static architecture, warm mixed personal hub layout, medium profile, featured links, six navigation categories, search, lightweight motion, responsive behavior, and GitHub Pages compatibility.
- Placeholder scan: no `TBD`, `TODO`, or vague implementation steps are present.
- Type consistency: `profile`, `categories`, `renderProfile`, `renderCategories`, `filterLinks`, and DOM ids match the HTML shell.
