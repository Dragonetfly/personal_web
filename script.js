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
