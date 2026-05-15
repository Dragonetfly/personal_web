const profile = {
  tags: ['Shanghai', 'AI Tools', 'Reading', 'Learning in public']
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

function getFaviconUrl(url) {
  const domain = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

function renderImage(url, title, className) {
  return `
    <span class="${className}" aria-hidden="true">
      <img src="${getFaviconUrl(url)}" alt="" loading="lazy">
    </span>
  `;
}

function createLinkCard(link, categoryTitle) {
  const anchor = document.createElement('a');
  anchor.className = 'link-card';
  anchor.href = link.url;
  anchor.target = '_blank';
  anchor.rel = 'noreferrer noopener';
  anchor.dataset.search = normalize(`${link.title} ${link.description} ${categoryTitle}`);
  anchor.innerHTML = `
    <span class="link-visual" aria-hidden="true">
      <img src="${getFaviconUrl(link.url)}" alt="" loading="lazy">
    </span>
    <span class="link-copy">
      <strong>${link.title}</strong>
      <small>${link.description}</small>
    </span>
  `;
  return anchor;
}

function renderProfile() {
  byId('status-tags').innerHTML = profile.tags.map((tag) => `<span>${tag}</span>`).join('');
}

function renderCategories() {
  const grid = byId('category-grid');
  grid.innerHTML = '';
  categories.forEach((category) => {
    const section = document.createElement('details');
    section.className = `category-card accent-${category.accent}`;
    section.dataset.category = category.title;
    const summary = document.createElement('summary');
    summary.className = 'category-title';
    summary.innerHTML = `
      <span class="category-name">${category.title}</span>
      <span class="category-meta">${category.links.length}</span>
    `;
    const list = document.createElement('div');
    list.className = 'link-list';
    section.append(summary, list);
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
    category.open = Boolean(term && categoryVisible > 0);
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
